/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { handleServerError } from "@/lib/api/_axios";
import { getUrl, URLs } from "@/lib/constants/urls";
import { ErrorResponse } from "@/lib/types/common";
import { Card, Spinner, Button } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import CategoryInformation from "./CategoryInformation";
import { CARD_STYLE } from "@/lib/constants/style";
import { API_CATEGORY } from "@/lib/services/store/category_service";
import NotFound from "../../NotFound";
import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import { toast } from "sonner";
import { CategoryForm } from "@/lib/types/store/category";
import { CATEGORY_INITIAL } from "@/lib/constants/initials";

const FormCategory = () => {
  const [category, setCategory] = useState<CategoryForm>(CATEGORY_INITIAL);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { width } = useWindowSize();
  const params = useParams();
  const router = useRouter();
  const buttonSize = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (field: keyof CategoryForm, value: any) => {
    if (category) {
      const updatedCategory = {
        ...category,
        [field]: value,
      };

      setCategory(updatedCategory);
    }
  };

  const getCategory = async () => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    const categoryID = params.id as string;

    try {
      setLoading(true);
      const result = await API_CATEGORY.getCategoryById(categoryID);

      setCategory(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "category-create";

    setIsProcessing(true);
    toast.loading("Creating category...", { id });

    try {
      await API_CATEGORY.createCategory(category);

      toast.success("Category created", { id });
      router.push(getUrl(URLs.store.category.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "category-updating";

    setIsProcessing(true);
    toast.loading("Updating category...", { id });

    try {
      await API_CATEGORY.updateCategory(params.id as string, category);

      toast.success("Category updated", { id });
      router.push(getUrl(URLs.store.category.index));
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

  if (!category) {
    return (
      <NotFound url={getUrl(URLs.store.category.index)} title="Categories" />
    );
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center gap-4"
      onSubmit={(e) => (params.id ? updateCategory(e) : saveCategory(e))}
    >
      <HeaderContainer
        title={params.id ? "Update Category" : "Create Category"}
      >
        <HeaderContent />
      </HeaderContainer>

      <Card shadow="none" className={CARD_STYLE}>
        <CategoryInformation category={category} handleChange={handleChange} />
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

export default FormCategory;
