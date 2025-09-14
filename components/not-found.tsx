import NavLink from '@/components/NavLink'

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <NavLink href="/">Return Home</NavLink>
        </div>
    )
}