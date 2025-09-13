import prisma from "@/client";
import { verifyAdmin } from "@/helpers/auth";
import { getCRTDisplayName } from "@/helpers/crt";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    if (!verifyAdmin()) return redirect("/")
    const crts = await prisma.cRT.findMany({
        where: {
            verified: false
        }
    })
    return <div>
        <h1>Dashboard</h1>
        <h2>Submissions awaiting approval</h2>
        <ul>
            {crts.map((crt, i) =>
                <li key={i}>{getCRTDisplayName(crt)}</li>
            )}
        </ul>
    </div>
}