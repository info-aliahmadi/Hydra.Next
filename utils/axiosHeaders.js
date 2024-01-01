import axios from 'axios';

export function setDefaultHeader(jwt,contentType) {
  setAuthenticationHeader(jwt, contentType ? contentType : 'application/json');
}
export function setAuthenticationHeader(token, contentType) {
  let tokenBearer = token ? 'Bearer ' + token : '';
  axios.defaults.headers.common['Authorization'] = tokenBearer;
  axios.defaults.headers.common['accept'] = '*/*';
  axios.defaults.headers.post['Content-Type'] = contentType;
}
