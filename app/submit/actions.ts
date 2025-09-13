'use server'
import prisma from "@/client";
import { auth, isAdmin } from "@/helpers/auth";
import { CRTSubmissionSchema } from "@/helpers/crt";
import assert from "assert";
import * as z from "zod";

export async function submitCRT(data: CRTSubmission) {
    CRTSubmissionSchema.parse(data)
    const session = await auth();
    assert(session)
    if (!isAdmin(session)) return false

    const crt = await prisma.cRT.create({
        data: data,
        include: {
            images: true,
        },
    });

    return { success: true, crt };
}
// TODO require at least 1 image
// BRAND then MODEL #

export type CRTSubmission = z.infer<typeof CRTSubmissionSchema>