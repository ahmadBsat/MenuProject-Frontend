/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { handleServerError } from "@/lib/api/_axios";

import { API_UPLOAD } from "@/lib/services/upload_service";
import { ErrorResponse } from "@/lib/types/common";
import { DeleteIcon } from "@/utils/icons";
import { Image, Button, Spinner, cn } from "@nextui-org/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsCloudUploadFill } from "react-icons/bs";
import { toast } from "sonner";

type Props = {
  images: string[];
  type: string;
  size?: number;
  onChange: (field: "images", value: any) => void;
};

export default function Upload({ images, type, onChange, size = 8 }: Props) {
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: size,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      uploadImages(acceptedFiles);
    },
  });

  const removeFile = async (url: string) => {
    const newFiles = images.filter((img) => img !== url);

    try {
      setLoading(true);
      toast.loading("Deleting image...", { id: "delete-image" });

      await API_UPLOAD.deleteImage(url);

      toast.success("Image deleted", { id: "delete-image" });
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id: "delete-image" });
      });
    } finally {
      setLoading(false);
    }

    onChange("images", newFiles);
  };

  const uploadImages = async (files: File[]) => {
    try {
      setLoading(true);
      toast.loading("Uploading image...", { id: "add-image" });

      const data = appendFormData(files);
      const results = await API_UPLOAD.uploadFiles(data);

      toast.success("Images uploaded", { id: "add-image" });

      onChange("images", [...images, ...results.files]);
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id: "add-image" });
      });
    } finally {
      setLoading(false);
    }
  };

  const appendFormData = (files: File[]) => {
    const formData = new FormData();

    formData.append("type", type);

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    return formData;
  };

  const thumbs = (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full py-2 px-1 sm:px-4 rounded-xl">
      {images.map((img, index) => {
        return (
          <div
            key={index}
            className="flex flex-col aspect-square gap-2 w-full items-center justify-between relative"
          >
            <Image
              isZoomed
              alt={"product"}
              className="h-full w-full aspect-square bg-gray-100"
              classNames={{
                wrapper: "w-full max-w-full h-full",
                zoomedWrapper: "w-full max-w-full h-full",
              }}
              src={img}
            />

            <div className="flex flex-col gap-2 absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
              <Button
                isIconOnly
                isDisabled={loading}
                color="danger"
                className="font-bold sm:p-1 text-lg sm:text-2xl"
                onClick={() => removeFile(img)}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section>
      <div
        {...getRootProps({
          className: cn(
            loading && "pointer-events-none",
            "text-gray-500 hover:opacity-70 hover:bg-primary/20 p-5 rounded-xl border-dashed flex items-center justify-center border border-primary transition-all duration-200 h-40"
          ),
        })}
      >
        <input {...getInputProps()} />

        {loading ? (
          <div className="text-center">
            <div className="w-full flex items-center justify-center mb-3 text-2xl">
              <Spinner />
            </div>
            Uploading files please wait...
          </div>
        ) : (
          <div className="text-center">
            <div className="w-full flex items-center justify-center mb-3 text-2xl">
              <BsCloudUploadFill />
            </div>
            Drag 'n' drop files here, or click to select files
            <br />
            (PNG, JPG, JPEG)
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-6">{thumbs}</div>
    </section>
  );
}
