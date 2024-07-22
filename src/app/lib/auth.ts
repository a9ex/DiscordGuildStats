import DiscordProvider from 'next-auth/providers/discord';
import { Account, getServerSession, NextAuthOptions, Session } from 'next-auth';
import { getSafeEnv } from '@/utils/utils';
import { JWT } from 'next-auth/jwt';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

const scopes = ['identify', 'guilds'].join('%20');

export const AuthOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: getSafeEnv('DISCORD_CLIENT_ID'),
      clientSecret: getSafeEnv('DISCORD_CLIENT_SECRET'),
      authorization: `https://discord.com/api/oauth2/authorize?scope=${scopes}`,
    }),
  ],

  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }): Promise<JWT> {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token });
      }
      return token;
    },
  },

  secret: getSafeEnv('JWT_SECRET'),
};

function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  const authOptions = {
    ...AuthOptions,
    callbacks: {
      ...AuthOptions.callbacks,
      session: async ({ session, token }: { session: Session; token: JWT }): Promise<Session> => {
        if (session) {
          session.user = Object.assign({}, session.user, { access_token: token.access_token });
        }
        return session;
      },
    },
  };

  return getServerSession(...args, authOptions);
}

export { auth };
