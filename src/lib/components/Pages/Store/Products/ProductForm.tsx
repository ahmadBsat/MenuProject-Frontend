/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { handleServerError } from "@/lib/api/_axios";
import { getUrl, URLs } from "@/lib/constants/urls";
import { ErrorResponse } from "@/lib/types/common";
import { Card, Spinner, Button, Tabs, Tab } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import ProductInformation from "./ProductInformation";
import ProductPricing from "./ProductPricing";
import ProductUpload from "./ProductUpload";
import { CARD_STYLE } from "@/lib/constants/style";
import ProductRelation from "./ProductRelation";
import { useQueryState } from "nuqs";
import { API_PRODUCT } from "@/lib/services/store/product_service";
import NotFound from "../../NotFound";
import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import { toast } from "sonner";
import { ProductForm } from "@/lib/types/store/product";
import { PRODUCT_INITIAL } from "@/lib/constants/initials";

const FormProduct = () => {
  const [product, setProduct] = useState<ProductForm>(PRODUCT_INITIAL);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tab, setTab] = useQueryState("tab", { history: "replace" });

  const { width } = useWindowSize();
  const params = useParams();
  const router = useRouter();
  const buttonSize = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (field: keyof ProductForm, value: any) => {
    if (product) {
      const updatedProduct = {
        ...product,
        [field]: value,
      };

      setProduct(updatedProduct);
    }
  };

  const getProduct = async () => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    const productID = params.id as string;

    try {
      setLoading(true);
      const result = await API_PRODUCT.getProductById(productID);

      if (result.category === null) {
        result.category = [];
      }

      setProduct(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "product-create";

    setIsProcessing(true);
    toast.loading("Creating product...", { id });

    try {
      await API_PRODUCT.createProduct(product);

      toast.success("Product created", { id });
      router.push(getUrl(URLs.store.products.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "product-updating";

    setIsProcessing(true);
    toast.loading("Updating product...", { id });

    try {
      await API_PRODUCT.updateProduct(params.id as string, product);

      toast.success("Product updated", { id });
      router.push(getUrl(URLs.store.products.index));
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

  if (!product) {
    return (
      <NotFound url={getUrl(URLs.store.products.index)} title="Products" />
    );
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center gap-4"
      onSubmit={(e) => (params.id ? updateProduct(e) : saveProduct(e))}
    >
      <HeaderContainer title={params.id ? "Update Product" : "Create Product"}>
        <HeaderContent />
      </HeaderContainer>

      <Tabs
        aria-label="Product Tabs"
        size="lg"
        variant="underlined"
        selectedKey={tab}
        onSelectionChange={(val) => setTab(val.toString())}
        classNames={{ tab: "text-lg sm:text-2xl" }}
      >
        <Tab key={"information"} title={"Information"} className="pl-0">
          <Card shadow="none" className={CARD_STYLE}>
            <ProductInformation product={product} handleChange={handleChange} />
          </Card>
        </Tab>

        <Tab key={"images"} title={"Images"} className="pl-0">
          <Card shadow="none" className={CARD_STYLE}>
            <ProductUpload
              product={product}
              type="product"
              handleChange={handleChange}
            />
          </Card>
        </Tab>

        <Tab key={"pricing"} title={"Pricing"} className="pl-0">
          <Card shadow="none" className={CARD_STYLE}>
            <ProductPricing product={product} handleChange={handleChange} />
          </Card>
        </Tab>

        <Tab key={"relation"} title={"Relation"} className="pl-0">
          <Card shadow="none" className={CARD_STYLE}>
            <ProductRelation product={product} handleChange={handleChange} />
          </Card>
        </Tab>
      </Tabs>

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

export default FormProduct;
