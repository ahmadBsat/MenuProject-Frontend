/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardBody, Input, Button, cn } from "@nextui-org/react";
import { FormEvent, Usable, use, useState } from "react";
import { API_AUTH } from "@/lib/services/auth_service";
import { ErrorResponse } from "@/lib/types/common";
import { handleServerError } from "@/lib/api/_axios";
import { FadeIn } from "@/lib/components/Motion/FadeIn";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await API_AUTH.forgotPassword(email);

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (e) {
      handleServerError(e as ErrorResponse, (err_msg) => {
        setError(err_msg as string);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("w-full h-screen flex items-center justify-center")}>
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
                  <h2 className="text-2xl font-semibold">
                    Reset your account password
                  </h2>
                  <p>
                    Please enter your agent registered email address to receive
                    password reset link.
                  </p>
                </div>

                <Input
                  type="email"
                  label="Email"
                  required
                  isRequired
                  isDisabled={loading || success}
                  value={email}
                  onValueChange={(value) => setEmail(value)}
                  validationState={error ? "invalid" : "valid"}
                  errorMessage={error}
                  isClearable
                />

                <Button
                  type="submit"
                  size="lg"
                  color={success ? "success" : "primary"}
                  className="mt-3 hover:bg-zinc-800 font-semibold hover:text-white"
                  isLoading={loading}
                  isDisabled={success}
                >
                  {success ? "Email Sent" : "Reset Password"}
                </Button>
              </form>
            </div>
          </CardBody>
        </Card>
      </FadeIn>
    </div>
  );
};

export default ForgotPassword;
