import type { Account, NextAuthOptions, Profile, Session, User } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthenticationService from '@dashboard/(auth)/_service/Authentication/AuthenticationService';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

export const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session }: {
      token: JWT;
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | null;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: Session;
    }): Promise<JWT> {
      // the processing of JWT occurs before handling sessions.
      if (user) {
        token.name = user.name;
        token.userName = user.userName;
        token.email = user.email;
        token.defaultLanguage = user.defaultLanguage;
        token.defaultTheme = user.defaultTheme;
        token.picture = user.avatar;
        token.roles = user.roles;
        token.id = user.id;
        token.accessToken = user.accessToken;
      }

      if (trigger === 'update' && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.user.name;
        token.userName = session.user.userName;
        token.email = session.user.email;
        token.avatar = session.user.avatar;
        token.defaultLanguage = session.user.defaultLanguage;
        token.defaultTheme = session.user.defaultTheme;
        token.accessToken = session.user.accessToken;
      }

      return token;
    },

    //  The session receives the token from JWT
    async session({ session, token, user }: { session: Session; token: JWT; user: AdapterUser }) {
      session.user = {
        ...session.user,
        userName: token.userName as string,
        name: token.name as string,
        email: token.email as string,
        roles: token.roles as string[],
        id: token.id as number,
        defaultLanguage: token.defaultLanguage as string,
        defaultTheme: token.defaultTheme as "light" | "dark",
        avatar: token.avatar as string,
      };
      session.error = token.error as string;
      session.accessToken = token.accessToken as string
      session.accessTokenExpires = token.expiresOn as number

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
      async authorize(credentials): Promise<User | null> {
        const authenticationService = new AuthenticationService();
        let result = await authenticationService.login(credentials?.username as string, credentials?.password as string, true);
        if (result.succeeded) {
          return result.data;
        } else {
          return null;
        }
      }
    })
  ]
};
