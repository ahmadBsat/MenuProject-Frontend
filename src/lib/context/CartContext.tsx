/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { _axios } from "../api/_axios";
import { API_CART } from "../services/user/cart_service";
import { usePreference } from "@/store/account";
import { Cart } from "../types/cart";

type CartContextType = {
  cart: Cart;
  cartOpen: boolean;
  subLoading: boolean;
  processing: boolean;
  toggleCart: () => void;
  getUserCart: () => Promise<void>;
  setSubLoading: (bool: boolean) => void;
  setCart: (cart: any) => void;
  setCartOpen: (data: boolean) => void;
  addToCart: (new_item: {
    product_id: string;
    product_additions: any[];
    quantity: number;
    store: string;
  }) => void;
  removeFromCart: (product_id: string, options?: any[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<any>({
    products: [],
    count: 0,
    discount: 0,
    total_price: 0,
    fees: 0,
    createdAt: "",
    updatedAt: "",
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [processing, setProcessing] = useState(true);
  const { store, currency } = usePreference();

  const getUserCart = useCallback(async () => {
    setProcessing(true);

    try {
      const cart = await API_CART.getCart(store);
      setCart(cart);
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  }, [store]);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleOpenClose = () => {
    setCartOpen(true);
    setSubLoading(false);
  };

  const addToCart = async (item: {
    product_id: string;
    product_additions: any[];
    quantity: number;
    store: string;
  }) => {
    setSubLoading(true);

    try {
      const updatedCart = await API_CART.addItem({ product: { ...item } });
      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    } finally {
      handleOpenClose();
    }
  };

  const removeFromCart = async (product_id: string, options?: string[]) => {
    setSubLoading(true);

    const temp: any = { product_id: product_id };

    if (options) {
      temp.options = options;
    }

    try {
      const updatedCart = await API_CART.removeItem(temp);
      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    } finally {
      handleOpenClose();
    }
  };

  useEffect(() => {
    getUserCart();
  }, [getUserCart, store, currency]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        subLoading,
        processing,
        setSubLoading,
        setCart,
        setCartOpen,
        getUserCart,
        toggleCart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within an CartProvider");
  }

  return context;
};