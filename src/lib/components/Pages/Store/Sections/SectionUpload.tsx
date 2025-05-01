/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Upload from "@/lib/components/Common/Upload";
import { SectionForm } from "@/lib/types/store/section";

type Props = {
  type: string;
  section: SectionForm;
  handleChange: (field: keyof SectionForm, value: any) => void;
};

const SectionUpload = ({ section, type, handleChange }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Upload images={section?.images || []} type={type} onChange={handleChange} size={1} />
    </div>
  );
};

export default SectionUpload;
