import prisma from "@/client"
import Image from 'next/image'
import ApproveCRTButton from "@/components/ApproveCRTButton"
import DeleteCRTButton from "@/components/deleteCRTButton"
import NotFound from "@/components/not-found"
import { verifyAdmin } from "@/helpers/auth"
import { CRT_FIELD_NAMES, getCRTDisplayName } from "@/helpers/crt"
import NavLink from "@/components/NavLink"
import React from "react"

export const fetchCache = 'force-no-store';

export default async function CRTPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const crtId = parseInt(id)
    const crt = await prisma.cRT.findFirst({
        where: {
            id: crtId
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
            {isAdmin && <NavLink href={`${crtId}/edit`}>Edit CRT</NavLink>}
            {isAdmin && <DeleteCRTButton id={crtId} />}
            {isAdmin && !crt.verified && <ApproveCRTButton id={crtId} />}
            <h1 className="text-4xl mb-4">{getCRTDisplayName(crt)}</h1>
            <div className="grid grid-cols-2 w-xl">
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
                        .map((field, i) => (
                            <React.Fragment key={field}>
                                <div className="border-2 border-slate-800 p-1">{CRT_FIELD_NAMES[field]}</div>
                                <div className="border-2 border-slate-800 p-1">{crt[field]}</div>
                            </React.Fragment>
                        ))

                }
            </div>

            {crt.images.length > 0 && (
                <>
                    <h1 className="text-2xl font-bold">Images</h1>
                    {crt.images.map((image) => (
                        <Image
                            width={400}
                            height={400}
                            key={image.id}
                            src={`/crt/photo/${image.id}`}
                            alt={image.description || "image"}
                        />
                    ))}
                </>
            )}
        </div>
    )
}