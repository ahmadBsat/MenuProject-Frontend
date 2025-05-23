/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FadeIn, FadeInStagger } from "../Motion/FadeIn";
import { Button } from "@nextui-org/react";

type Props = {
  title?: string;
  error?: string;
  description?: string;
  url?: string;
  show_btn?: boolean;
};

const NotFound = ({
  title = "Home",
  url = "/",
  show_btn = true,
  error = "Oops! Page not found",
  description = "Whoops, this is embarassing. Looks like the page you were looking for was not found.",
}: Props) => {
  return (
    <FadeInStagger className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center lg:pt-24 lg:pb-36 py-24">
        <FadeIn className="lg:w-[320px] sm:w-[300px] max-w-[400px]">
          <img
            src={"/images/404.png"}
            alt={"not found"}
            className="object-bottom"
          />
        </FadeIn>

        <FadeIn className="text-primary lg:text-2xl text-lg w-full text-center px-8 flex flex-col gap-1 mb-5">
          <h3>{error}</h3>
          <p className="text-black dark:text-white text-sm">{description}</p>
        </FadeIn>

        {show_btn && (
          <FadeIn>
            <Button
              as={Link}
              href={url}
              color="primary"
              radius="full"
              className="text-sm transition-all hover:scale-90"
            >
              {title}
            </Button>
          </FadeIn>
        )}
      </div>
    </FadeInStagger>
  );
};

export default NotFound;
