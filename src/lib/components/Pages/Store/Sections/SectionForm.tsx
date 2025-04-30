/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { handleServerError } from "@/lib/api/_axios";
import { getUrl, URLs } from "@/lib/constants/urls";
import { ErrorResponse } from "@/lib/types/common";
import { Card, Spinner, Button } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { CARD_STYLE } from "@/lib/constants/style";
import NotFound from "../../NotFound";
import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import { toast } from "sonner";
import { SECTION_INITIAL } from "@/lib/constants/initials";
import { SectionForm } from "@/lib/types/store/section";
import { API_SECTION } from "@/lib/services/store/section_service";
import SectionInformation from "./SectionInformation";

const FormSection = () => {
  const [section, setSection] = useState<SectionForm>(SECTION_INITIAL);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { width } = useWindowSize();
  const params = useParams();
  const router = useRouter();
  const buttonSize = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getSection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (field: keyof SectionForm, value: any) => {
    if (section) {
      const updatedSection = {
        ...section,
        [field]: value,
      };

      setSection(updatedSection);
    }
  };

  const getSection = async () => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    const sectionID = params.id as string;

    try {
      setLoading(true);
      const result = await API_SECTION.getSectionById(sectionID);

      setSection(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "section-create";

    setIsProcessing(true);
    toast.loading("Creating section...", { id });

    try {
      await API_SECTION.createSection(section);

      toast.success("Section created", { id });
      router.push(getUrl(URLs.store.sections.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateSection = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "section-updating";

    setIsProcessing(true);
    toast.loading("Updating section...", { id });

    try {
      await API_SECTION.updateSection(params.id as string, section);

      toast.success("section updated", { id });
      router.push(getUrl(URLs.store.sections.index));
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

  if (!section) {
    return (
      <NotFound url={getUrl(URLs.store.sections.index)} title="Sections" />
    );
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center gap-4"
      onSubmit={(e) => (params.id ? updateSection(e) : saveSection(e))}
    >
      <HeaderContainer title={params.id ? "Update Section" : "Create Section"}>
        <HeaderContent />
      </HeaderContainer>

      <Card shadow="none" className={CARD_STYLE}>
        <SectionInformation section={section} handleChange={handleChange} />
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

export default FormSection;
