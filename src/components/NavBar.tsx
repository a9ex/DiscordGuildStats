'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function NavBar() {
  const { data, status } = useSession();
  const { user } = data ?? {};
  const userName = user?.name;

  return (
    <div className="flow-root p-8">
      <div className="float-left">Discord Guild Stats</div>
      <div className="float-right pr-5">
        {data ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="hover:opacity-75 transition-opacity duration-150 ease-in-out cursor-pointer">
                {user?.image && <AvatarImage src={user.image} alt="User avatar" />}
                <AvatarFallback>{userName ? userName.slice(0, 1) : 'A'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="text-red-400">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button disabled={status === 'loading'} onClick={() => signIn('discord')}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
