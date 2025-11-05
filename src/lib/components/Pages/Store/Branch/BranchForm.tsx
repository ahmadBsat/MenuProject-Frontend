/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { handleServerError } from "@/lib/api/_axios";
import { getUrl, URLs } from "@/lib/constants/urls";
import { ErrorResponse } from "@/lib/types/common";
import { Card, Spinner, Button } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import BranchInformation from "./BranchInformation";
import { CARD_STYLE } from "@/lib/constants/style";
import NotFound from "../../NotFound";
import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import { toast } from "sonner";
import { BRANCH_INITIAL } from "@/lib/constants/initials";
import { API_BRANCH } from "@/lib/services/store/branch_service";
import { Store, StoreBranchForm } from "@/lib/types/store/store";
import { API_STORE } from "@/lib/services/store/store_service";

const BranchFormPage = () => {
  const [branch, setBranch] = useState<StoreBranchForm>(BRANCH_INITIAL);
  const [storeDetails, setStoreDetails] = useState<Store | null>(null);

  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { width } = useWindowSize();
  const params = useParams();
  const router = useRouter();
  const buttonSize = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await API_STORE.getStore();
        setStoreDetails(response);
      } catch (error) {
        console.error("Failed to fetch store details:", error);
      }
    };

    fetchStoreDetails();
  }, []);

  useEffect(() => {
    getBranch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (field: keyof StoreBranchForm, value: any) => {
    if (branch) {
      const updatedBranch = {
        ...branch,
        [field]: value,
      };

      setBranch(updatedBranch);
    }
  };

  const getBranch = async () => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    const branchID = params.id as string;

    try {
      setLoading(true);
      const result = await API_BRANCH.getBranchById(branchID);

      setBranch(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveBranch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "branch-create";

    setIsProcessing(true);
    toast.loading("Creating branch...", { id });

    try {
      await API_BRANCH.createBranch(branch);

      toast.success("Branch created", { id });
      router.push(getUrl(URLs.store.branch.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateBranch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "branch-updating";

    setIsProcessing(true);
    toast.loading("Updating branch...", { id });

    try {
      await API_BRANCH.updateBranch(params.id as string, branch);

      toast.success("Branch updated", { id });
      router.push(getUrl(URLs.store.branch.index));
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

  if (!branch) {
    return <NotFound url={getUrl(URLs.store.branch.index)} title="Branchs" />;
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center gap-4"
      onSubmit={(e) => (params.id ? updateBranch(e) : saveBranch(e))}
    >
      <HeaderContainer title={params.id ? "Update Branch" : "Create Branch"}>
        <HeaderContent />
      </HeaderContainer>

      <Card shadow="none" className={CARD_STYLE}>
        <BranchInformation
          branch={branch}
          handleChange={handleChange}
          storeDetails={storeDetails}
        />
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

export default BranchFormPage;
