
import 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';


declare module 'next-auth' {
  interface User {
    id: number;
    email: string;
    name: string;
    userName: string;
    avatar: string;
    defaultLanguage: string;
    defaultTheme: string;
    accessToken: string;
    roles: Array<string>;
  }

  interface Session extends DefaultSession {
    user: User;
    expires: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error: string;
  }
}
