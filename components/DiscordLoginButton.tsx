'use client'
import { Session } from "next-auth"
import { getSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function DiscordLoginButton() {
    const [session, setSession] = useState<{ data: Session | null }>({ data: null });

    useEffect(() => {
        let cancelled = false;
        getSession().then((session) => {
            if (!cancelled) setSession({ data: session });
        });
        return () => { cancelled = true; };
    }, []);
    if (session.data) {
        return <button onClick={() => {
            signOut()
        }}>Logout</button>
    }
    return <button className="text-white px-3 py-1 rounded-md border-white border-2 hover:bg-stone-800" onClick={() => {
        signIn("discord")
    }}>Login</button>
}