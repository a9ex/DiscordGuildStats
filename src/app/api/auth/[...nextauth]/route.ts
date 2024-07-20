import { getSafeEnv } from "@/utils/utils";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { getServerSession } from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

const scopes = ['identify', 'guilds'].join('%20');

const AuthOptions = {
  providers: [
    DiscordProvider({
        clientId: getSafeEnv('DISCORD_CLIENT_ID'),
        clientSecret: getSafeEnv('DISCORD_CLIENT_SECRET'),
        authorization:
        `https://discord.com/api/oauth2/authorize?scope=${scopes}`,
    }),
  ],

  callbacks: {
    async jwt({token, account}: any) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token });
      }
      return token
    },
  },

  secret: getSafeEnv('JWT_SECRET'),
};

function auth(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    const authOptions = {
        ...AuthOptions,
        callbacks: {
            ...AuthOptions.callbacks,
            session: async ({ session, token }: any) => {
                if (session) {
                    session = Object.assign({}, session, { access_token: token.access_token });
                }
                return session;
            }
        }
    }

    return getServerSession(...args, authOptions)
}

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST, auth };
