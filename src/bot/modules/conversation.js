const driver = require('./conversation/driver');
import Passenger from './conversation/passenger';

module.exports = (bot) => {
  const searchType = (convo) => {
    convo.ask({
      text: 'Какво търсиш?',
      quickReplies: [
        { title: 'Превоз', payload: 'SEARCH_TYPE_PASSENGER' },
        { title: 'Пътници', payload: 'SEARCH_TYPE_DRIVER' },
      ],
    }, (payload, cconvo, data) => {
      const text = payload.message.text;
      cconvo.set('search_type', text);
    }, [
      {
        event: 'quick_reply:SEARCH_TYPE_PASSENGER',
        callback: (payload, cconvo) => {
          const passenger = new Passenger(payload, cconvo);
          passenger.conversation();
        },
      },
      {
        event: 'quick_reply:SEARCH_TYPE_DRIVER',
        callback: (payload, cconvo) => {
          driver.conversation(payload, cconvo);
        },
      },
    ], {
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

  // bot.sendMessage('1366412910110395', { text: 'test123' }, []);
};
