'use server'

import prisma from "@/client"

export async function deleteCRT(id: number) {
    await prisma.cRT.delete({
        where: {
            id: id
        }
    })
}