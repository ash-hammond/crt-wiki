import prisma from "@/client"
import DeleteCRTButton from "@/components/deleteCRTButton"
import NotFound from "@/components/not-found"
import { CRT_FIELD_NAMES } from "@/helpers/crt"

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

    if (crt == null) return <NotFound />

    return (
        <div>
            <DeleteCRTButton id={id} />
            <h1>{crt.brand} {crt.model}</h1>
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