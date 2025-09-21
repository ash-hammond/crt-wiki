import prisma from "@/client"

export async function GET(request: Request, { params }: { params: Promise<{ photo: string }> }) {
    const { photo: slug } = await params
    const photo = await prisma.cRTImage.findFirst({
        where: {
            id: parseInt(slug)
        }
    })
    return new Response(photo?.data?.buffer.slice() as ArrayBuffer, { headers: { 'Content-Type': 'images' } })

}