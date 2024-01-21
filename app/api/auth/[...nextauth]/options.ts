import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthenticationService from '@dashboard/(auth)/_service/Authentication/AuthenticationService';

export const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // the processing of JWT occurs before handling sessions.
      if (user) {
        token.refreshToken = token.refreshToken;
        token.accessTokenExpires = token.accessTokenExpires;
        token.name = user.name;
        token.userName = user.userName;
        token.email = user.email;
        token.defaultLanguage = user.defaultLanguage;
        token.defaultTheme = user.defaultTheme;
        token.avatar = user.avatar;
        token.roles = user.roles;
        token.id = user.id;
        token.accessToken = user.accessToken;
      }

      if (trigger === 'update' && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
        token.userName = session.userName;
        token.email = session.email;
        token.avatar = session.avatar;
        token.accessToken = session.accessToken;
        token.defaultLanguage = session.defaultLanguage;
        token.defaultTheme = session.defaultTheme;
      }

      return token;
    },

    //  The session receives the token from JWT
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        userName: token.userName as string,
        name: token.name as string,
        email: token.email as string,
        roles: token.roles as Array<string>,
        id: token.id as number,
        defaultLanguage: token.defaultLanguage as string,
        defaultTheme: token.defaultTheme as string,
        avatar: token.avatar as string,
        accessToken: token.accessToken as string
      };
      session.error = token.error as string;

      return session;
    }
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        const authenticationService = new AuthenticationService();
        var result = await authenticationService.login(credentials?.username as string, credentials?.password as string, true);
        if (result.succeeded) {
          return result.data;
        } else {
          return null;
        }
      }
    })
  ]
};
