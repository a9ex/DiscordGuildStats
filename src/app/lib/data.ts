import { useEffect } from 'react'
import { Session } from 'next-auth'
import { atom, useSetAtom } from 'jotai'
import { ApiMeResponse } from '../api/user/me/guilds/route'

const discordDataAtom = atom<ApiMeResponse | undefined>()

export const getDiscordDataAtom = atom((get) => get(discordDataAtom))

export function useFetchDiscordData(session: Session | null) {
  const setDiscordData = useSetAtom(discordDataAtom)

  useEffect(() => {
    if (session) {
      fetch('/api/user/me/guilds')
        .then((res) => res.json())
        .then(setDiscordData)
    }
  }, [session])
}
