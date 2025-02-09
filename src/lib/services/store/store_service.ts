/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store, StorePopulated, StoreTable } from "@/lib/types/store/store";
import { handleErrors, _axios } from "../../api/_axios";
import { STORE_ENDPOINTS } from "../../constants/endpoints";
import { SuccessResponse } from "../../types/common";
import { build_path } from "@/utils/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_STORE {
  export async function getStore() {
    try {
      const response = await _axios.get(STORE_ENDPOINTS.GET);
      return response.data as Store;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getAllStores(query?: string) {
    try {
      let request = `${STORE_ENDPOINTS.GET_ALL}`;

      if (query) {
        request = request + `${query}`;
      }

      const response = await _axios.get(request);
      return response.data as StoreTable;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getStoreById(id: string) {
    try {
      const response = await _axios.get(
        build_path(STORE_ENDPOINTS.GET_ID, { id })
      );
      return response.data as Store;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getStoreByDomain(domain?: string, query?: string) {
    try {
      let endpoint = build_path(STORE_ENDPOINTS.GET_DOMAIN);

      if (query) {
        endpoint += query;
      }

      if (domain) {
        endpoint += query ? `&domain=${domain}` : `?domain=${domain}`;
      }

      const response = await _axios.get(endpoint);

      return response.data as StorePopulated;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function createStore(data: any) {
    try {
      const response = await _axios.post(STORE_ENDPOINTS.CREATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateStore(data: any) {
    try {
      const response = await _axios.patch(STORE_ENDPOINTS.UPDATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateStoreById(id: string, data: any) {
    try {
      const response = await _axios.patch(
        build_path(STORE_ENDPOINTS.ADMIN_UPDATE, { id }),
        data
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteStore(id: string) {
    try {
      const response = await _axios.delete(
        build_path(STORE_ENDPOINTS.DELETE, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function renewPlan(id: string) {
    try {
      const response = await _axios.post(
        build_path(STORE_ENDPOINTS.RENEW, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
