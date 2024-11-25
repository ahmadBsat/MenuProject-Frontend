import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useOutsideClick = (callback: () => void, ref: any) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
