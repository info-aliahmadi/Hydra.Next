import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService';

export const AuthenticationContext = React.createContext({
  login: async() => ({}),
  getUser: () => ({}),
  getJwt: () => ({}),
  loginRedirect: () => ({}),
  navigateToDashboard: () => ({}),
  isAuthenticated: async () => ({}),
  refreshToken: () => ({}),
  logout: (router) => ({})
});
export const AuthenticationConsumer = AuthenticationContext.Consumer;

export class AuthenticationProvider extends Component {
  authenticationService;
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService();
  }
  render() {
    return <AuthenticationContext.Provider value={this.authenticationService}>{this.props.children}</AuthenticationContext.Provider>;
  }
}
