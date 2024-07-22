import { auth } from '@/app/lib/auth';
import { getSafeEnv } from '@/utils/utils';

export interface ApiGuild {
  id: string;
  name: string;
  icon: string;
  banner: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

export type ApiMeResponse = {
  guilds: ApiGuild[];
};

export async function GET() {
  const session = await auth();
  const DISCORD_API_BASE_URL = getSafeEnv('DISCORD_API_BASE_URL');

  if (!session?.user.access_token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const guilds: ApiGuild[] = await fetch(`${DISCORD_API_BASE_URL}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${session.user.access_token}`,
    },
  }).then((response) => response.json());

  return Response.json({ guilds });
}
