import Trip from '../../../data/models/Trip';
import User from '../../../data/models/User';

export default class Driver {
  constructor(payload, convo) {
    this.payload = payload;
    this.convo = convo;
  }

  conversation() {
    this.tripFrom();
  }

  tripFrom() {
    this.convo.ask('От кое населено място търсиш пътници?', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('trip_from', text);

      this.tripTo();
    }, [], {
      typing: true,
    });
  }

  tripTo() {
    this.convo.ask('До кое населено място търсиш пътници?', (payload, convo, data) => {
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

          this.tripNumberPassengers();
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

  tripNumberPassengers() {
    this.convo.ask('Колко пътници търсиш?', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('number_passengers', text);

      if(this.convo.get('user').phone.length == 0) {
        this.almostReadyMessage();
      } else {
        this.finalMessage();
      }
    }, [], {
      typing: true,
    });
  }

  almostReadyMessage() {
    this.convo.say(`Почти сме готови. Тъй като не си използвал до сега Ridiko ни е нужна още малко информация.
                    Ще ти отнеме не повече от 2 минути.`);
    this.brandCar();
    [], {
      typing: true,
    };
  }

  brandCar() {
    this.convo.ask('Напишете марка и модел на автомобила, с който ще пътуваш(например VW Passat, Audi A4, Mercedes C220 и др.)', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('brand_car', text);

      this.hasAC();
    }, [], {
      typing: true,
    });
  }

  hasAC() {
    this.convo.ask({
      text: 'Автомобилът има ли климатик?',
      quickReplies: ['Да', 'Не'],
    }, (payload, convo, data) => {
      //  We set the time either on quick_reply usage (100% correct format) or on regex matched custom chat reply
    }, [
      {
        event: 'quick_reply',
        callback: (payload, convo) => {
          const text = payload.message.text;
          convo.set('has_ac', text);

          this.canSmoke();
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

  canSmoke() {
    this.convo.ask({
      text: 'Може ли да се пуши в колата?',
      quickReplies: ['Да', 'Не'],
    }, (payload, convo, data) => {
      //  We set the time either on quick_reply usage (100% correct format) or on regex matched custom chat reply
    }, [
      {
        event: 'quick_reply',
        callback: (payload, convo) => {
          const text = payload.message.text;
          convo.set('can_smoke', text);

          this.canEat();
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

  canEat() {
    this.convo.ask({
      text: 'Могат ли да се консумират храни и напитки в колата?',
      quickReplies: ['Да', 'Не'],
    }, (payload, convo, data) => {
      //  We set the time either on quick_reply usage (100% correct format) or on regex matched custom chat reply
    }, [
      {
        event: 'quick_reply',
        callback: (payload, convo) => {
          const text = payload.message.text;
          convo.set('can_eat', text);

          this.petsAllowed();
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

  petsAllowed() {
    this.convo.ask({
      text: 'Разрешени ли са домашни любимци в колата?',
      quickReplies: ['Да', 'Не'],
    }, (payload, convo, data) => {
      //  We set the time either on quick_reply usage (100% correct format) or on regex matched custom chat reply
    }, [
      {
        event: 'quick_reply',
        callback: (payload, convo) => {
          const text = payload.message.text;
          convo.set('pets_allowed', text);

          this.takingRests();
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

  takingRests() {
    this.convo.ask({
      text: 'Ще се правят ли почивки по време на пътуването?',
      quickReplies: ['Да', 'Не'],
    }, (payload, convo, data) => {
      //  We set the time either on quick_reply usage (100% correct format) or on regex matched custom chat reply
    }, [
      {
        event: 'quick_reply',
        callback: (payload, convo) => {
          const text = payload.message.text;
          convo.set('taking_rests', text);

          this.telephoneNumber();
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

  telephoneNumber() {
    this.convo.ask('Въведи телефонния си номер (той ни е необходим за да свържем желаещите пътници с теб.)', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('telephone_number', text);

      this.finalMessage();
    }, [], {
      typing: true,
    });
  }



  finalMessage() {
    this.convo.say(`Поздравления, успешно се записа за споделено пътуване!

Намираш се на 4-то място в опашката с чакащи за тази дата и този часови диапазон. Ще ти изпратим съобщение когато намерим шофьор.
Ако междувременно решиш да се откажеш от пътуването, моля използвай менюто.`);

    Trip.create({
      dateAdded: this.convo.get('trip_date'),
      source: this.convo.get('trip_from'),
      destination: this.convo.get('trip_to'),
      startTime: this.convo.get('trip_time'),
      freeSeats: this.convo.get('number_passengers'),
      user: this.convo.get('user'),
    });

    const user = User.findOne({where: {messenger_id: this.payload.sender.id}});

    if(this.convo.get('user').phone.length == 0) {
      User.update({
        phone: this.convo.get('telephone_number'),
        hasAirConditioning: this.convo.get('has_ac'),
        isTolerantToSmoking: this.convo.get('can_smoke'),
        isTolerantToPets: this.convo.get('pets_allowed'),
        isTolerantToEating: this.convo.get('can_eat'),
      }, { where: { id: user.id } });
    }

    this.convo.end();
  }
};
