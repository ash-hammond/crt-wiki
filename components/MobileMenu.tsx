'use client'
import { useState, useEffect, useRef } from "react"
import NavLink from "./NavLink"
import DiscordLoginButton from "./DiscordLoginButton"

export default function MobileMenu({ isAdmin }: { isAdmin: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])
    return (
        <div ref={menuRef} className="relative block sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-stone-800 border border-stone-700 rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                        <li onClick={() => setIsOpen(false)}>
                            <NavLink href="/" className="block px-4 py-2 text-white hover:bg-stone-700">
                                Home
                            </NavLink>
                        </li>
                        <li onClick={() => setIsOpen(false)}>
                            <NavLink href="/crt" className="block px-4 py-2 text-white hover:bg-stone-700">
                                CRTs
                            </NavLink>
                        </li>
                        {isAdmin && (
                            <li onClick={() => setIsOpen(false)}>
                                <NavLink href="/dashboard" className="block px-4 py-2 text-white hover:bg-stone-700">
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                        <li className="px-4 py-2">
                            <DiscordLoginButton />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}