import prisma from "@/client"
import { getCRTDisplayName } from "@/helpers/crt"
import NavLink from "@/components/NavLink"
import Link from "next/link"

export default async function CRTListPage() {
    const crts = await prisma.cRT.findMany({
        where: {
            verified: true
        }
    })

    // Group CRTs by manufacturer
    const crtsByManufacturer = crts.reduce((acc, crt) => {
        const manufacturer = crt.manufacturer || 'Unknown Manufacturer'
        if (!acc[manufacturer]) {
            acc[manufacturer] = []
        }
        acc[manufacturer].push(crt)
        return acc
    }, {} as Record<string, typeof crts>)

    // Sort manufacturers alphabetically
    const sortedManufacturers = Object.keys(crtsByManufacturer).sort()

    return <div>
        <Link href="/submit" className="py-1 px-4 bg-blue-500 text-white rounded-md mb-4">Submit CRT</Link>
        <h1 className="text-2xl font-bold mt-4">CRTs</h1>
        <ul className="list-none">
            {sortedManufacturers.map((manufacturer) => (
                <li key={manufacturer} className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">{manufacturer}</h2>
                    <ul className="list-disc list-inside ml-4">
                        {crtsByManufacturer[manufacturer].map((crt) => (
                            <li key={crt.id}>
                                <NavLink href={`/crt/${crt.id}`}>{getCRTDisplayName(crt)}</NavLink>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </div>
}