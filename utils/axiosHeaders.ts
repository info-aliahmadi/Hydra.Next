import axios from 'axios';

export function setDefaultHeader(jwt: string, contentType: string) {
  setAuthenticationHeader(jwt, contentType || 'application/json');
}
export function setAuthenticationHeader(token: string, contentType: string) {
  let tokenBearer = token ? 'Bearer ' + token : '';
  axios.defaults.headers.common['Authorization'] = tokenBearer;
  axios.defaults.headers.common['accept'] = '*/*';
  axios.defaults.headers.post['Content-Type'] = contentType;
}
