'use server'
import prisma from "@/client";
import { verifyAdmin } from "@/helpers/auth";
import { CRTSubmissionSchema } from "@/helpers/crt";
import * as z from "zod";

export async function submitCRT(data: CRTSubmission) {
    CRTSubmissionSchema.parse(data)
    if (!verifyAdmin()) return false
    const images = await Promise.all(data.images.map(async (image) => ({
        description: image.name,
        data: Buffer.from(await image.arrayBuffer())
    })))
    const shallowData: any = { ...data }
    shallowData.images = undefined

    const crt = await prisma.cRT.create({
        data: {
            ...shallowData as Omit<CRTSubmission, "images">,
            images: {
                create: images
            }
        },
        include: {
            images: true
        }
    })

    return { success: true };
}

export type CRTSubmission = z.infer<typeof CRTSubmissionSchema>