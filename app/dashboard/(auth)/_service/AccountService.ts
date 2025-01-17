
import axios from 'axios';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import CONFIG from '@root/config.js';

export default class AccountService {
  constructor(jwt: any) {
    if(jwt)
    setDefaultHeader(jwt);
  }
  getCurrentUser = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/getCurrentUser')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };

  setDefaultTheme = async (theme : any) => {
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/auth/SetDefaultTheme')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };

  updateCurrentUser = async (user: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/updateCurrentUser', user)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };
  changePassword = async (passwords: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.API_BASEPATH + '/auth/changePassword', passwords)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
           reject(new Error(error));
        });
    });
  };
}
