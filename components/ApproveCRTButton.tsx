'use client'

import { approveCRT } from "@/helpers/deleteCRT"

export default function ApproveCRTButton({ id }: { id: number }) {
    return <button onClick={async () => {
        const result = await approveCRT(id)
        if (result) alert("Approved")
        else alert("failed")

    }}>Approve</button>
}