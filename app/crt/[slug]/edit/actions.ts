'use server'
import { CRTSubmission } from "@/app/submit/actions";
import prisma from "@/client";
import { auth, isAdmin } from "@/helpers/auth";
import { CRTSubmissionSchema } from "@/helpers/crt";
import assert from "assert";

export async function editCRT(data: CRTSubmission, id: number) {
    CRTSubmissionSchema.parse(data)
    const session = await auth();
    assert(session)
    if (!isAdmin(session)) return false

    const crt = await prisma.cRT.update({
        where: {
            id: id
        },
        data: data,
    });

    return { success: true, crt };
}

