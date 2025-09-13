import prisma from "@/client"
import ApproveCRTButton from "@/components/ApproveCRTButton"
import DeleteCRTButton from "@/components/deleteCRTButton"
import NotFound from "@/components/not-found"
import { verifyAdmin } from "@/helpers/auth"
import { CRT_FIELD_NAMES, getCRTDisplayName } from "@/helpers/crt"
import Link from "next/link"

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const id = parseInt(slug)
    const crt = await prisma.cRT.findFirst({
        where: {
            id: id
        }
    })
    const isAdmin = await verifyAdmin()

    if (crt == null) return <NotFound />

    return (
        <div>
            {isAdmin && <Link href={`${id}/edit`}>Edit CRT</Link>}
            {isAdmin && <DeleteCRTButton id={id} />}
            {isAdmin && !crt.verified && <ApproveCRTButton id={id} />}
            <h1>{getCRTDisplayName(crt)}</h1>
            {
                ([
                    "tubeMake",
                    "series",
                    "summary",
                    "similarMakesAndModels",
                    "originalRemoteMakeAndModel",
                    "screenSize",
                    "supportedResolutions",
                    "degaussingType",
                    "aspectRatio",
                    "weight",
                    "physicalDescription",
                    "inputs",
                    "serviceManualLink",
                    "ownersManualLink",
                    "manufacturer",
                    "assemblyCountry",
                    "yearLaunched",
                    "yearDiscontinued",
                    "author",
                    "formats",
                    "chassis",
                    "audio",
                    "purpose",
                ] as (keyof typeof CRT_FIELD_NAMES)[])
                    .map((field, i) => <p key={i}>{CRT_FIELD_NAMES[field]}: {crt[field]}</p>)
            }
        </div>
    )
}