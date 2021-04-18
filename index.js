const TelegramBot       =  require('node-telegram-bot-api');
const exchangerate      = require('./services/exchangeApi/exchangerateApiService');
const messageService    = require('./services/messages/messageService');
const { telegramToken } = require('./conf');

const bot = new TelegramBot(telegramToken, { polling: true });

bot.onText(/\/conv (.+)/, async function (msg, match) {
    const fromId    = msg.from.id;
    const args      = match[1] || '';
    let [currencyFrom, currencyTo, amount] = args.split(' ');
    if (currencyFrom && currencyTo && amount) {
        try {
            const exchangeData = await exchangerate.getExchangeRate(currencyFrom, currencyTo, amount);
            if (exchangeData.result === 'success') {
                bot.sendMessage(fromId, messageService.getSuccessMessage(exchangeData, amount));
            }
        } catch (e) {
            console.error(e);
            bot.sendMessage(fromId, messageService.getErrorMessage());
        }
    } else {
        bot.sendMessage(fromId, messageService.getValidationErrorMessage());
    }
});