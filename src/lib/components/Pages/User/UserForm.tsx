"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUrl, URLs } from "@/lib/constants/urls";
import { Button, Spinner } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse, NestedKeyOf } from "@/lib/types/common";
import NotFound from "../NotFound";
import HeaderContainer from "../../Containers/HeaderContainer";
import UserInformation from "./UserInformation";
import { set } from "lodash";
import { toast } from "sonner";
import { USER_INITIAL } from "@/lib/constants/initials";
import { UserForm } from "@/lib/types/user/user";
import { API_USER } from "@/lib/services/user/user_service";

const UsersForm = () => {
  const [user, setUser] = useState<UserForm>(USER_INITIAL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);

  const params = useParams();
  const router = useRouter();
  const user_id = params.id as string;

  const { width } = useWindowSize();
  const size = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  const getUser = async () => {
    if (!user_id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const result = await API_USER.getUserById(user_id);

      setUser({ ...result, password: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "user-create";

    setProcessing(true);
    toast.loading("Creating user...", { id });

    try {
      const res = await API_USER.createUser(user);

      toast.success(res.message, { id });

      router.push(getUrl(URLs.admin.users.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setProcessing(false);
    }
  };

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "user-update";

    setProcessing(true);
    toast.loading("Updating user...", { id });

    try {
      const res = await API_USER.updateUserById(user_id, user);

      toast.success(res.message, { id });
      router.push(getUrl(URLs.admin.users.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (field: NestedKeyOf<UserForm>, value: any) => {
    const temp = { ...user };

    set(temp, field, value);

    setUser(temp);
  };

  const HeaderContent = () => {
    return (
      <div className="w-full flex items-center gap-2 justify-end">
        <Button
          size={size}
          color="danger"
          variant="flat"
          className="hover:scale-90"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!user) {
    return <NotFound url={getUrl(URLs.admin.users.index)} title="Users" />;
  }

  return (
    <form
      onSubmit={(e) => (user_id ? updateUser(e) : saveUser(e))}
      className="w-full h-full flex flex-col justify-center gap-6"
    >
      <HeaderContainer
        title={
          user_id
            ? `Update User ${user.firstname} ${user.lastname}`
            : `Create New User`
        }
      >
        <HeaderContent />
      </HeaderContainer>

      <UserInformation data={user} handleChange={handleChange} />

      <div className="w-full flex justify-end mt-6 px-4">
        <Button
          type="submit"
          isLoading={processing}
          isDisabled={processing}
          color="primary"
          className="text-white"
        >
          {user_id ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default UsersForm;
