'use server'
import prisma from "@/client";
import { verifyAdmin } from "@/helpers/auth";
import { CRTSubmissionSchema } from "@/helpers/crt";
import * as z from "zod";

export async function submitCRT(data: CRTSubmission) {
    CRTSubmissionSchema.parse(data)
    if (!verifyAdmin()) return false

    const crt = await prisma.cRT.create({
        data: data,
        include: {
            images: true,
        },
    });

    return { success: true, crt };
}

export type CRTSubmission = z.infer<typeof CRTSubmissionSchema>