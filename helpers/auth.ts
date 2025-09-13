import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next"
import DiscordProvider from 'next-auth/providers/discord'
import type { DefaultSession, NextAuthOptions, Session } from "next-auth"
import { getServerSession } from "next-auth"
import prisma from "@/client"
import assert from "assert"

export async function verifyAdmin() {
    const session = await auth();
    assert(session)
    return await isAdmin(session)
}

export async function isAdmin(session: DiscordSession) {
    assert(session.user?.id)
    return await prisma.admin.findFirst({
        where: {
            discordId: session.user.id
        }
    }) != null
}
export type DiscordSession = {
    user: {
        id: number | null | undefined
    }
} & DefaultSession

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
                    (session as DiscordSession).user!.id = parseInt(token.sub!);
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
    return getServerSession(...args, config) as Promise<DiscordSession | null>
}