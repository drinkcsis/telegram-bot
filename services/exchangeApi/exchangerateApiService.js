import axios        from 'axios';
import ApiException from './ApiException';
import config       from '../../conf';

const { exchangerateToken } = config;

export default {
    getExchangeRate: async function (currencyFrom, currencyTo, amount) {
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${exchangerateToken}/pair/${currencyFrom}/${currencyTo}/${amount}`);
            if (response.data.result === 'success') {
                return response.data;
            } else {
                throw response.data['error-type'];
            }
        } catch (e) {
            console.log(e);
            const apiException = new ApiException(e.message);
            throw apiException;
        }
    }
}
