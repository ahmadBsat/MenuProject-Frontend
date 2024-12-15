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
import StoreInformation from "./StoreInformation";
import { set } from "lodash";
import { toast } from "sonner";
import { STORE_INITIAL } from "@/lib/constants/initials";
import { API_STORE } from "@/lib/services/store/store_service";
import { StoreForm } from "@/lib/types/store/store";
import StoreLogo from "./StoreLogo";

const StoresForm = () => {
  const [store, setStore] = useState<StoreForm>(STORE_INITIAL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editable, setEditable] = useState(true);
  const [processing, setProcessing] = useState(false);

  const params = useParams();
  const router = useRouter();
  const store_id = params.id as string;

  const { width } = useWindowSize();
  const size = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store_id]);

  const getStore = async () => {
    if (!store_id) {
      setLoading(false);
      setEditable(true);
      return;
    }

    try {
      setLoading(true);

      const result = await API_STORE.getStoreById(store_id);

      setStore(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveStore = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "store-create";

    setProcessing(true);
    toast.loading("Creating store...", { id });

    try {
      const res = await API_STORE.createStore(store);

      toast.success(res.message, { id });

      router.push(getUrl(URLs.admin.stores.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setProcessing(false);
    }
  };

  const updateStore = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "store-update";

    setProcessing(true);
    toast.loading("Updating store...", { id });

    try {
      const res = await API_STORE.updateStoreById(store_id, store);

      toast.success(res.message, { id });
      router.push(getUrl(URLs.admin.stores.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (field: NestedKeyOf<StoreForm>, value: any) => {
    const temp = { ...store };

    set(temp, field, value);

    setStore(temp);
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

  if (!store) {
    return <NotFound url={getUrl(URLs.admin.stores.index)} title="Stores" />;
  }

  return (
    <form
      onSubmit={(e) => (store_id ? updateStore(e) : saveStore(e))}
      className="w-full h-full flex flex-col justify-center gap-6"
    >
      <HeaderContainer
        title={store_id ? `Update Store ${store.name}` : `Create New Store`}
      >
        <HeaderContent />
      </HeaderContainer>

      <StoreLogo data={store} path={"store"} handleChange={handleChange} />

      <StoreInformation
        data={store}
        editable={editable}
        handleChange={handleChange}
      />

      <div className="w-full flex justify-end mt-6 px-4">
        <Button
          type="submit"
          isLoading={processing}
          isDisabled={processing}
          color="primary"
          className="text-white"
        >
          {store_id ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default StoresForm;
