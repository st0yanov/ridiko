import config from './config/default.json';

const BootBot = require('bootbot');

const configModule = require('./modules/config');
const conversationModule = require('./modules/conversation');

const bot = new BootBot({
  accessToken: config.access_token,
  verifyToken: config.verify_token,
  appSecret: config.app_secret,
});

bot.module(configModule);
bot.module(conversationModule);

bot.start();
