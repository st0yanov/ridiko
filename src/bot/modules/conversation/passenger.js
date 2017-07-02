import TripSearch from '../../../data/models/TripSearch';

export default class Passenger {
  constructor(payload, convo) {
    this.payload = payload;
    this.convo = convo;
  }

  conversation() {
    this.tripFrom();
  }

  tripFrom() {
    this.convo.ask('От кое населено място търсиш пътуване?', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('trip_from', text);

      this.tripTo();
    }, [], {
      typing: true,
    });
  }

  tripTo() {
    this.convo.ask('До кое населено място търсиш пътуване?', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('trip_to', text);

      this.tripDate();
    }, [], {
      typing: true,
    });
  }

  tripDate() {
    this.convo.ask('Въведи желаната от теб дата на тръгване във формат дд.мм.гггг.', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('trip_date', text);

      this.tripTime();
    }, [], {
      typing: true,
    });
  }

  tripTime() {
    this.convo.ask({
      text: 'В кой часови диапазон искаш да пътуваш?',
      quickReplies: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 00:00'],
    }, (payload, convo, data) => {
      //  We set the time either on quick_reply usage (100% correct format) or on regex matched custom chat reply
    }, [
      {
        event: 'quick_reply',
        callback: (payload, convo) => {
          const text = payload.message.text;
          convo.set('trip_time', text);

          this.finalMessage();
        },
      },
      // TODO: Time range, eg. "12:00 - 15:00", must be matched with regex
      // {
      //   pattern: ['yes', /yea(h)?/i, 'yup'],
      //   callback: (payload, convo) => {
      //     const text = payload.message.text;
      //     convo.set('trip_time', text).then(() => finalMessage(convo));
      //   },
      // },
    ], {
      typing: true,
    });
  }

  finalMessage() {
    this.convo.say(`Поздравления, успешно се записа за споделено пътуване!

Тип: ${this.convo.get('search_type')}
Тръгване от: ${this.convo.get('trip_from')}
Пристигане в: ${this.convo.get('trip_to')}
На дата: ${this.convo.get('trip_date')}
Часови диапазон: ${this.convo.get('trip_time')}

Намираш се на 4-то място в опашката с чакащи за тази дата и този часови диапазон. Ще ти изпратим съобщение когато намерим шофьор.
Ако междувременно решиш да се откажеш от пътуването, моля използвай менюто.`);

    TripSearch.create({
      dateStarted: this.convo.get('trip_date'),
      source: this.convo.get('trip_from'),
      destination: this.convo.get('trip_to'),
      timeRange: this.convo.get('trip_time'),
      user: this.convo.get('user'),
    });

    this.convo.end();
  }
}
