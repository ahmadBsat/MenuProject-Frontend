"use client";

import { handleServerError } from "@/lib/api/_axios";
import { useAuth } from "@/lib/context/AuthContext";
import { API_USER } from "@/lib/services/user/user_service";
import { ErrorMessageProps, ErrorResponse } from "@/lib/types/common";
import { LanguageParams } from "@/lib/types/page";
import { Input, Button } from "@nextui-org/react";
import { useMemo, useState } from "react";
import AccountDeletion from "./AccountDeletion";

type Props = {
  current_password: string;
  new_password: string;
  confirmPassword: string;
};

const AccountPassword = ({ lang }: LanguageParams) => {
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<ErrorMessageProps | null>(null);
  const { user } = useAuth();

  const validationState = useMemo(() => {
    return passwords.new_password === passwords.confirmPassword ? true : false;
  }, [passwords]);

  const handleChange = (field: keyof Props, value: string) => {
    const temp = { ...passwords };

    temp[field] = value;
    setPasswords(temp);
    setError(null);
  };

  const submitChange = async () => {
    if (user) {
      setLoading(true);
      setError(null);

      try {
        const result = await API_USER.changePassword(passwords);

        if (result.success) onSuccess();
      } catch (errors) {
        handleServerError(errors as ErrorResponse, (err_msg) => {
          setError({ ...error, password: err_msg as string });
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const reset = () => {
    setPasswords({
      current_password: "",
      new_password: "",
      confirmPassword: "",
    });
  };

  const onSuccess = () => {
    setSuccess(true);
    reset();

    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  const checkEmpty = () => {
    return passwords.confirmPassword === "" ||
      passwords.new_password === "" ||
      passwords.current_password === ""
      ? true
      : false;
  };

  return (
    <div  className="py-3 max-sm:pt-0 flex flex-col gap-4">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1 max-sm:pb-4 px-1">
          <div className="font-medium">Change Password</div>
          <p className="text-sm text-gray-400">
            Update your password associated with your account.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Input
            aria-label={"Current Password"}
            placeholder={"Current Password"}
            size="md"
            radius="sm"
            type="password"
            value={passwords.current_password}
            onValueChange={(e) => handleChange("current_password", e)}
            className="max-w-2xl"
            classNames={{
              inputWrapper:
                "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100",
            }}
          />

          <Input
            aria-label={"New Password"}
            placeholder={"New Password"}
            size="md"
            radius="sm"
            type="password"
            value={passwords.new_password}
            color={validationState ? "default" : "danger"}
            errorMessage={!validationState && "Must be same password"}
            onValueChange={(e) => handleChange("new_password", e)}
            minLength={6}
            className="max-w-2xl"
            classNames={{
              inputWrapper:
                "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100",
            }}
          />

          <Input
            aria-label={"Confirm Password"}
            placeholder={"Confirm Password"}
            size="md"
            radius="sm"
            type="password"
            value={passwords.confirmPassword}
            color={validationState ? "default" : "danger"}
            errorMessage={!validationState && "Must be same password"}
            onValueChange={(e) => handleChange("confirmPassword", e)}
            minLength={6}
            className="max-w-2xl"
            classNames={{
              inputWrapper:
                "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100",
            }}
          />

          {error && (
            <div className="text-sm text-red-500 px-1">{error.password}</div>
          )}
        </div>
      </div>

      <div className="w-full pt-2">
        <Button
          color={success ? "success" : "primary"}
          isLoading={loading}
          isDisabled={success || !validationState || checkEmpty()}
          className="font-semibold"
          onClick={submitChange}
        >
          {success ? "Done" : "Change"}
        </Button>
      </div>

      <div className="mt-6">
        <AccountDeletion  />
      </div>
    </div>
  );
};

export default AccountPassword;
