/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, CategoryTable } from "@/lib/types/store/category";
import { handleErrors, _axios } from "../../api/_axios";
import { CATEGORY_ENDPOINTS } from "../../constants/endpoints";
import { SuccessResponse } from "../../types/common";
import { build_path } from "@/utils/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_CATEGORY {
  export async function getAllCategories(query?: string) {
    try {
      let request = `${CATEGORY_ENDPOINTS.GET_ALL}`;

      if (query) {
        request = request + `${query}`;
      }

      const response = await _axios.get(request);
      return response.data as CategoryTable;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getCategoryById(id: string) {
    try {
      const response = await _axios.get(
        build_path(CATEGORY_ENDPOINTS.GET_ID, { id })
      );
      return response.data as Category;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function createCategory(data: any) {
    try {
      const response = await _axios.post(CATEGORY_ENDPOINTS.CREATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateCategory(id: string, data: any) {
    try {
      const response = await _axios.patch(
        build_path(CATEGORY_ENDPOINTS.UPDATE, { id }),
        data
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteCategory(id: string) {
    try {
      const response = await _axios.delete(
        build_path(CATEGORY_ENDPOINTS.DELETE, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
