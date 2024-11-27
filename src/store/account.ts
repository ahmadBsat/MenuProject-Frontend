"use client";

import { StoreBranch } from "@/lib/types/store/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferenceState = {
  currency: string;
  branch: StoreBranch;
  setBranch: (val: StoreBranch) => void;
  setCurrency: (val: string) => void;
};

export const usePreference = create<PreferenceState>()(
  persist(
    (set) => ({
      currency: "USD",
      branch: { _id: "", name: "", address: "", phone_number: "" },
      setBranch: (val) => set({ branch: val }),
      setCurrency: (val) => set({ currency: val }),
    }),
    {
      name: "preferences-storage",
      partialize: (state) => ({ currency: state.currency }),
    }
  )
);
