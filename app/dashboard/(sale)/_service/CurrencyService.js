import axios from 'axios';
import { setDefaultHeader } from '/utils/axiosHeaders';
import CONFIG from '/config.js';

export default class CurrencyService {
  constructor(jwt) {
    setDefaultHeader(jwt);
  }
  getCurrencyList = async (searchParams) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/sale/GetCurrencyList', searchParams)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getAllCurrencies = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/sale/getAllCurrencies')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getCurrencyById = async (currencyId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/sale/getCurrencyById', { params: { currencyId: currencyId } })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  addCurrency = async (currency) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/sale/addCurrency', currency)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  updateCurrency = async (currency) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/sale/updateCurrency', currency)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  deleteCurrency = async (currencyId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/sale/deleteCurrency', { params: { currencyId: currencyId } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
