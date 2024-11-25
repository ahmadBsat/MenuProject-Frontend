/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { createRef, RefObject, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  ModalProps,
} from "@nextui-org/react";
import { API_AUTH } from "@/lib/services/auth_service";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse } from "@/lib/types/common";
import { toast } from "sonner";

type Props = {
  title: string;
  email: string;
  handleSuccess: () => void;
} & ModalProps;

const ModalOTP = ({
  title,
  children,
  isOpen,
  email,
  onOpenChange,
  handleSuccess,
  ...rest
}: Props) => {
  const [inputs, setInputs] = useState<string[]>(Array(6).fill(""));
  const [currentInput, setCurrentInput] = useState<number>(0);
  const [refs, setRefs] = useState<RefObject<HTMLInputElement>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState<string | number>(Date.now() + 10000);

  useEffect(() => {
    setRefs((refs) =>
      Array(6)
        .fill(0)
        .map((_, i) => refs[i] || createRef())
    );
  }, []);

  useEffect(() => {
    if (currentInput === 6) {
      handleVerify();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInput]);

  const handleChange = (index: number, value: string) => {
    // Allow only one digit in each input
    const digit = value.slice(-1); // Take the last entered character
    const newInputs = [...inputs];
    newInputs[index] = digit;
    setInputs(newInputs);
    setError("");

    // Move focus to the next input
    if (index <= 5 && digit !== "") {
      setCurrentInput(index + 1);

      if (refs[index + 1] && refs[index + 1].current) {
        refs[index + 1].current?.focus();
      }
    }
  };

  const handleVerify = async () => {
    setLoading(true);

    try {
      const temp = { code: inputs.join(""), email };
      const response = await API_AUTH.verifyEmail(temp);

      if (response.success) {
        setSuccess(true);
        handleSuccess();
      }
    } catch (err) {
      handleServerError(err as ErrorResponse, (err_msg) => {
        setError(err_msg as string);
      });
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true);

    if (email) {
      try {
        const response = await API_AUTH.resendEmail(email);
        toast.success(response.message);
      } catch (err) {
        handleServerError(err as ErrorResponse, (msg, json) => {
          toast.error(msg);
          setTimer(json.timer);
          setError(msg as string);
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      placement={"auto"}
      onOpenChange={onOpenChange}
      isDismissable={false}
      backdrop="blur"
      hideCloseButton
      className="shadow-none"
    >
      <ModalContent>
        {(onClose) => (
          <>
            {/* <ModalHeader>{title}</ModalHeader> */}

            <ModalBody className="py-6 sm:py-10 px-4 sm:px-12">
              {children}

              <div className="grid grid-cols-6 gap-2 p-0 mt-4 mb-1">
                {inputs.map((value, index) => (
                  <Input
                    key={index}
                    type="number"
                    required
                    isRequired
                    isClearable={false}
                    value={value}
                    onFocus={() => setCurrentInput(index)}
                    onValueChange={(val) => handleChange(index, val)}
                    className="aspect-square"
                    classNames={{
                      inputWrapper:
                        "data-[hover=true]:bg-secondary/30 group-data-[focus=true]:bg-secondary/30 text-zinc-700 h-20",
                      input:
                        "text-zinc-700 text-3xl text-center font-bold placeholder:text-zinc-700 w-7",
                      label: "text-zinc-700",
                      innerWrapper:
                        "text-center items-center justify-center flex",
                    }}
                    isInvalid={error ? true : false}
                    ref={refs[index]} // Attach the ref to the input
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-8 mt-2">
                <p className="text-sm text-red-700">{error}</p>

                <Button
                  onClick={resendCode}
                  isLoading={loading}
                  className="bg-transparent text-sm text-primary"
                >
                  Resend
                </Button>
              </div>
            </ModalBody>

            <ModalFooter className="px-2 sm:px-10">
              <Button
                color={success ? "success" : "primary"}
                isLoading={loading}
                isDisabled={success}
                onClick={handleVerify}
              >
                {success ? "Verified" : "Confirm"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalOTP;
