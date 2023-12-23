import React, { Component } from 'react';
import AuthorizationService from './AuthorizationService';

export const AuthorizationContext = React.createContext({
  isAuthorized: async () => ({}),
  getUserPermissions: () => ({}),
  refreshUserPermissions: (router) => ({})
});

export const AuthorizationConsumer = AuthorizationContext.Consumer;
export class AuthorizationProvider extends Component {
  authorizationService;
  constructor(props) {
    super(props);
    this.authorizationService = new AuthorizationService();
  }
  render() {
    return <AuthorizationContext.Provider value={this.authorizationService}>{this.props.children}</AuthorizationContext.Provider>;
  }
}
