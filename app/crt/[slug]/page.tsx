import prisma from "@/client"
import Image from 'next/image'
import ApproveCRTButton from "@/components/ApproveCRTButton"
import DeleteCRTButton from "@/components/deleteCRTButton"
import NotFound from "@/components/not-found"
import { verifyAdmin } from "@/helpers/auth"
import { CRT_FIELD_NAMES, getCRTDisplayName } from "@/helpers/crt"
import NavLink from "@/components/NavLink"

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
        },
        include: {
            images: {
                select: {
                    id: true,
                    description: true
                }
            }
        }
    })
    const isAdmin = await verifyAdmin()

    if (crt == null) return <NotFound />

    return (
        <div>
            {isAdmin && <NavLink href={`${id}/edit`}>Edit CRT</NavLink>}
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
            <h1 className="text-2xl font-bold">Images</h1>
            {crt.images.map((image) => <Image width={400} height={400} key={image.id} src={`/crt/photo/${image.id}`} alt={image.description || "image"} ></Image>)}
        </div>
    )
}