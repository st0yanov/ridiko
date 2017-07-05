import Passenger from './conversation/passenger';
import Driver from './conversation/driver';

import User from '../../data/models/User';

module.exports = (bot) => {
  const searchType = (convo) => {
    convo.ask({
      text: 'Какво търсиш?',
      quickReplies: [
        {title: 'Превоз', payload: 'SEARCH_TYPE_PASSENGER'},
        {title: 'Пътници', payload: 'SEARCH_TYPE_DRIVER'},
      ],
    }, (payload, cconvo, data) => {}, [
      {
        event: 'quick_reply:SEARCH_TYPE_PASSENGER',
        callback: (payload, cconvo) => {
          cconvo.set('search_type', 'Превоз');

          const passenger = new Passenger(payload, cconvo);
          passenger.conversation();
        },
      },
      {
        event: 'quick_reply:SEARCH_TYPE_DRIVER',
        callback: (payload, cconvo) => {
          cconvo.set('search_type', 'Пътници');

          const driver = new Driver(payload, cconvo);
          driver.conversation();
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
    const user = User.findOrCreate({ where: { messenger_id: payload.sender.id }, defaults: {
      messenger_id: payload.sender.id,
    }});

    chat.conversation((convo) => {
      user.spread((user, created) => {
        convo.set('user', user.get({
          plain: true
        }));
      });
      convo.set('user', user);
      convo.sendTypingIndicator(1000).then(() => introduction(convo));
    });
  });
};
