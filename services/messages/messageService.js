export default {
    getSuccessMessage: function (exchangeData, amount) {
        return `${amount} ${exchangeData.base_code} = ${exchangeData.conversion_result} ${exchangeData.target_code}.\n\rRate:${exchangeData.conversion_rate}`;
    },

    getErrorMessage: function () {
        return `Sorry, something went wrong...\n\r`;
    },

    getValidationErrorMessage: function () {
        return `Please send message in format: \n\r<currencyFrom> <currencyTo> <amount>. \n\rEx. "USD PLN 100"`;
    }
}
