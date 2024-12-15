/* eslint-disable @typescript-eslint/no-explicit-any */
import { Currency, CurrencyTable } from "@/lib/types/store/currency";
import { handleErrors, _axios } from "../../api/_axios";
import { CURRENCY_ENDPOINTS } from "../../constants/endpoints";
import { SuccessResponse } from "../../types/common";
import { build_path } from "@/utils/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_CURRENCY {
  export async function getAllCurrencies(query?: string) {
    try {
      let request = `${CURRENCY_ENDPOINTS.GET_ALL}`;

      if (query) {
        request = request + `${query}`;
      }

      const response = await _axios.get(request);
      return response.data as CurrencyTable;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getCurrencyById(id: string) {
    try {
      const response = await _axios.get(
        build_path(CURRENCY_ENDPOINTS.GET_ID, { id })
      );
      return response.data as Currency;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function createCurrency(data: any) {
    try {
      const response = await _axios.post(CURRENCY_ENDPOINTS.CREATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateCurrency(id: string, data: any) {
    try {
      const response = await _axios.patch(
        build_path(CURRENCY_ENDPOINTS.UPDATE, { id }),
        data
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteCurrency(id: string) {
    try {
      const response = await _axios.delete(
        build_path(CURRENCY_ENDPOINTS.DELETE, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
