'use client'
import { editCRT } from "@/app/crt/[id]/edit/actions";
import { CRTSubmission } from "@/app/crt/submit/actions";
import { CRT_FIELD_NAMES, CRTSubmissionSchema } from "@/helpers/crt";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLInputTypeAttribute, PropsWithChildren, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";


export function EditCRTForm({ values, id }: { id: number, values: CRTSubmission }) {
    return <CRTForm values={values} action={async (data) => {
        return await editCRT(data, id)
    }} />
}

export function CRTForm({ action, values }: { values?: CRTSubmission, action: (data: CRTSubmission) => Promise<any>; }) {
    const {
        register, handleSubmit, formState: { errors }, control
    } = useForm<CRTSubmission>({
        resolver: zodResolver(CRTSubmissionSchema),
        values,
    });
    const [submitting, setSubmitting] = useState(false);

    const onSubmit: SubmitHandler<CRTSubmission> = async (formData) => {
        setSubmitting(true);

        try {
            await action(formData);
            alert("CRT submitted successfully!");
        } catch (error) {
            alert("Error submitting CRT. Please try again.");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    function Input({ type, label, description, required }: { type?: HTMLInputTypeAttribute; required?: boolean; description?: string; label: keyof typeof CRT_FIELD_NAMES; }) {
        const title = CRT_FIELD_NAMES[label];
        return <div>
            <Label id={label} title={title} required={required} description={description} />
            <input
                type={type}
                {...register(label, { required: required, valueAsNumber: type == "number" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {errors[label]?.message && <div className="bg-red-400 text-white p-1">{errors[label].message}</div>}
        </div>;
    }

    function ImagesSection({ defaultValue }: { defaultValue?: File[] }) {
        const [images, setImages] = useState<File[]>(defaultValue || [])
        return <Section title="Images">
            <Controller control={control} name="images" render={({ field: { onChange, name } }) => (
                <input className="w-full bg-gray-100 p-2 rounded-md text-black" name={name} type="file" multiple accept="image/*" onChange={(e) => {
                    onChange([...Array.from(e.target.files || [])])
                    setImages([...Array.from(e.target.files || [])])
                }} />
            )} />
            <br />
            {images.map((image) => (
                <img key={image.name} src={URL.createObjectURL(image)} alt={image.name} />
            ))}{errors["images"]?.message && <div className="bg-red-400 text-white p-1">{errors['images'].message}</div>}
        </Section>
    }

    return (
        <form className="min-h-screen p-8 max-w-4xl mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-bold mb-8">Submit CRT Information</h1>
            <Input required label="author" />
            <Label id="summary" title="Summary" required />
            <textarea rows={3} cols={90} {...register("summary", { required: true })}>

            </textarea>
            <Section title="Identification">
                <Input required description="The company advertised on the device" label="brand" />
                <Input required description="This device's identification" label="model" />
                <Input description="The device's tube's identification" label="tubeMake" />
                <Input description="The brand's series to which this model belongs to, aka product line-up" label="series" />
                <Input label="similarMakesAndModels" />
                <Input label="originalRemoteMakeAndModel" />
            </Section>
            <Section title="Screen">
                <Input description="The screen's diagonal length in inches" label="screenSize" />
                <Input label="supportedResolutions" />
                <Input label="degaussingType" />
                <Input label="aspectRatio" />
            </Section>
            <Section title="Physical">
                <Input label="weight" />
                <Input label="physicalDescription" />
                <Input label="physicalSize" />
            </Section>
            <Section title="Operational">
                <Input label="operationalDescription" />
                <Input label="inputs" />
            </Section>
            <Section title="Manuals">
                <Input label="serviceManualLink" />
                <Input label="ownersManualLink" />
            </Section>
            <Section title="Manufacturing">
                <Input label="manufacturer" />
                <Input label="assemblyCountry" />
                <Input type="string" label="yearLaunched" />
                <Input type="string" label="yearDiscontinued" />
            </Section>
            <ImagesSection defaultValue={values?.images} />
            <SubmitButton disabled={submitting} />
        </form>
    );

}
function Section({ title, children }: { title: string; } & PropsWithChildren) {
    return <>
        <h2 className="text-xl">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </>;

}
function SubmitButton({ disabled }: { disabled: boolean; }) {
    return <button
        type="submit"
        disabled={disabled}
        className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
    >
        {disabled ? "Submitting..." : "Submit CRT"}
    </button>;
}
function Label({ title, required, description, id }: { description?: string; id: string; title: string; required?: boolean; }) {
    return <><label id={id} className="block text-sm font-medium mb-1">
        {title + (required ? "*" : "")}
        {description && <p className="text-xs">{description}</p>}
    </label>
    </>;
}

