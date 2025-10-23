/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductTable } from "@/lib/types/store/product";
import { handleErrors, _axios } from "../../api/_axios";
import { PRODUCT_ENDPOINTS } from "../../constants/endpoints";
import { BulkUploadResponse, SuccessResponse } from "../../types/common";
import { build_path } from "@/utils/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_PRODUCT {


  export async function getAllProducts(query?: string) {
    try {
      let request = `${PRODUCT_ENDPOINTS.GET_ALL}`;

      if (query) {
        request = request + `${query}`;
      }

      const response = await _axios.get(request);
      return response.data as ProductTable;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getProductById(id: string) {
    try {
      const response = await _axios.get(
        build_path(PRODUCT_ENDPOINTS.GET_ID, { id })
      );
      return response.data as Product;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function createProduct(data: any) {
    try {
      const response = await _axios.post(PRODUCT_ENDPOINTS.CREATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateProduct(id: string, data: any) {
    try {
      const response = await _axios.patch(
        build_path(PRODUCT_ENDPOINTS.UPDATE, { id }),
        data
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteProduct(id: string) {
    try {
      const response = await _axios.delete(
        build_path(PRODUCT_ENDPOINTS.DELETE, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function bulkCreateProducts(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await _axios.post(
        PRODUCT_ENDPOINTS.BULK_CREATE, // You'll need to add this endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data as BulkUploadResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
