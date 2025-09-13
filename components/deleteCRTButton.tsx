'use client'

import { deleteCRT } from "@/helpers/deleteCRT"

export default function DeleteCRTButton({ id, }: { id: number }) {
    return <button onClick={async () => {
        await deleteCRT(id)
        window.location.href = "/"
    }}>
        Delete CRT
    </button>
}