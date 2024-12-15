/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { handleServerError } from "@/lib/api/_axios";
import { getUrl, URLs } from "@/lib/constants/urls";
import { ErrorResponse } from "@/lib/types/common";
import { Card, Spinner, Button } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import CurrencyInformation from "./CurrencyInformation";
import { CARD_STYLE } from "@/lib/constants/style";
import NotFound from "../../NotFound";
import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import { toast } from "sonner";
import { CURRENCY_INITIAL } from "@/lib/constants/initials";
import { API_CURRENCY } from "@/lib/services/store/currency_service";
import { CurrencyForm } from "@/lib/types/store/currency";

const CurrencyFormPage = () => {
  const [currency, setCurrency] = useState<CurrencyForm>(CURRENCY_INITIAL);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { width } = useWindowSize();
  const params = useParams();
  const router = useRouter();
  const buttonSize = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getCurrency();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (field: keyof CurrencyForm, value: any) => {
    if (currency) {
      const updatedCurrency = {
        ...currency,
        [field]: value,
      };

      setCurrency(updatedCurrency);
    }
  };

  const getCurrency = async () => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    const currencyID = params.id as string;

    try {
      setLoading(true);
      const result = await API_CURRENCY.getCurrencyById(currencyID);

      setCurrency(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveCurrency = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "currency-create";

    setIsProcessing(true);
    toast.loading("Creating currency...", { id });

    try {
      await API_CURRENCY.createCurrency(currency);

      toast.success("Currency created", { id });
      router.push(getUrl(URLs.store.currencies.index));
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(`${msg}`, { id });
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateCurrency = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = "currency-updating";

    setIsProcessing(true);
    toast.loading("Updating currency...", { id });

    try {
      await API_CURRENCY.updateCurrency(params.id as string, currency);

      toast.success("Currency updated", { id });
      router.push(getUrl(URLs.store.currencies.index));
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

  if (!currency) {
    return (
      <NotFound url={getUrl(URLs.store.currencies.index)} title="Currencys" />
    );
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center gap-4"
      onSubmit={(e) => (params.id ? updateCurrency(e) : saveCurrency(e))}
    >
      <HeaderContainer
        title={params.id ? "Update Currency" : "Create Currency"}
      >
        <HeaderContent />
      </HeaderContainer>

      <Card shadow="none" className={CARD_STYLE}>
        <CurrencyInformation currency={currency} handleChange={handleChange} />
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

export default CurrencyFormPage;
