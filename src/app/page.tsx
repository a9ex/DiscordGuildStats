'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  const { user } = data ?? {};
  const userName = user?.name;

  return (
      <div className="flex-1 flex items-center justify-center">
        {data ? (
          <>
            <Card className="w-[230px]">
              <CardHeader>
                <CardTitle className="flex items-center"><Crown className="inline mr-1"/>Owner</CardTitle>
                <CardDescription>Guilds where i'm owner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-5xl font-bold mb-2">0</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={"secondary"}>See Guilds</Button>
              </CardFooter>
            </Card>
          </>
        ): (
          <Button onClick={() => signIn("discord")}>Login with Discord</Button>
        )}
      </div>
  );
}
