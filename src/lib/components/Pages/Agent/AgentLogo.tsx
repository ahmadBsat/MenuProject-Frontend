/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { toast } from "sonner";
import React, { useState } from "react";
import { DeleteIcon } from "@/utils/icons";
import { useDropzone } from "react-dropzone";
import { AgentFormProps } from "@/lib/types/agent";
import { ErrorResponse } from "@/lib/types/common";
import { Button, Spinner } from "@nextui-org/react";
import { handleServerError } from "@/lib/api/_axios";
import { API_UPLOAD } from "@/lib/services/upload_service";

type Props = { path: string } & AgentFormProps;

export default function AgentLogo({
  data,
  editable,
  path,
  handleChange,
}: Props) {
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    disabled: !editable || loading || data.logo ? true : false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      uploadFiles(acceptedFiles);
    },
  });

  const removeFile = async () => {
    const id = "logo-remove";

    try {
      setLoading(true);
      toast.loading("Deleting image...", { id });

      await API_UPLOAD.deleteImage(data.logo);

      handleChange("logo", "");
      toast.success("Image deleted", { id });
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async (files: File[]) => {
    const id = "logo-agent-upload";

    try {
      setLoading(true);
      toast.loading("Uploading agent logo...", { id });

      const data = appendFormData(files);
      const result = await API_UPLOAD.uploadFiles(data);

      toast.success("Agent logo uploaded", { id });

      handleChange("logo", result.files[0]);
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setLoading(false);
    }
  };

  const appendFormData = (files: File[]) => {
    const formData = new FormData();

    formData.append("type", path);

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    return formData;
  };

  const Status = () => {
    return loading ? (
      <div className="text-center mt-4 flex items-center text-xs gap-3 justify-center">
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
        Uploading...
      </div>
    ) : (
      <div className="mt-4 text-sm flex flex-col items-center justify-center text-center font-medium">
        {data.logo && (
          <div>
            <Button
              radius="full"
              onClick={removeFile}
              isIconOnly
              color="danger"
            >
              <DeleteIcon />
            </Button>
          </div>
        )}
        <p>250x250 Min size/ 5 MB Max</p>
      </div>
    );
  };

  return (
    <section className="flex items-center justify-center px-4">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 items-center px-8">
        <div
          {...getRootProps({
            className: "w-full h-full p-3 cursor-pointer lg:aspect-square",
          })}
        >
          <input {...getInputProps()} />

          <div className="aspect-square w-full h-full">
            {data.logo ? (
              <Image
                alt="avatar"
                src={data.logo}
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full object-cover rounded-full border-primary border-dashed border"></div>
            )}
          </div>

          <Status />
        </div>

        <div className="hidden lg:flex flex-col">
          <div className="flex items-center my-3 gap-2">
            <div className="rounded-full size-32 aspect-square bg-gray-200">
              {data.logo && (
                <Image
                  alt="avatar"
                  src={data.logo}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <div className="rounded-full size-[60px] aspect-square bg-gray-200">
              {data.logo && (
                <Image
                  alt="avatar"
                  src={data.logo}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <div className="rounded-full size-10 aspect-square bg-gray-200">
              {data.logo && (
                <Image
                  alt="avatar"
                  src={data.logo}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <div className="rounded-full size-8 aspect-square bg-gray-200">
              {data.logo && (
                <Image
                  alt="avatar"
                  src={data.logo}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
