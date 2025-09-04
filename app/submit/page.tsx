"use client";

import { useState } from "react";
import { submitCRT } from "./actions";
import { FieldErrors, Path, RegisterOptions, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

// TODO require at least 1 image
// BRAND then MODEL #
type ShallowInputs = {
  model: string
  brand: string
  manufacturer?: string
  author?: string
  series?: string
  screenSize: string
  inputs?: string
  supportedResolutions?: string
  formats?: string
  aspectRatio: string
  tubeMake?: string
  chassis?: string
  audio?: string
  purpose?: string
  yearLaunched?: number
  yearDiscontinued?: number
  weight?: string
  physicalSize?: string
  degaussingType?: string
  assemblyCountry?: string
  physicalDescription: string
  operationalDescription?: string
  serviceManualLink?: string
  ownersManualLink?: string
  summary: string
  similarMakesAndModels?: string
  originalRemoteMakeAndModel?: string
}

function Input({ label, register, errors }: { label: Path<ShallowInputs>, register: UseFormRegister<Inputs>, errors: FieldErrors<Inputs> }) {
  const required = INPUT_NAMES[label]!.requirements?.required
  return <div>
    <label className="block text-sm font-medium mb-1">
      {INPUT_NAMES[label]!.title + (required ? "*" : "")}
    </label>
    {INPUT_NAMES[label]!.description ? <p className="text-xs">{INPUT_NAMES[label]!.description}</p> : null}
    <input
      {...register(label, INPUT_NAMES[label]!.requirements)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    {errors[label]?.type == "required" && <div className="bg-red-400 text-white p-1">required.</div>}
  </div >
}

const INPUT_NAMES: { [P in keyof ShallowInputs]: { title: string, description?: string, requirements?: RegisterOptions<ShallowInputs> } } = {
  model: {
    title: "Model", description: "This device's identification",
    requirements: {
      required: true
    }
  },
  brand: {
    title: "Brand", description: "The company advertised on the device",
    requirements: {
      required: true
    }
  },
  manufacturer: { title: "Manufacturer", description: "The company who made the device" },
  author: {
    title: "Author", description: "Your name", requirements: {
      required: true
    }
  },
  series: {
    title: "Series",
    description: "The brand's series to which this model belongs to, aka product line-up"
  },
  screenSize: { title: "Screen Size", description: "The screen's diagonal length in inches" },
  inputs: { title: "Inputs", description: "The types of connections natively supported by the device" },
  supportedResolutions: { title: "Supported Resolutions", description: "The resolutions supported by the device" },
  formats: { title: "Formats", description: "The analog television encoding system (NTSC, SECAM, PAL, etc)" },
  aspectRatio: { title: "Aspect Ratio", description: "The width to height ratio of the device's screen" },
  tubeMake: { title: "Tube Make", description: "The device's tube's identification" },
  chassis: { title: "Chassis", description: "The device's frame type" },
  audio: { title: "Audio", description: "The type of audio supported natively by the device (stereo, mono, etc)" },
  purpose: { title: "Purpose", description: "The purpose of the device as advertised by the brand" },
  yearLaunched: { title: "Year Launched" },
  yearDiscontinued: { title: "Year Discontinued" },
  weight: { title: "Weight (lb)" },
  physicalSize: { title: "Physical Size (LxWxH in inches)" },
  degaussingType: { title: "Degaussing Type", description: "Does the tube include degaussing?" },
  assemblyCountry: { title: "Assembly Country" },
  physicalDescription: {
    title: "Physical Description",
    requirements: {
      required: true
    }
  },
  operationalDescription: { title: "Operational Description" },
  serviceManualLink: { title: "Service Manual Link" },
  ownersManualLink: { title: "Owner's Manual Link" },
  summary: {
    title: "Summary", description: "Description", requirements: {
      required: true
    }
  },
  similarMakesAndModels: { title: "Similar Makes and Models" },
  originalRemoteMakeAndModel: {
    title: "Original Remote Make and Model"
  }
}

type Inputs = ShallowInputs & {
  images?: Array<{
    url: string,
    description?: string | null
  }>
}

export default function SubmitPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>()

  const [images, setImages] = useState<{ url: string; description: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleAddImage = () => {
    setImages([...images, { url: "", description: "" }]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, field: "url" | "description", value: string) => {
    const updated = [...images];
    updated[index][field] = value;
    setImages(updated);
  };

  const onSubmit: SubmitHandler<Inputs> = console.log
  const _handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("images", JSON.stringify(images));

    try {
      await submitCRT(formData);
      alert("CRT submitted successfully!");
      (e.target as HTMLFormElement).reset();
      setImages([]);
    } catch (error) {
      alert("Error submitting CRT. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const sections: [string, (keyof ShallowInputs)[]][] = [
    ["Contributor", ["author"]],
    ["Identification", ["brand", "model", "tubeMake", "series", "similarMakesAndModels", "originalRemoteMakeAndModel"]],
    ["Screen", ["screenSize", "supportedResolutions", "degaussingType", "aspectRatio"]],
    ["Physical", ["weight", "physicalDescription", "physicalSize"]],
    ["Operations", ["operationalDescription", "inputs"]],
    ["Manuals", ["serviceManualLink", "ownersManualLink"]],
    ["Manufacturing", ["manufacturer", "assemblyCountry", "yearLaunched", "yearDiscontinued"]],
    ["Summary", ["summary"]],
  ]

  return (
    <form className="min-h-screen p-8 max-w-4xl mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl font-bold mb-8">Submit CRT Information</h1>
      {sections.map((section, i) =>
        <div key={i}>
          <h2 className="text-xl">{section[0]}</h2>
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section[1].map((field, j) => <Input errors={errors} key={j} register={register} label={field} />)}
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Images</h2>
          <button
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Image
          </button>
        </div>

        {images.map((image, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-md space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Image {index + 1}</h3>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <input
              type="url"
              placeholder="Image URL"
              value={image.url}
              onChange={(e) => handleImageChange(index, "url", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={image.description}
              onChange={(e) => handleImageChange(index, "description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </div>

      <SubmitButton disabled={submitting} />
    </form>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  return <button
    type="submit"
    disabled={disabled}
    className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
  >
    {disabled ? "Submitting..." : "Submit CRT"}
  </button>
}