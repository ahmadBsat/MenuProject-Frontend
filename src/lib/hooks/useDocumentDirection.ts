"use client";

import { useEffect, useState } from "react";

type Dir = "rtl" | "ltr";

export function useDocumentDirection(lang: string) {
  const [direction, setDirection] = useState<Dir>();

  useEffect(() => {
    const is_rtl = lang === "ar";
    setDirection(is_rtl ? "rtl" : "ltr");
  }, [lang]);

  return {
    rtl: direction === "rtl",
    ltr: direction === "ltr",
    direction,
  };
}
