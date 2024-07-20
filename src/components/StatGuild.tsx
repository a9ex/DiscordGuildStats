import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ApiGuild } from "@/app/api/user/me/guilds/route";

type StatGuildProps = {
    icon: React.ReactNode;
    guilds: ApiGuild[];
    title: string;
    description: string;
}

export default function StatGuild({icon, guilds, title, description}: StatGuildProps) {
    return (
        <Card className="w-[240px] border-2">
            <CardHeader>
            <CardTitle className="flex items-center">{icon}{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
            <p className="text-center text-5xl font-bold mb-2">{guilds.length}</p>
            </CardContent>
            <CardFooter>
            <Dialog>
                <DialogTrigger asChild>
                <Button className="w-full" disabled={guilds.length < 1} variant={"secondary"}>See Guilds</Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader className="mb-5">
                    <DialogTitle className="text-xl">Guilds - {title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {guilds.map(guild => (
                    <div key={guild.id} className="flex rounded-lg bg-slate-800 p-2 h-fit mb-3 w-11/12">
                    <Avatar className="inline size-6 mr-8">
                        {guild.icon && (
                        <AvatarImage src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt="Guild avatar" />
                        )}
                        <AvatarFallback>{guild.name.slice(0,1)}</AvatarFallback>
                    </Avatar>
                    <p>{guild.name}</p>
                    </div>
                ))}
                </DialogContent>
            </Dialog>
            </CardFooter>
      </Card>
    )
}
