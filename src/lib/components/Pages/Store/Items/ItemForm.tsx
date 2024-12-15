/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { handleServerError } from "@/lib/api/_axios";
import { getUrl, URLs } from "@/lib/constants/urls";
import { ErrorResponse, NestedKeyOf } from "@/lib/types/common";
import { Card, Spinner, Button } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import ItemInformation from "./ItemInformation";
import { CARD_STYLE } from "@/lib/constants/style";
import NotFound from "../../NotFound";
import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import { toast } from "sonner";
import { ITEM_INITIAL } from "@/lib/constants/initials";
import { ProductItemForm } from "@/lib/types/store/product";
import { API_PRODUCT_ITEMS } from "@/lib/services/store/product_items_service";
import { set } from "lodash";

const ProductItemFormPage = () => {
  const [item, setProductItem] = useState<ProductItemForm>(ITEM_INITIAL);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { width } = useWindowSize();
  const params = useParams();
  const router = useRouter();
  const buttonSize = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getProductItem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (field: NestedKeyOf<ProductItemForm>, value: any) => {
    if (!item) return;
    const temp = { ...item };

    set(temp, field, value);

    setProductItem(temp);
  };

  const getProductItem = async () => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    const itemID = params.id as string;

    try {
      setLoading(true);
      const result = await API_PRODUCT_ITEMS.getProductItemById(itemID);

      setProductItem(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveProductItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "item-create";

    setIsProcessing(true);
    toast.loading("Creating item...", { id });

    try {
      await API_PRODUCT_ITEMS.createProductItem(item);

      toast.success("Product Item created", { id });
      router.push(getUrl(URLs.store.product_items.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateProductItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "item-updating";

    setIsProcessing(true);
    toast.loading("Updating item...", { id });

    try {
      await API_PRODUCT_ITEMS.updateProductItem(params.id as string, item);

      toast.success("Product Item updated", { id });
      router.push(getUrl(URLs.store.product_items.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const HeaderContent = () => {
    return (
      <div className="w-full flex items-center gap-2 justify-end">
        <Button
          size={buttonSize}
          color="primary"
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

  if (!item) {
    return (
      <NotFound
        url={getUrl(URLs.store.product_items.index)}
        title="ProductItems"
      />
    );
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center gap-4"
      onSubmit={(e) => (params.id ? updateProductItem(e) : saveProductItem(e))}
    >
      <HeaderContainer
        title={params.id ? "Update ProductItem" : "Create ProductItem"}
      >
        <HeaderContent />
      </HeaderContainer>

      <Card shadow="none" className={CARD_STYLE}>
        <ItemInformation item={item} handleChange={handleChange} />
      </Card>

      <div className="w-full flex justify-end mt-2 px-4">
        <Button
          type="submit"
          isLoading={isProcessing}
          isDisabled={isProcessing}
          color="primary"
          className="text-white"
        >
          {params.id ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default ProductItemFormPage;
