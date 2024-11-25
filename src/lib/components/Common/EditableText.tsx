"use client";

import { EditIcon } from "@/utils/icons";
import { Input, cn } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

type Props = {
  text: string;
  placeholder?: string;
  onChange: (v: string) => void;
  className?: string;
};

const EditableText = ({ text, placeholder, className, onChange }: Props) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (value: string) => {
    onChange(value);
  };

  useOutsideClick(() => {
    setIsEditing(false);
  }, ref);

  return (
    <div onDoubleClick={handleDoubleClick} className="w-full">
      {isEditing ? (
        <Input
          ref={ref}
          type="text"
          variant="underlined"
          placeholder={placeholder}
          value={text}
          onValueChange={handleChange}
          onBlur={handleBlur}
          startContent={<EditIcon className="size-3 text-primary" />}
          className="w-full max-w-full xl:min-w-[700px]"
        />
      ) : (
        <div className={cn("flex gap-2 text-base sm:text-lg", className)}>
          <p className={cn(placeholder && !text && "")}>
            {text || placeholder}
          </p>
          <div
            className="cursor-pointer mt-2"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon className="size-4 text-primary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableText;
