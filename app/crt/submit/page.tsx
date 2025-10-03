"use client";

import { submitCRT } from "./actions";
import { CRTForm } from "@/components/CRTForm";

export default function SubmitPage() {
  return <CRTForm onSubmit={submitCRT} />
}



