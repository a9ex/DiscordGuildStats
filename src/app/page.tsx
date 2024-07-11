'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  const { user } = data ?? {};
  const userName = user?.name;

  return (
    <main className="flex flex-col h-screen">
      <div className="flow-root p-8">
        <div className="float-left">
          Discord Guild Stats
        </div>
        <div className="float-right">
          {data ? (
            <Avatar>
              {user?.image && (
                <AvatarImage src={user.image} alt="User avatar" />
              )}
              <AvatarFallback>{userName ? userName.slice(0,1) : "A"}</AvatarFallback>
            </Avatar>
          ) : (
            <Button disabled={status === 'loading'} onClick={() => signIn("discord")}>Login</Button>
          )}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Button onClick={() => signIn("discord")}>Login with Discord</Button>
      </div>
    </main>
  );
}
