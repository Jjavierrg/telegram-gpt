import TelegramBot from 'node-telegram-bot-api';
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({ organization: process.env.OPENAI_ORGANIZATION!, apiKey: process.env.OPENAI_API_KEY! });
const openai = new OpenAIApi(configuration);

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN!;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true, onlyFirstMatch: true });

bot.on('message', (msg) => console.log(msg));

// Matches /start
bot.onText(/\/start/, (msg) => {
  const greeting = `Hey ${msg.chat.first_name}, this is Chat GPT! \n\nI'm a bot powered with the most advanced artificial intelligence available. \n\nHow can I help you?`;
  bot.sendMessage(msg.chat.id, greeting);
});

// handles the rest of the text messages
bot.onText(/(.+)/, async (msg) => {
  const chatId = msg.chat.id;
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: msg.text! }]
  });

  bot.sendMessage(chatId, response.data.choices[0].message?.content ?? "I don't know what to say");
});
