import { CRT } from "@/generated/prisma";
import * as z from "zod";

const stringSchema = z.string().min(3, { message: "Must be at least 3 characters" });
const optionalString = z.string().optional().nullable()
const yearSchema = optionalString
export const CRTSubmissionSchema = z.strictObject({
    model: stringSchema,
    brand: optionalString,
    author: optionalString,
    manufacturer: optionalString,
    series: optionalString,
    screenSize: optionalString,
    inputs: optionalString,
    supportedResolutions: optionalString,
    formats: optionalString,
    aspectRatio: optionalString,
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
    physicalDescription: optionalString,
    operationalDescription: optionalString,
    serviceManualLink: optionalString,
    ownersManualLink: optionalString,
    summary: optionalString,
    similarMakesAndModels: optionalString,
    originalRemoteMakeAndModel: optionalString,
    images: z.array(z.instanceof(File)),
});
export const CRT_FIELD_NAMES = {
    brand: "Brand",
    model: "Model",
    tubeMake: "Tube Make",
    series: "Series",
    similarMakesAndModels: "Similar makes and Models",
    originalRemoteMakeAndModel: "Original Remote Make and Model",
    screenSize: "Screen Size",
    supportedResolutions: "Supported Resolutions",
    degaussingType: "Degaussing Type",
    aspectRatio: "Aspect Ratio",
    weight: "Weight",
    physicalDescription: "Physical Description",
    physicalSize: "Physical Size",
    operationalDescription: "Operational Description",
    inputs: "Inputs",
    serviceManualLink: "Service Manual Link",
    ownersManualLink: "Owners Manual Link",
    manufacturer: "Manufacturer",
    assemblyCountry: "Assembly Country",
    yearLaunched: "Year Launched",
    yearDiscontinued: "Year Discontinued",
    author: "Author",
    formats: "Formats",
    chassis: "Chassis",
    audio: "Audio",
    purpose: "Purpose",
    summary: "Summary",
};
export function getCRTDisplayName(crt: CRT) {
    const name = `${crt.brand} ${crt.model}`;
    if (name.trim().length == 0) return "unnamed"
    return name
}

