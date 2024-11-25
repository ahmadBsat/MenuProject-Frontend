/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleErrors, _axios } from "../api/_axios";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_ADMIN {
  export async function getDashboard() {
    try {
      const response = await _axios.get("/api/v1/admin/dashboard");
      return response.data as any;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
