import { CRTSubmission } from "@/app/crt/submit/actions";
import prisma from "@/client";
import { EditCRTForm } from "@/components/CRTForm";
import NotFound from "@/components/not-found";

export default async function CRTEditPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = parseInt((await params).id)
    const crt = await prisma.cRT.findFirst({
        where: {
            id
        },
        include: {
            images: true
        }
    })

    if (crt == null) return <NotFound />

    return <div>
        <h1>CRT Edit</h1>
        <EditCRTForm id={id} values={{
            ...crt,
            images: crt.images.map((image) =>
                new File([image.data.buffer.slice() as ArrayBuffer], image.description || "image.png")
            )
        }} />

    </div>
}