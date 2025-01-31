'use client';
import axios from 'axios';
import CONFIG from '@root/config';
import { setDefaultHeader } from '@root/utils/axiosHeaders';
import LocalStorageService from '@root/utils/LocalStorageService';

export default class LocalizationService {
  constructor(jwt: any) {
    if(jwt)
    setDefaultHeader(jwt);
  }

  getCurrentLanguage = async () => {
    let result = new Promise((resolve, reject) => {
      axios
        .get(CONFIG.API_BASEPATH + '/Auth/GetDefaultLanguage')
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            resolve(this.getDefaultLanguage());
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });

    });
    return await result;
  };

  setCurrentLanguage = async (i18n: any, lang: Language) => {
    i18n.changeLanguage(lang.key);
    axios.get(CONFIG.API_BASEPATH + '/Auth/SetDefaultLanguage', { params: { defaultLanguage: lang.key } }).catch((error) => {
    });
  };

  getSavedLanguage = () => {
    let localStorageService = new LocalStorageService(CONFIG.LANGUAGE_STORAGE_NAME);
    let currentLang = localStorageService.getItem();
    if (currentLang == undefined || currentLang == null) {
      return CONFIG.DEFAULT_LANGUAGE;
    }
    return currentLang
  };
  getDefaultLanguage = async () => {
    return CONFIG.DEFAULT_LANGUAGE;
  };
}
