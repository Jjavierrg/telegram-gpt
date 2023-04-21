// replace the value below with the Telegram token you receive from @BotFather
import { Bot } from 'grammy';

const token = process.env.TELEGRAM_TOKEN!;

// Create a bot using the Telegram token
const bot = new Bot(token);

bot.command('start', (ctx) => {
  const greeting = `Hey ${ctx.from?.first_name}, this is Chat GPT! \n\nI'm a bot powered with the most advanced artificial intelligence available. \n\nHow can I help you?`;
  ctx.reply(greeting);
});

bot.on('message:text', (ctx) => {
  const message = ctx.message?.text ?? 'No message received';
  console.log(message);
  ctx.reply(message);
});

bot.start();
