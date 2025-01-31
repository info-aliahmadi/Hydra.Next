import axios from 'axios';

export function setDefaultHeader(jwt: string, contentType: string = 'application/json') {
  setAuthenticationHeader(jwt, contentType);
}
export function setAuthenticationHeader(token: string, contentType: string) {
  if (!token) {
    return;
  }

  let tokenBearer: string = token ? 'Bearer ' + token : '';
  axios.defaults.headers.common['Authorization'] = tokenBearer;
  axios.defaults.headers.common['accept'] = '*/*';
  axios.defaults.headers.post['Content-Type'] = contentType;
}
