/* eslint-disable @typescript-eslint/no-explicit-any */
import { build_path } from "@/utils/common";
import { handleErrors, _axios } from "../../api/_axios";
import { CART_ENDPOINTS } from "../../constants/endpoints";
import { Cart } from "../../types/cart";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace API_CART {
  export async function getCart(store: string) {
    try {
      const response = await _axios.get(
        build_path(CART_ENDPOINTS.GET, { store })
      );
      return response.data as Cart;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function resetCart(store: string) {
    try {
      const response = await _axios.post(CART_ENDPOINTS.RESET, { store });
      return response.data as Cart;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function addItem(data: any) {
    try {
      const response = await _axios.patch(CART_ENDPOINTS.ADD, data);
      return response.data as Cart;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }

  export async function removeItem(data: any) {
    try {
      const response = await _axios.patch(CART_ENDPOINTS.REMOVE, data);
      return response.data as Cart;
    } catch (error: unknown) {
      throw handleErrors(error);
    }
  }
}
