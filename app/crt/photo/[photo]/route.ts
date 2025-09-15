import prisma from "@/client"

export async function GET(request: Request, { params }: { params: { photo: string } }) {
    const { photo: slug } = params
    const photo = await prisma.cRTImage.findFirst({
        where: {
            id: parseInt(slug)
        }
    })
    return new Response(photo?.data, { headers: { 'Content-Type': 'images' } })

}