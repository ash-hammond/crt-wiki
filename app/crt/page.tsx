import prisma from "@/client"
import { getCRTDisplayName } from "@/helpers/crt"
import NavLink from "@/components/NavLink"

export default async function CRTListPage() {
    const crts = await prisma.cRT.findMany({
        where: {
            verified: true
        }
    })
    return <div>
        <NavLink href="/submit">Submit CRT</NavLink>
        <h1>CRT List</h1>
        <ul>
            {crts.map((crt) => (
                <li key={crt.id}>
                    <NavLink href={`/crt/${crt.id}`}>{getCRTDisplayName(crt)}</NavLink>
                </li>
            ))}
        </ul>
    </div>
}