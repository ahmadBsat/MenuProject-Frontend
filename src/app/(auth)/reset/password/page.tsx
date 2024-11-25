/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardBody, Input, Button, cn } from "@nextui-org/react";
import { FormEvent, Usable, use, useState } from "react";
import { API_AUTH } from "@/lib/services/auth_service";
import { ErrorResponse } from "@/lib/types/common";
import { handleServerError } from "@/lib/api/_axios";
import { FadeIn } from "@/lib/components/Motion/FadeIn";
import { LanguagePageProps, LanguageParams } from "@/lib/types/page";
import { useTranslation } from "@/lib/i18n/client";
import { checkRTL } from "@/utils/common";

const ForgotPassword = ({ params }: LanguagePageProps) => {
  const { lang } = use<LanguageParams>(
    params as unknown as Usable<LanguageParams>
  );

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(lang, "auth");

  const rtl = checkRTL(lang);

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
    <div
      className={cn(
        "w-full h-screen flex items-center justify-center",
        rtl && "text-right"
      )}
    >
      <FadeIn className="lg:max-w-[40%] max-w-[90%] w-full">
        <Card shadow="none" className="w-full bg-transparent p-3 sm:p-5">
          <CardBody className={cn("overflow-hidden", rtl && "text-right")}>
            <div className="h-full flex flex-col gap-2">
              <form
                className="h-full flex flex-col gap-2"
                onSubmit={(e) => handleSubmit(e)}
              >
                <h1 className="mb-4 text-2xl font-semibold uppercase">
                  {t("FMC")}
                </h1>

                <div className="flex flex-col gap-2 mb-2">
                  <h2 className="text-2xl font-semibold">
                    {t("reset-password")}
                  </h2>
                  <p>{t("reset-password-desc")}</p>
                </div>

                <Input
                  type="email"
                  label={t("email")}
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
                  {success ? t("email-sent") : t("reset-btn")}
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
