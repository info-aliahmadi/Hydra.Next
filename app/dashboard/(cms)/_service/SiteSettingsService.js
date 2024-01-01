import axios from 'axios';
import CONFIG from '/config.js';
import { setDefaultHeader } from '/utils/axiosHeaders';

export default class SiteSettingsService {
  constructor(jwt) {
    setDefaultHeader(jwt);
  }
  getSettings = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/cms/getSettings')
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  addOrUpdateSettings = async (setting) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/cms/addOrUpdateSettings', setting)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
