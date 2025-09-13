'use server'

import prisma from "@/client"
import { verifyAdmin } from "./auth"

export async function approveCRT(id: number) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) return false

    await prisma.cRT.update({
        data: {
            verified: true
        },
        where: {
            id: id
        }
    })
    return true
}
export async function deleteCRT(id: number) {
    await prisma.cRT.delete({
        where: {
            id: id
        }
    })
}