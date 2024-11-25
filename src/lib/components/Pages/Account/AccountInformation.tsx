"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { API_USER } from "@/lib/services/user/user_service";
import { Input, Button, Chip, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UserAuthenticated } from "@/lib/types/user/user";
import { LanguageParams } from "@/lib/types/page";
import AccountProfile from "./AccountProfile";

const AccountInformation = ({ lang }: LanguageParams) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState<UserAuthenticated | null>(null);

  const { user: current_user, setUser } = useAuth();

  useEffect(() => {
    if (current_user?.user) {
      setUserData(current_user?.user);
    }
  }, [current_user]);

  const handleChange = (
    field: keyof UserAuthenticated,
    value: string | number | boolean
  ) => {
    if (userData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const temp: any = { ...userData };
      temp[field] = value;

      setUserData(temp);
    }
  };

  const handleSubmit = async () => {
    if (current_user) {
      setLoading(true);
      try {
        const updatedUser = await API_USER.updateUser(userData);
        setUser({ token: current_user?.token, user: updatedUser });
        onSuccess();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onSuccess = () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 1200);
  };

  const EmailContent = () => {
    if (!userData) return;

    return userData?.email_verified ? (
      <Chip
        color={"success"}
        size="sm"
        radius="md"
        variant="bordered"
        className="h-8 sm:flex hidden"
        classNames={{ content: "font-bold text-sm", base: "p-0 px-2" }}
      >
        Verified
      </Chip>
    ) : (
      <Button
        color={"danger"}
        size="sm"
        radius="md"
        variant="bordered"
        className="h-8 sm:flex hidden py-0 px-2 font-bold text-sm"
      >
        Unverified
      </Button>
    );
  };

  return (
    <div
      
      className="flex flex-col w-full gap-6 sm:px-3 py-3 max-sm:pt-0"
    >
      <AccountProfile />

      <Divider />

      <div className="flex flex-col">
        <p className="text-base font-medium text-default-700 px-1">
          First Name
        </p>
        <p className="mb-2 text-sm font-normal text-default-400 px-1">
          Name to be used for emails.
        </p>
        <Input
          aria-label={"First Name"}
          placeholder={"e.g John"}
          size="md"
          radius="md"
          required
          isRequired
          value={userData?.firstname}
          onValueChange={(fname) => handleChange("firstname", fname)}
          className="max-w-2xl"
          classNames={{
            inputWrapper:
              "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100",
          }}
        />
      </div>

      <div className="flex flex-col">
        <p className="text-base font-medium text-default-700 px-1">Last Name</p>
        <p className="mb-2 text-sm font-normal text-default-400 px-1">
          Optional field for last name.
        </p>
        <Input
          aria-label={"Last Name"}
          placeholder={"e.g Doe"}
          size="md"
          radius="md"
          value={userData?.lastname}
          onValueChange={(lname) => handleChange("lastname", lname)}
          className="max-w-2xl"
          classNames={{
            inputWrapper:
              "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100",
          }}
        />
      </div>

      <div className="flex flex-col">
        <p className="text-base font-medium text-default-700 px-1">
          Email Address
        </p>
        <p className="mb-2 text-sm font-normal text-default-400 px-1">
          The email address associated with your account.
        </p>
        <Input
          aria-label={"Email"}
          type="email"
          placeholder="e.g example@gmail.com"
          size="md"
          radius="md"
          required
          isRequired
          endContent={<EmailContent />}
          value={userData?.email}
          onValueChange={(email) => handleChange("email", email)}
          className="max-w-2xl"
          classNames={{
            inputWrapper:
              "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100",
          }}
        />
      </div>

      <div className="pt-2">
        <Button
          color={success ? "success" : "primary"}
          className="hover:bg-primary font-semibold hover:text-white"
          isLoading={loading}
          isDisabled={success}
          onClick={handleSubmit}
        >
          {success ? "Done" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default AccountInformation;
