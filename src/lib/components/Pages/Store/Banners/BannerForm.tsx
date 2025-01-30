/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { handleServerError } from "@/lib/api/_axios";
import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import { BANNER_INITIAL } from "@/lib/constants/initials";
import { CARD_STYLE } from "@/lib/constants/style";
import { getUrl, URLs } from "@/lib/constants/urls";
import { API_BANNER } from "@/lib/services/store/banner_service";
import { ErrorResponse } from "@/lib/types/common";
import { BannerForm } from "@/lib/types/store/banner";
import { Button, Card, Spinner } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import NotFound from "../../NotFound";
import BannerInformation from "./BannerInformation";

const BannerFormPage = () => {
  const [banner, setBanner] = useState<BannerForm>(BANNER_INITIAL);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { width } = useWindowSize();
  const params = useParams();
  const router = useRouter();
  const buttonSize = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getBanner();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (field: keyof BannerForm, value: any) => {
    if (banner) {
      const updatedBanner = {
        ...banner,
        [field]: value,
      };

      setBanner(updatedBanner);
    }
  };

  const getBanner = async () => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    const bannerID = params.id as string;

    try {
      setLoading(true);
      const result = await API_BANNER.getBannerById(bannerID);

      setBanner(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveBanner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "banner-create";

    setIsProcessing(true);
    toast.loading("Creating banner...", { id });

    try {
      await API_BANNER.createBanner(banner);

      toast.success("Banner created", { id });
      router.push(getUrl(URLs.store.banners.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateBanner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "banner-updating";

    setIsProcessing(true);
    toast.loading("Updating banner...", { id });

    try {
      await API_BANNER.updateBanner(params.id as string, banner);

      toast.success("Banner updated", { id });
      router.push(getUrl(URLs.store.banners.index));
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

  if (!banner) {
    return (
      <NotFound url={getUrl(URLs.store.banners.index)} title="Banners" />
    );
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center gap-4"
      onSubmit={(e) => (params.id ? updateBanner(e) : saveBanner(e))}
    >
      <HeaderContainer
        title={params.id ? "Update Banner" : "Create Banner"}
      >
        <HeaderContent />
      </HeaderContainer>

      <Card shadow="none" className={CARD_STYLE}>
        <BannerInformation banner={banner} handleChange={handleChange} />
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

export default BannerFormPage;
