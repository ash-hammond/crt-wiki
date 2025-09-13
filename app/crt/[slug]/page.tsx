import prisma from "@/client"
import NotFound from "@/components/not-found"

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const crt = await prisma.cRT.findFirst({
        where: {
            id: parseInt(slug)
        }
    })

    if (crt == null) return <NotFound />

    return (
        <div>
            <h1>{crt.brand} {crt.model}</h1>
        </div>
    )
}