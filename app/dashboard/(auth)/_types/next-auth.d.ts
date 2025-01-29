
import 'next-auth';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';


declare module 'next-auth' {
  interface User {
    id: number;
    email: string;
    name: string;
    userName: string;
    avatar: string;
    defaultLanguage: string;
    defaultTheme: 'light' | 'dark';
    roles: Array<string>;
    accessToken : string;
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
