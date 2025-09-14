import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    target?: string;
    rel?: string;
}

export default function NavLink({
    href,
    children,
    className = "text-gray-900 dark:text-gray-100 hover:underline font-medium",
    target,
    rel
}: NavLinkProps) {
    return (
        <Link
            href={href}
            className={className}
            target={target}
            rel={rel}
        >
            {children}
        </Link>
    );
}
