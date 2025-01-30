/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  StoreBanner,
  StoreBranch,
  StorePalette,
} from "@/lib/types/store/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferenceState = {
  currency: { name: string; rate_change: number };
  branch: Partial<StoreBranch>;
  palette: StorePalette;
  banners: StoreBanner;
  setBanners: (val: StoreBanner) => void;
  setPalette: (val: StorePalette) => void;
  setBranch: (val: StoreBranch) => void;
  setCurrency: (val: { name: string; rate_change: number }) => void;
  store: string;
  setStore: (val: string) => void;
  has_hydrated: boolean;
  set_has_hydrated: (val: boolean) => void;
};

export const usePreference = create<PreferenceState>()(
  persist(
    (set) => ({
      currency: { name: "USD", rate_change: 1 },
      palette: {
        background: "white",
        color: "black",
        border: "",
        primary: "#a41f13",
        header_background: "",
        header_text_color: "",
        price_color: "",
        checkout_content: "",
        checkout_background: "",
      },
      banners: { images: [] },
      store: "",
      branch: { _id: "", name: "", address: "", phone_number: "" },
      setStore: (val) => set({ store: val }),
      setBranch: (val) => set({ branch: val }),
      setCurrency: (val) => set({ currency: val }),
      setPalette: (val) => set({ palette: val }),
      setBanners: (val) => set({ banners: val }),
      has_hydrated: false,
      set_has_hydrated: (val) => set({ has_hydrated: val }),
    }),
    {
      name: "preferences-storage",
      partialize: (state) => ({
        currency: state.currency,
        branch: state.branch,
      }),
      onRehydrateStorage: () => (state) => {
        state?.set_has_hydrated(true);
      },
    }
  )
);
