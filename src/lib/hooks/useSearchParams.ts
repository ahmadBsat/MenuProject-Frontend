"use client";

import { useEffect, useState } from "react";

export const useSearchParams = (initialParams = {}) => {
  const [params, setParams] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.keys(initialParams).forEach((key) => {
      if (!searchParams.has(key)) {
        searchParams.set(key, initialParams[key]);
      }
    });
    return searchParams;
  });

  useEffect(() => {
    const newSearchParams = new URLSearchParams(params.toString());
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  }, [params]);

  const setParam = (key, value) => {
    const newParams = new URLSearchParams(params.toString());
    if (value === undefined || value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setParams(newParams);
  };

  const getParam = (key) => {
    return params.get(key);
  };

  return { params, setParam, getParam };
};
