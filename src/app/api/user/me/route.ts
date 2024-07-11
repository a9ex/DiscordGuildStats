import { getSafeEnv } from "@/utils/utils";
import { auth } from "../../auth/[...nextauth]/route";

export async function GET() {
    const session = await auth();
    const DISCORD_API_BASE_URL = getSafeEnv('DISCORD_API_BASE_URL');

    const user = await fetch(`${DISCORD_API_BASE_URL}/users/@me`, {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    }).then((response) => response.json());

    const guilds = await fetch(`${DISCORD_API_BASE_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    }).then((response) => response.json());

    return Response.json({ user: { ...user, guilds } });
}
