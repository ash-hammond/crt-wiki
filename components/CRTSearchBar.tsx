"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function CRTSearchBar({ crtEntries }: { crtEntries: { id: number, name: string }[] }) {
    const [search, setSearch] = useState("")
    //TODO use fuzzy search
    const filteredEntries = crtEntries.filter((entry) => entry.name.toLowerCase().includes(search.toLowerCase()))
    const [isFocused, setIsFocused] = useState(false)
    const router = useRouter()

    const formRef = useRef<HTMLFormElement>(null)
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                setIsFocused(false)
            }
        }
        document.addEventListener("click", handler)
        return () => {
            document.removeEventListener("click", handler)
        }
    });

    return (
        <form ref={formRef}>
            <input onFocus={() => setIsFocused(true)} type="text" placeholder="Search CRTs" className="w-48 px-3 py-1 border border-gray-300 rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className={`absolute bg-black p-2 w-48 ${isFocused ? "" : "hidden"}`}>
                <ul>
                    {filteredEntries.map((entry) => (
                        <li key={entry.id}>
                            <a onClick={() => {
                                router.push(`/crt/${entry.id}`)
                                setIsFocused(false)
                            }}
                                className="text-gray-900 dark:text-gray-100 hover:underline font-medium"
                            >{entry.name}</a></li>
                    ))}
                </ul>
            </div>
        </form>
    )
}