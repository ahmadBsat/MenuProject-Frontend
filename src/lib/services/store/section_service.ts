/* eslint-disable @typescript-eslint/no-explicit-any */
import { build_path } from "@/utils/common";
import { _axios, handleErrors } from "../../api/_axios";
import { SECTION_ENDPOINTS } from "../../constants/endpoints";
import { SuccessResponse } from "../../types/common";
import { Section, SectionTable } from "@/lib/types/store/section";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_SECTION {
  export async function getAllSections(query?: string) {
    try {
      let request = `${SECTION_ENDPOINTS.GET_ALL}`;

      if (query) {
        request = request + `${query}`;
      }

      const response = await _axios.get(request);
      return response.data as SectionTable;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function getSectionById(id: string) {
    try {
      const response = await _axios.get(
        build_path(SECTION_ENDPOINTS.GET_ID, { id })
      );
      return response.data as Section;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function createSection(data: any) {
    try {
      const response = await _axios.post(SECTION_ENDPOINTS.CREATE, data);
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function updateSection(id: string, data: any) {
    try {
      const response = await _axios.patch(
        build_path(SECTION_ENDPOINTS.UPDATE, { id }),
        data
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteSection(id: string) {
    try {
      const response = await _axios.delete(
        build_path(SECTION_ENDPOINTS.DELETE, { id })
      );
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
