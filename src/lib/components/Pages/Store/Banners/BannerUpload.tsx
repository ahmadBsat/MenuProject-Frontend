/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Upload from "@/lib/components/Common/Upload";
import { BannerForm } from "@/lib/types/store/banner";

type Props = {
  type: string;
  banner: BannerForm;
  handleChange: (field: keyof BannerForm, value: any) => void;
};

const BannerUpload = ({ banner, type, handleChange }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Upload images={banner.images} type={type} onChange={handleChange} size={1} />
    </div>
  );
};

export default BannerUpload;
