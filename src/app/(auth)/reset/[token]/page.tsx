/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardBody, Input, Button, cn } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { API_AUTH } from "@/lib/services/auth_service";
import { ErrorResponse } from "@/lib/types/common";
import { handleServerError } from "@/lib/api/_axios";
import { useParams, useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getUrl, URLs } from "@/lib/constants/urls";
import { FadeIn } from "@/lib/components/Motion/FadeIn";

const ResetPassword = () => {
  const params = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = params.token as string;
      const response = await API_AUTH.resetPassword(password, token);

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          router.push(getUrl(URLs.auth.login));
        }, 1200);
      }
    } catch (e) {
      handleServerError(e as ErrorResponse, (err_msg) => {
        setError(
          err_msg ? (err_msg as string) : "Server error try again later"
        );
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <FadeIn className="lg:max-w-[40%] max-w-[90%] w-full">
        <Card shadow="none" className="w-full bg-transparent p-3 sm:p-5">
          <CardBody className={cn("overflow-hidden")}>
            <div className="h-full flex flex-col gap-2">
              <form
                className="h-full flex flex-col gap-2"
                onSubmit={(e) => handleSubmit(e)}
              >
                <h1 className="mb-4 text-2xl font-semibold uppercase">FMC</h1>

                <div className="flex flex-col gap-2 mb-2">
                  <h2 className="text-2xl font-semibold flex items-center justify-between">
                    New account password
                  </h2>

                  <p>
                    Please enter a new password to reset your agent account.
                  </p>
                </div>

                <Input
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  required
                  isRequired
                  isDisabled={loading || success}
                  value={password}
                  onValueChange={(value) => setPassword(value)}
                  validationState={error ? "invalid" : "valid"}
                  errorMessage={error}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />

                <Button
                  type="submit"
                  size="lg"
                  color={success ? "success" : "primary"}
                  className="mt-3 hover:bg-zinc-800 font-semibold hover:text-white"
                  isLoading={loading}
                  isDisabled={success}
                >
                  {success ? "Password Changed" : "Update Password"}
                </Button>
              </form>
            </div>
          </CardBody>
        </Card>
      </FadeIn>
    </div>
  );
};

export default ResetPassword;
