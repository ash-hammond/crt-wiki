import * as z from "zod";

const stringSchema = z.string().min(3, { message: "Must be at least 3 characters" });
const optionalString = z.string().optional()
const yearSchema = optionalString
export const CRTSubmissionSchema = z.strictObject({
    model: stringSchema,
    brand: stringSchema,
    author: stringSchema,
    manufacturer: optionalString,
    series: optionalString,
    screenSize: stringSchema,
    inputs: optionalString,
    supportedResolutions: optionalString,
    formats: optionalString,
    aspectRatio: stringSchema,
    tubeMake: optionalString,
    chassis: optionalString,
    audio: optionalString,
    purpose: optionalString,
    yearLaunched: yearSchema,
    yearDiscontinued: yearSchema,
    weight: optionalString,
    physicalSize: optionalString,
    degaussingType: optionalString,
    assemblyCountry: optionalString,
    physicalDescription: stringSchema,
    operationalDescription: optionalString,
    serviceManualLink: optionalString,
    ownersManualLink: optionalString,
    summary: stringSchema,
    similarMakesAndModels: optionalString,
    originalRemoteMakeAndModel: optionalString,
})

