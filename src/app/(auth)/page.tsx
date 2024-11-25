"use client";

import Link from "next/link";
import { redirect } from "@/utils/common";
import { URLs, getUrl } from "@/lib/constants/urls";
import { ErrorResponse } from "@/lib/types/common";
import { useAuth } from "@/lib/context/AuthContext";
import { handleServerError } from "@/lib/api/_axios";
import { API_AUTH } from "@/lib/services/auth_service";
import { FormEvent, useState, useEffect } from "react";
import DotsLoader from "@/lib/components/Loader/DotsLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Button, Input, Chip } from "@nextui-org/react";
import { FadeIn, FadeInStagger } from "@/lib/components/Motion/FadeIn";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const searchparams = useSearchParams();
  const callback = searchparams.get("callback");

  const { user, setUser, setLogged, validating } = useAuth();

  useEffect(() => {
    if (user?.user) {
      setLogged(true);
      checkCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (field: string, value: string) => {
    const temp = { ...credentials };
    temp[field] = value;

    setCredentials(temp);
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API_AUTH.login(credentials);

      setUser(response);

      localStorage.setItem("FMC_token", JSON.stringify(response.token));
      checkCallback();
    } catch (e) {
      handleServerError(e as ErrorResponse, (err_msg) => {
        setError(err_msg as string);
      });
    } finally {
      setLoading(false);
    }
  };

  const checkCallback = () => {
    setSuccess(true);

    if (user) localStorage.setItem("FMC_token", JSON.stringify(user.token));

    setTimeout(() => {
      if (callback) {
        router.push(callback);
      } else {
        router.push(getUrl(URLs.admin.dashboard));
      }
    }, 500);
  };

  if (validating || user) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <DotsLoader />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24 w-full h-full">
        <FadeInStagger className="w-full sm:max-w-md xl:mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Log In
            </h2>

            <p className="mt-2 text-base font-medium">
              New to FMC?
              <Link
                href={
                  callback
                    ? redirect(URLs.auth.register, callback)
                    : getUrl(URLs.auth.register)
                }
                className="font-medium mx-1.5 text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700 text-sm"
              >
                Create an account
              </Link>
            </p>
          </FadeIn>

          <FadeIn>
            <form className="mt-8" onSubmit={(e) => handleSignIn(e)}>
              <div className="space-y-3 sm:space-y-5">
                {error && (
                  <Chip
                    size="lg"
                    radius="md"
                    variant="flat"
                    color="danger"
                    className="py-6 px-2 w-full"
                    classNames={{
                      base: "max-w-full w-full",
                      content: "font-semibold text-sm",
                    }}
                  >
                    {error}
                  </Chip>
                )}

                <div className="sm:mt-2.5">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    isRequired
                    required
                    placeholder="example@example.com"
                    className="w-full"
                    value={credentials.email}
                    onValueChange={(val) => handleChange("email", val)}
                  />
                </div>

                <div className="sm:mt-2.5">
                  <Input
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    isRequired
                    required
                    className="w-full"
                    value={credentials.password}
                    onValueChange={(val) => handleChange("password", val)}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                </div>

                <div className="sm:mt-2 text-sm font-medium flex justify-end">
                  <Link
                    href={
                      callback
                        ? redirect(URLs.auth.forgotPassword, callback)
                        : getUrl(URLs.auth.forgotPassword)
                    }
                    className="font-medium ml-1 text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700 text-sm"
                  >
                    Forgot password
                  </Link>
                </div>

                <div>
                  <Button
                    size="lg"
                    radius="lg"
                    color={success ? "success" : "primary"}
                    type="submit"
                    isLoading={loading}
                    isDisabled={success}
                    className="w-full px-4 py-4 text-base font-semibold"
                  >
                    {success ? "Success" : "Log In"}
                  </Button>
                </div>
              </div>
            </form>
          </FadeIn>
        </FadeInStagger>
      </div>
    </>
  );
}
