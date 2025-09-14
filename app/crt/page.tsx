import prisma from "@/client"
import { getCRTDisplayName } from "@/helpers/crt"
import Link from "next/link"

export default async function CRTListPage() {
    const crts = await prisma.cRT.findMany({
        where: {
            verified: true
        }
    })
    return <div>
        <h1>CRT List</h1>
        <ul>
            {crts.map((crt) => (
                <li key={crt.id}>
                    <Link href={`/crt/${crt.id}`}>{getCRTDisplayName(crt)}</Link>
                </li>
            ))}
        </ul>
    </div>
}