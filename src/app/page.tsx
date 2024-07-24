'use client';

import StatGuild from '@/components/StatGuild';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Crown, Shield, Swords, Users } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useAtomValue } from 'jotai';
import { getDiscordDataAtom, useFetchDiscordData } from './lib/data';

export default function Home() {
  const session = useSession();
  const discordData = useAtomValue(getDiscordDataAtom);

  useFetchDiscordData(session.data);

  return (
    <div className="flex-1 flex items-center justify-center">
      {session.data && discordData && discordData.guilds ? (
        <div className="grid md:grid-cols-2 gap-6">
          <StatGuild
            icon={<Crown className="inline mr-2" />}
            guilds={discordData.guilds.filter((guild) => guild.owner)}
            title="Owner"
            description="Guilds you own"
          />
          <StatGuild
            icon={<Swords className="inline mr-2" />}
            guilds={discordData.guilds.filter(
              (guild) => (BigInt(guild.permissions) & BigInt(1 << 3)) == BigInt(1 << 3)
            )}
            title="Admin"
            description="Guilds you administrate"
          />
          <StatGuild
            icon={<Shield className="inline mr-2" />}
            guilds={discordData.guilds.filter(
              (guild) => (BigInt(guild.permissions) & BigInt(1 << 2)) == BigInt(1 << 2)
            )}
            title="Moderator"
            description="Guilds you moderate"
          />
          <StatGuild
            icon={<Users className="inline mr-2" />}
            guilds={discordData.guilds}
            title="Member"
            description="Guilds you are a member of"
          />
        </div>
      ) : session.data && !discordData ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton className="w-[240px] h-[275px]" key={i} />
          ))}
        </div>
      ) : (
        <Button disabled={session.status === 'loading'} onClick={() => signIn('discord')}>
          Login with Discord
        </Button>
      )}
    </div>
  );
}
