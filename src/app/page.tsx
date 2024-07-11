'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  const { user } = data ?? {};
  const userName = user?.name;

  return (
      <div className="flex-1 flex items-center justify-center">
        <Button onClick={() => signIn("discord")}>Login with Discord</Button>
      </div>
  );
}
