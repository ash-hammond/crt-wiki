'use server'
import { CRTSubmission } from "@/app/crt/submit/actions";
import prisma from "@/client";
import { auth, isAdmin } from "@/helpers/auth";
import { CRTSubmissionSchema } from "@/helpers/crt";
import assert from "assert";

export async function editCRT(data: CRTSubmission, id: number) {
    CRTSubmissionSchema.parse(data)
    const session = await auth();
    assert(session)
    if (!isAdmin(session)) return false

    const images = await Promise.all(data.images.map(async (image) => ({
        description: image.name,
        data: Buffer.from(await image.arrayBuffer())
    })))
    const { images: _, ...updateData } = data;

    const crt = await prisma.cRT.update({
        where: {
            id: id
        },
        data: {
            ...updateData,
            images: {
                deleteMany: {},
                create: images
            }
        },
    });

    return { success: true, crt };
}

