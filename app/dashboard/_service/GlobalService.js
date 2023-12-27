import axios from 'axios';
import { setDefaultHeader } from 'utils/axiosHeaders';
import CONFIG from 'config.js';

export default class GlobalService {
  constructor() {
    setDefaultHeader();
  }

  getAllForSelect = async (url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
