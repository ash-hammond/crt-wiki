import { CRTSubmission } from "@/app/crt/submit/actions";
import prisma from "@/client";
import { CRTForm, EditCRTForm } from "@/components/CRTForm";
import NotFound from "@/components/not-found";
import { auth, isAdmin } from "@/helpers/auth";
import { CRTSubmissionSchema } from "@/helpers/crt";
import assert from "assert";
import { editCRT } from "./actions";

export default async function CRTEditPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const id = parseInt(slug)
    const crt = await prisma.cRT.findFirst({
        where: {
            id: id
        },
        include: {
            images: true
        }
    })

    if (crt == null) return <NotFound />
    const values = { ...crt } as unknown as Omit<CRTSubmission, "images"> & { images: File[] }
    values.images = crt.images.map((image) => new File([image.data], image.description || "image.png"))

    return <div>
        <h1>CRT Edit</h1>
        <EditCRTForm id={id} values={values} />

    </div>
}