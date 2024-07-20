import { getSafeEnv } from "@/utils/utils";
import { auth } from "../../../auth/[...nextauth]/route";

export interface ApiGuild {
    id: string;
    name: string;
    icon: string;
    banner: string | null;
    owner: boolean;
    permissions: string;
    features: string[];
  }

interface ApiUser {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: string | null;
    banner_color: string | null;
    clan: string | null;
    mfa_enabled: boolean;
    locale: string;
    premium_type: number;
    guilds: ApiGuild[];
}

export type ApiMeResponse = {
    guilds: ApiGuild[];
};

export async function GET() {
    const session = await auth();
    const DISCORD_API_BASE_URL = getSafeEnv('DISCORD_API_BASE_URL');

    const guilds: ApiGuild[] = await fetch(`${DISCORD_API_BASE_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    }).then((response) => response.json());

    return Response.json({guilds});
}
