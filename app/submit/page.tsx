"use client";

import { HTMLInputTypeAttribute, PropsWithChildren, useState } from "react";
import { CRTSubmission, ShallowInputs, submitCRT } from "./actions";
import { FieldErrors, Path, RegisterOptions, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CRTSubmissionSchema } from "@/helpers/crt";

export default function SubmitPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CRTSubmission>({
    resolver: zodResolver(CRTSubmissionSchema)
  })
  const [submitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<CRTSubmission> = async (formData) => {
    setSubmitting(true);

    try {
      await submitCRT(formData);
      alert("CRT submitted successfully!");
      //setImages([]);
    } catch (error) {
      alert("Error submitting CRT. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="min-h-screen p-8 max-w-4xl mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl font-bold mb-8">Submit CRT Information</h1>
      <Input required title="Author" label="author" register={register} errors={errors} />
      <Input required title="Summary" label="summary" register={register} errors={errors} />
      <Section title="Identification">
        <Input required title="Brand" description="The company advertised on the device" label="brand" register={register} errors={errors} />
        <Input required title="Model" description="This device's identification" label="model" register={register} errors={errors} />
        <Input title="Tube Make" description="The device's tube's identification" label="tubeMake" register={register} errors={errors} />
        <Input title="Series" description="The brand's series to which this model belongs to, aka product line-up" label="series" register={register} errors={errors} />
        <Input title="Similar Makes and Models" label="similarMakesAndModels" register={register} errors={errors} />
        <Input title="Original Remote Make and Model" label="originalRemoteMakeAndModel" register={register} errors={errors} />
      </Section>
      <Section title="Screen">
        <Input title="Screen Size" description="The screen's diagonal length in inches" label="screenSize" register={register} errors={errors} />
        <Input title="Supported Resolutions" label="supportedResolutions" register={register} errors={errors} />
        <Input title="Degaussing Type" label="degaussingType" register={register} errors={errors} />
        <Input title="Aspect Ratio" label="aspectRatio" register={register} errors={errors} />
      </Section>
      <Section title="Physical">
        <Input title="Weight" label="weight" register={register} errors={errors} />
        <Input title="Physical Description" label="physicalDescription" register={register} errors={errors} />
        <Input title="Physical Size" label="physicalSize" register={register} errors={errors} />
      </Section>
      <Section title="Operational">
        <Input title="Operational Description" label="operationalDescription" register={register} errors={errors} />
        <Input title="Inputs" label="inputs" register={register} errors={errors} />
      </Section>
      <Section title="Manuals">
        <Input title="Service Manual Link" label="serviceManualLink" register={register} errors={errors} />
        <Input title="Owners Manual Link" label="ownersManualLink" register={register} errors={errors} />
      </Section>
      <Section title="Manufacturing">
        <Input title="Manufacturer" label="manufacturer" register={register} errors={errors} />
        <Input title="Assembly Country" label="assemblyCountry" register={register} errors={errors} />
        <Input type="number" title="Year Launched" label="yearLaunched" register={register} errors={errors} />
        <Input type="number" title="Year Discontinued" label="yearDiscontinued" register={register} errors={errors} />
      </Section>
      <SubmitButton disabled={submitting} />
    </form>
  );
}

function Section({ title, children }: { title: string } & PropsWithChildren) {
  return <>
    <h2 className="text-xl">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </>

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

function Input({ type, label, description, title, register, errors, required }: { type?: HTMLInputTypeAttribute, required?: boolean, description?: string, title: string, label: Path<ShallowInputs>, register: UseFormRegister<CRTSubmission>, errors: FieldErrors<CRTSubmission> }) {
  return <div>
    <label className="block text-sm font-medium mb-1">
      {title + (required ? "*" : "")}
    </label>
    {description && <p className="text-xs">{description}</p>}
    <input
      type={type}
      {...register(label, { required: required, valueAsNumber: type == "number" })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    {errors[label]?.message && <div className="bg-red-400 text-white p-1">{errors[label].message}</div>}
  </div >
}
