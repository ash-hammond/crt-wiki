"use client"
import { useState } from "react"

export default function CRTSearchBar({ crtEntries }: { crtEntries: { id: number, name: string }[] }) {
    const [search, setSearch] = useState("")
    const filteredEntries = crtEntries.filter((entry) => entry.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <div>
            <input type="text" placeholder="Search CRTs" className="w-full px-3 py-1 border border-gray-300 rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
            <ul>
                {filteredEntries.map((entry) => (
                    <li key={entry.id}>{entry.name}</li>
                ))}
            </ul>
        </div>
    )
}