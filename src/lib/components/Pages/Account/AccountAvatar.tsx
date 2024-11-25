"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { ErrorResponse } from "@/lib/types/common";
import { handleServerError } from "@/lib/api/_axios";
import { API_UPLOAD } from "@/lib/services/upload_service";

const AccountAvatar = ({ handleChange, avatar }) => {
  const params = useParams();
  const organization = params.organization as string;

  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    disabled: loading,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      uploadFiles(acceptedFiles);
    },
  });

  const uploadFiles = async (files: File[]) => {
    try {
      setLoading(true);
      toast.loading("Uploading image...", { id: "avatar" });

      const data = appendFormData(files);
      const result = await API_UPLOAD.uploadFiles(data);

      toast.success("Image uploaded", { id: "avatar" });

      handleChange("avatar", result.files[0]);
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id: "avatar" });
      });
    } finally {
      setLoading(false);
    }
  };

  const appendFormData = (files: File[]) => {
    const formData = new FormData();
    const path = `${organization}/avatars`;

    formData.append("type", path);

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    return formData;
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-base font-medium text-default-700 px-1">
        Profile Image
      </p>
      <p className="mb-2 text-sm font-normal text-default-400 px-1">
        Avatar displayed for customers in the chatbot widget.
      </p>

      <div className="flex items-center justify-start px-8">
        <div
          {...getRootProps({
            className:
              "w-full max-w-40 h-full p-3 cursor-pointer lg:aspect-square",
          })}
        >
          <input {...getInputProps()} />

          <div className="aspect-square w-full h-full">
            {avatar ? (
              <Image
                alt="avatar"
                src={avatar}
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full object-cover rounded-full border-primary border-dashed border flex items-center justify-center text-2xl text-primary">
                +
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAvatar;
