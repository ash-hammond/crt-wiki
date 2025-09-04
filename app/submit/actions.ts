"use server";
import prisma from "@/client";
import { CRT } from "../../generated/prisma";
import { auth } from "@/helpers/auth";

export async function deleteCRT(crt: CRT) {
  await prisma.cRTImage.deleteMany({
    where: {
      crtId: crt.id
    }
  })

  await prisma.cRT.delete({
    where: {
      id: crt.id
    }
  })
}

export async function submitCRT(formData: FormData) {
  const session = await auth();
  console.log(session!)
  const imagesJson = formData.get("images") as string;
  const images = JSON.parse(imagesJson || "[]");

  const data = {
    name: formData.get("name") as string,
    brand: formData.get("brand") as string || null,
    manufacturer: formData.get("manufacturer") as string || null,
    author: formData.get("author") as string || null,
    model: formData.get("model") as string || null,
    series: formData.get("series") as string || null,
    screenSize: formData.get("screenSize") as string || null,
    inputs: formData.get("inputs") as string || null,
    supportedResolutions: formData.get("supportedResolutions") as string || null,
    formats: formData.get("formats") as string || null,
    aspectRatio: formData.get("aspectRatio") as string || null,
    tubeMake: formData.get("tubeMake") as string || null,
    chassis: formData.get("chassis") as string || null,
    audio: formData.get("audio") as string || null,
    purpose: formData.get("purpose") as string || null,
    yearLaunched: formData.get("yearLaunched") ? parseInt(formData.get("yearLaunched") as string) : null,
    yearDiscontinued: formData.get("yearDiscontinued") ? parseInt(formData.get("yearDiscontinued") as string) : null,
    weight: formData.get("weight") as string || null,
    physicalSize: formData.get("physicalSize") as string || null,
    degaussingType: formData.get("degaussingType") as string || null,
    assemblyCountry: formData.get("assemblyCountry") as string || null,
    physicalDescription: formData.get("physicalDescription") as string || null,
    operationalDescription: formData.get("operationalDescription") as string || null,
    serviceManualLink: formData.get("serviceManualLink") as string || null,
    ownersManualLink: formData.get("ownersManualLink") as string || null,
    summary: formData.get("summary") as string || null,
    similarMakesAndModels: formData.get("similarMakesAndModels") as string || null,
    originalRemoteMakeAndModel: formData.get("originalRemoteMakeAndModel") as string || null,
  };

  const crt = await prisma.cRT.create({
    data: {
      ...data,
      images: {
        create: images.filter((img: any) => img.url).map((img: any) => ({
          url: img.url,
          description: img.description || null,
        })),
      },
    },
    include: {
      images: true,
    },
  });

  return { success: true, crt };
}