"use client";

import DotsLoader from "@/lib/components/Loader/DotsLoader";
import { FadeIn, FadeInStagger } from "@/lib/components/Motion/FadeIn";
import NotFound from "@/lib/components/Pages/NotFound";
import { URLs, getUrl } from "@/lib/constants/urls";
import { useAuth } from "@/lib/context/AuthContext";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Chip, Spinner } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginCallback() {
  const router = useRouter();
  const searchparams = useSearchParams();
  const check_error = searchparams.get("error");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setUser, validating, user } = useAuth();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    const token = searchparams.get("token");
    const user_data = searchparams.get("user");

    if (check_error) {
      setLoading(false);
      setError(true);
      return;
    }

    if (!token) {
      setError(true);
      return;
    }

    if (!user_data) {
      setError(true);
      return;
    }

    const decoded_user = decodeURIComponent(user_data);
    const parsed_user = JSON.parse(decoded_user);

    setUser({ user: parsed_user, token });
    localStorage.setItem("FMC_token", JSON.stringify(token));
    setLoading(false);

    router.push(getUrl(URLs.organization.dashboard));
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full py-20 gap-4 items-center justify-center h-full">
        <DotsLoader />
      </div>
    );
  }

  if (error) {
    return (
      <NotFound
        error="Oops! error loggin in"
        description="An error occured while trying to log you in, please try again later"
      />
    );
  }

  if (validating || user) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <FadeInStagger className="flex flex-col w-full py-20 gap-4 items-center justify-center h-full">
      <FadeIn>
        <div className="w-16 h-16 text-green-600">
          <CheckCircleIcon />
        </div>
      </FadeIn>

      <FadeIn>
        <p className="text-xl text-center">
          You&apos;ve logged in successfully, redirecting <br />
          you shortly.
        </p>
      </FadeIn>

      <FadeIn>
        <Chip
          size="lg"
          color="success"
          radius="full"
          isDisabled
          classNames={{ content: "font-medium" }}
        >
          Redirecting...
        </Chip>
      </FadeIn>
    </FadeInStagger>
  );
}
