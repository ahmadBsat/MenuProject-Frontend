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
  session_id: string | null;
  currency: { name: string; rate_change: number };
  branch: Partial<StoreBranch>;
  palette: StorePalette;
  banners: StoreBanner;
  setSessionId: (val: string | null) => void;
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
        category_background: "",
        category_color: "",
        clear_button_color: "",
        clear_button_background: "",
        section_color: "",
        section_background: "",
        active_section_color: "",
        active_section_background: "",
      },
      banners: { images: [] },
      store: "",
      session_id: null,
      branch: { _id: "", name: "", address: "", phone_number: "" },
      setStore: (val) => set({ store: val }),
      setBranch: (val) => set({ branch: val }),
      setCurrency: (val) => set({ currency: val }),
      setPalette: (val) => set({ palette: val }),
      setBanners: (val) => set({ banners: val }),
      setSessionId: (val) => set({ session_id: val }),
      has_hydrated: false,
      set_has_hydrated: (val) => set({ has_hydrated: val }),
    }),
    {
      name: "preferences-storage",
      partialize: (state) => ({
        currency: state.currency,
        branch: state.branch,
        session_id: state.session_id,
      }),
      onRehydrateStorage: () => (state) => {
        state?.set_has_hydrated(true);
      },
    }
  )
);
