/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleErrors, _axios } from "../api/_axios";
import { UPLOAD_ENDPOINTS } from "../constants/endpoints";
import { FilesProps, SuccessResponse } from "../types/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_UPLOAD {
  export async function uploadFiles(data: FormData) {
    try {
      const response = await _axios.post(UPLOAD_ENDPOINTS.CREATE, data);
      return response.data as FilesProps;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function deleteImage(file: string) {
    try {
      const response = await _axios.post(UPLOAD_ENDPOINTS.DELETE, { file });
      return response.data as SuccessResponse;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
