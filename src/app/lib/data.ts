import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { ApiMeResponse } from '../api/user/me/guilds/route';

function fetchDiscordData(): Promise<ApiMeResponse> {
  return fetch('/api/user/me/guilds').then((data) => data.json());
}

export function useDiscordData(session: Session | null) {
  return useQuery<ApiMeResponse, Error>({
    queryKey: ['discordData', session?.user?.name],
    queryFn: fetchDiscordData,
    enabled: !!session,
  });
}
