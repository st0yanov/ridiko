module.exports = (bot) => {
  const greetingText = 'Ridiko е бот, който ще ви помогне да организирате споделено пътуване или да се присъедините към такова.';
  const getStartedChatMessage = 'start';

  bot.setGreetingText(greetingText);
  bot.setGetStartedButton(getStartedChatMessage);
};
