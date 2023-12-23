'use client';
import axios from 'axios';
import CookieService from 'utils/CookieService';
import LocalStorageService from 'utils/LocalStorageService';
import { setAuthenticationHeader } from 'utils/axiosHeaders';
import AuthorizationService from '../Authorization/AuthorizationService';
import CONFIG from 'config.js';

export default class AuthenticationService {
  storageService;
  constructor() {
    this.storageService =
      CONFIG.AUTHENTICATION_DEFAULT_STORAGE === 'cookie'
        ? new CookieService(CONFIG.AUTHENTICATION_STORAGE_NAME)
        : new LocalStorageService(CONFIG.AUTHENTICATION_STORAGE_NAME);
  }

  login = async (userName, password, rememberMe) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.LOGIN_API_PATH, null, {
          params: {
            userName: userName,
            password: password,
            rememberMe: rememberMe
          }
        })
        .then((response) => {
          setAuthenticationHeader(response.data);
          var jwt = this.parseJwt(response.data);
          var expireDate = new Date(jwt.exp * 1000).toUTCString();
          this.storageService.AddItem(response.data, expireDate);
          let authorizationService = new AuthorizationService();
          authorizationService.getUserPermissions().then(() => {
            resolve(true);
          });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  getUser = () => {
    let savedJwt = this.storageService.getItem(CONFIG.AUTHENTICATION_STORAGE_NAME);
    if (savedJwt == null) {
      return null;
    }
    return this.parseJwt(savedJwt);
  };

  getJwt = () => {
    return this.storageService.getItem(CONFIG.AUTHENTICATION_STORAGE_NAME);
  };

  parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  redirectToLogin = (router) => {
    router.push(CONFIG.LOGIN_PATH);
  };

  redirectToDashboard = (router) => {
    router.push(CONFIG.DASHBOARD_PATH);
  };

  isAuthenticated = () => {
    var token = this.storageService.getItem(CONFIG.AUTHENTICATION_STORAGE_NAME);
    if (token == null) {
      // var isRefreshedToken = this.refreshToken();
      // if (isRefreshedToken) {
      //   return true;
      // }
      return false;
    }
    const { exp } = this.parseJwt(token);
    const expired = Date.now() >= exp * 1000;
    return !expired;
  };

  refreshToken = () => {
    axios
      .get(CONFIG.REFRESH_TOKEN_API_PATH)
      .then((response) => {
        setAuthenticationHeader(response.data);
        this.storageService.deleteItem();
        this.storageService.AddItem(response.data);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  logout = (router) => {
    setAuthenticationHeader(this.getJwt());
    this.storageService.deleteItem();
    this.redirectToLogin(router);
  };
}
