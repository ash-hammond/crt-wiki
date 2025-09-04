import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next"
import DiscordProvider from 'next-auth/providers/discord'
import type { DefaultSession, NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"

export type DiscordUser = {
    id: number | null | undefined
} & DefaultSession['user']

export const config = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (token) {
                if (token?.picture?.includes("discord")) {
                    (session!.user! as DiscordUser).id = parseInt(token.sub!);
                }
            }
            return session;
        },
    },
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, config)
}