import axios from 'axios';
import CONFIG from '@root/config';
import { setAuthenticationHeader } from '@root/utils/axiosHeaders';

export default class AuthenticationService {
  login = async (username: string, password: string, rememberMe: boolean) => {
    return new Promise<any>((resolve, reject) => {
      // Simple POST request with a JSON body using fetch
      axios
        .post(CONFIG.LOGIN_API_PATH, null, {
          params: {
            username: username,
            password: password,
            rememberMe: rememberMe
          }
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  refreshToken = async (jwt: string) => {
    return new Promise<any>((resolve, reject) => {
      setAuthenticationHeader(jwt, 'application/json');
      axios
        .get(CONFIG.REFRESH_TOKEN_API_PATH)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(null);
        });
    });
  };
}
