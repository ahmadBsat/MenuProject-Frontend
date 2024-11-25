import { RefObject } from "react";

export const useScrollToPercentage = (
  elementRef: RefObject<HTMLElement>
): [
  (percentageX: number, percentageY: number, behavior?: ScrollBehavior) => void
] => {
  const scrollToPercentage = (
    percentageX: number,
    percentageY: number,
    behavior?: ScrollBehavior
  ) => {
    if (elementRef.current) {
      const { scrollWidth, scrollHeight } = elementRef.current;
      const maxScrollX = scrollWidth - elementRef.current.clientWidth;
      const maxScrollY = scrollHeight - elementRef.current.clientHeight;

      const scrollToX = (percentageX / 100) * maxScrollX;
      const scrollToY = (percentageY / 100) * maxScrollY;

      elementRef.current.scrollTo({
        left: scrollToX,
        top: scrollToY,
        behavior: behavior ? behavior : "smooth",
      });
    }
  };

  return [scrollToPercentage];
};
