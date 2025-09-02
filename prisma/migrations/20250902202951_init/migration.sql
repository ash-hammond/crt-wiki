-- CreateTable
CREATE TABLE "public"."CRTImage" (
    "id" SERIAL NOT NULL,
    "crtId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CRTImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CRT" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "manufacturer" TEXT,
    "author" TEXT,
    "model" TEXT,
    "series" TEXT,
    "screenSize" TEXT,
    "inputs" TEXT,
    "supportedResolutions" TEXT,
    "formats" TEXT,
    "aspectRatio" TEXT,
    "tubeMake" TEXT,
    "chassis" TEXT,
    "audio" TEXT,
    "purpose" TEXT,
    "yearLaunched" INTEGER,
    "yearDiscontinued" INTEGER,
    "weight" TEXT,
    "physicalSize" TEXT,
    "degaussingType" TEXT,
    "assemblyCountry" TEXT,
    "physicalDescription" TEXT,
    "operationalDescription" TEXT,
    "serviceManualLink" TEXT,
    "ownersManualLink" TEXT,
    "summary" TEXT,
    "similarMakesAndModels" TEXT,
    "originalRemoteMakeAndModel" TEXT,

    CONSTRAINT "CRT_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CRTImage" ADD CONSTRAINT "CRTImage_crtId_fkey" FOREIGN KEY ("crtId") REFERENCES "public"."CRT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
