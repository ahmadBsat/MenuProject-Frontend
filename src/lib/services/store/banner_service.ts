/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banner, BannerTable } from "@/lib/types/store/banner";
import { build_path } from "@/utils/common";
import { _axios, handleErrors } from "../../api/_axios";
import { BANNER_ENDPOINTS } from "../../constants/endpoints";
import { SuccessResponse } from "../../types/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_BANNER {
  export async function getAllBanners(query?: string) {
    try {
      let request = `${BANNER_ENDPOINTS.GET_ALL}`;

      if (query) {
        request = request + `${query}`;
      }

      const response = await _axios.get(request);
      return response.data as BannerTable;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getBannerById(id: string) {
    try {
      const response = await _axios.get(
        build_path(BANNER_ENDPOINTS.GET_ID, { id })
      );
      return response.data as Banner;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function createBanner(data: any) {
    try {
      const response = await _axios.post(BANNER_ENDPOINTS.CREATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateBanner(id: string, data: any) {
    try {
      const response = await _axios.patch(
        build_path(BANNER_ENDPOINTS.UPDATE, { id }),
        data
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteBanner(id: string) {
    try {
      const response = await _axios.delete(
        build_path(BANNER_ENDPOINTS.DELETE, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
