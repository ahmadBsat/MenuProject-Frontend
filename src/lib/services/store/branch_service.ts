/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreBranch, StoreBranchTable } from "@/lib/types/store/store";
import { handleErrors, _axios } from "../../api/_axios";
import { BRANCH_ENDPOINTS } from "../../constants/endpoints";
import { SuccessResponse } from "../../types/common";
import { build_path } from "@/utils/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_BRANCH {
  export async function getAllBranches(query?: string) {
    try {
      let request = `${BRANCH_ENDPOINTS.GET_ALL}`;

      if (query) {
        request = request + `${query}`;
      }

      const response = await _axios.get(request);
      return response.data as StoreBranchTable;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getBranchById(id: string) {
    try {
      const response = await _axios.get(
        build_path(BRANCH_ENDPOINTS.GET_ID, { id })
      );
      return response.data as StoreBranch;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function createBranch(data: any) {
    try {
      const response = await _axios.post(BRANCH_ENDPOINTS.CREATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateBranch(id: string, data: any) {
    try {
      const response = await _axios.patch(
        build_path(BRANCH_ENDPOINTS.UPDATE, { id }),
        data
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteBranch(id: string) {
    try {
      const response = await _axios.delete(
        build_path(BRANCH_ENDPOINTS.DELETE, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
