/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductItem, ProductItemTable } from "@/lib/types/store/product";
import { handleErrors, _axios } from "../../api/_axios";
import { PRODUCT_ITEMS_ENDPOINTS } from "../../constants/endpoints";
import { SuccessResponse } from "../../types/common";
import { build_path } from "@/utils/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_PRODUCT_ITEMS {
  export async function getAllProductItems(query?: string) {
    try {
      let request = `${PRODUCT_ITEMS_ENDPOINTS.GET_ALL}`;

      if (query) {
        request = request + `${query}`;
      }

      const response = await _axios.get(request);
      return response.data as ProductItemTable;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getProductItemById(id: string) {
    try {
      const response = await _axios.get(
        build_path(PRODUCT_ITEMS_ENDPOINTS.GET_ID, { id })
      );
      return response.data as ProductItem;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function createProductItem(data: any) {
    try {
      const response = await _axios.post(PRODUCT_ITEMS_ENDPOINTS.CREATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateProductItem(id: string, data: any) {
    try {
      const response = await _axios.patch(
        build_path(PRODUCT_ITEMS_ENDPOINTS.UPDATE, { id }),
        data
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteProductItem(id: string) {
    try {
      const response = await _axios.delete(
        build_path(PRODUCT_ITEMS_ENDPOINTS.DELETE, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
