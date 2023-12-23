import AuthenticationService from '@dashboard/(auth)/_service/Authentication/AuthenticationService';
import axios from 'axios';

export function setDefaultHeader(contentType) {
  var jwt = new AuthenticationService().getJwt();
  setAuthenticationHeader(jwt, contentType ? contentType : 'application/json');
}
export function setAuthenticationHeader(token, contentType) {
  let tokenBearer = token ? 'Bearer ' + token : '';
  axios.defaults.headers.common['Authorization'] = tokenBearer;
  axios.defaults.headers.common['accept'] = '*/*';
  axios.defaults.headers.post['Content-Type'] = contentType;
}
export function setTokenBearer() {
  var jwt = new AuthenticationService().getJwt();
  return 'Bearer ' + jwt;
}
