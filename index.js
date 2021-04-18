import exchangeRateService  from './services/exchangeApi/exchangerateApiService';
import messageService       from './services/messages/messageService';
import TelegramBot          from 'node-telegram-bot-api';
import config               from './conf';

const { telegramToken } = config;
const bot = new TelegramBot(telegramToken, { polling: true });

bot.onText(/\/conv (.+)/, async function (msg, match) {
    const fromId    = msg.from.id;
    const args      = match[1] || '';
    let [currencyFrom, currencyTo, amount] = args.split(' ');

    if (currencyFrom === undefined || currencyTo === undefined && amount === undefined) {
        bot.sendMessage(fromId, messageService.getValidationErrorMessage());
    }

    try {
        const exchangeData = await exchangeRateService.getExchangeRate(currencyFrom, currencyTo, amount);

        if (exchangeData.result === 'success') {
            bot.sendMessage(fromId, messageService.getSuccessMessage(exchangeData, amount));
        }
    } catch (e) {
        console.error(e);
        if (e instanceof ApiException) {
            bot.sendMessage(fromId, messageService.getErrorMessage());
        }
    }
});