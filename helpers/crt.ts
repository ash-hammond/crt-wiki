import * as z from "zod";

const stringSchema = z.string().min(3, { message: "Must be at least 3 characters" });
const yearSchema = z.number().min(1000, { message: "Must be a valid year" }).max(2100, { message: "Must be a valid year" })
export const CRTSubmissionSchema = z.strictObject({
    model: stringSchema,
    brand: stringSchema,
    author: stringSchema,
    manufacturer: z.string().optional(),
    series: z.string().optional(),
    screenSize: stringSchema,
    inputs: z.string().optional(),
    supportedResolutions: z.string().optional(),
    formats: z.string().optional(),
    aspectRatio: stringSchema,
    tubeMake: z.string().optional(),
    chassis: z.string().optional(),
    audio: z.string().optional(),
    purpose: z.string().optional(),
    yearLaunched: yearSchema,
    yearDiscontinued: yearSchema,
    weight: z.string().optional(),
    physicalSize: z.string().optional(),
    degaussingType: z.string().optional(),
    assemblyCountry: z.string().optional(),
    physicalDescription: stringSchema,
    operationalDescription: z.string().optional(),
    serviceManualLink: z.string().optional(),
    ownersManualLink: z.string().optional(),
    summary: stringSchema,
    similarMakesAndModels: z.string().optional(),
    originalRemoteMakeAndModel: z.string().optional(),
})

