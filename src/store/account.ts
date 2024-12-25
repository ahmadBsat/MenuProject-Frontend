"use client";

import { StoreBranch, StorePalette } from "@/lib/types/store/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferenceState = {
  currency: string;
  branch: Partial<StoreBranch>;
  palette: StorePalette;
  setPalette: (val: StorePalette) => void;
  setBranch: (val: StoreBranch) => void;
  setCurrency: (val: string) => void;
  store: string;
  setStore: (val: string) => void;
};

export const usePreference = create<PreferenceState>()(
  persist(
    (set) => ({
      currency: "USD",
      palette: {
        background: "white",
        color: "black",
        border: "",
        primary: "#a41f13",
      },
      store: "",
      branch: { _id: "", name: "", address: "", phone_number: "" },
      setStore: (val) => set({ store: val }),
      setBranch: (val) => set({ branch: val }),
      setCurrency: (val) => set({ currency: val }),
      setPalette: (val) => set({ palette: val }),
    }),
    {
      name: "preferences-storage",
      partialize: (state) => ({ currency: state.currency }),
    }
  )
);
