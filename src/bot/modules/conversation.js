module.exports = (bot) => {
  const finalMessage = (convo) => {
    convo.say(`Поздравления, успешно се записа за споделено пътуване!

Тип: ${convo.get('search_type')}
Тръгване от: ${convo.get('trip_from')}
Пристигане в: ${convo.get('trip_to')}
На дата: ${convo.get('trip_date')}
Часови диапазон: ${convo.get('trip_time')}

Намираш се на 4-то място в опашката с чакащи за тази дата и този часови диапазон. Ще ти изпратим съобщение когато намерим шофьор.
Ако междувременно решиш да се откажеш от пътуването, моля използвай менюто.`);

    convo.end();
  };

  const tripTime = (convo) => {
    convo.ask({
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

          finalMessage(convo);
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
  };

  const tripDate = (convo) => {
    convo.ask('Въведи желаната от теб дата на тръгване във формат дд.мм.гггг.', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('trip_date', text);

      tripTime(convo);
    }, [], {
      typing: true,
    });
  };

  const tripTo = (convo) => {
    convo.ask('До кое населено място търсиш пътуване?', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('trip_to', text);

      tripDate(convo);
    }, [], {
      typing: true,
    });
  };

  const tripFrom = (convo) => {
    convo.ask('От кое населено място търсиш пътуване?', (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('trip_from', text);

      tripTo(convo);
    }, [], {
      typing: true,
    });
  };

  const searchType = (convo) => {
    convo.ask({
      text: 'Какво търсиш?',
      quickReplies: ['Превоз', 'Пътници'],
    }, (payload, convo, data) => {
      const text = payload.message.text;
      convo.set('search_type', text);

      tripFrom(convo);
    }, [], {
      typing: true,
    });
  };

  const introduction = (convo) => {
    convo.say(`Здравей, аз съм Ridiko и ще ти помогна да си организираш споделено пътуване.

За целта ще ти задам няколко въпроса:`).then(() => searchType(convo));
  };

  bot.hear('start', (payload, chat) => {
    chat.conversation((convo) => {
      convo.sendTypingIndicator(1000).then(() => introduction(convo));
    });
  });
};
