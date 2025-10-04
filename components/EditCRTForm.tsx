'use client';
import { editCRT } from "@/app/crt/[id]/edit/actions";
import { CRTSubmission } from "@/app/crt/submit/actions";
import { CRTForm } from "./CRTForm";



export function EditCRTForm({ submission, id }: { id: number; submission: CRTSubmission; }) {
    return <CRTForm values={submission} onSubmit={async (data) => {
        return await editCRT(data, id);
    }} />;
}
