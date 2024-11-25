"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button, Input, Chip, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { URLs, getUrl } from "@/lib/constants/urls";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FadeIn, FadeInStagger } from "@/lib/components/Motion/FadeIn";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { API_AUTH } from "@/lib/services/auth_service";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse } from "@/lib/types/common";
import { Authentication } from "@/lib/types/auth";
import { redirect } from "@/utils/common";

export default function Register() {
  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<Authentication>();

  const router = useRouter();
  const searchparams = useSearchParams();
  const callback = searchparams.get("callback");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API_AUTH.register(credentials);

      setData(response);
      setSuccess(true);

      if (response) {
        setUser(response);
        localStorage.setItem("FMC_token", JSON.stringify(response.token));
      }

      setTimeout(() => {
        if (callback) {
          router.push(callback);
        } else {
          router.push(getUrl(URLs.admin.dashboard));
        }
      }, 500);
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

    if (data) {
      setUser(data);
      localStorage.setItem("FMC_token", JSON.stringify(data.token));
    }

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
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24 w-full h-full">
        <FadeInStagger className="w-full sm:max-w-md xl:mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Sign Up
            </h2>

            <p className="mt-2 text-base font-medium">
              Already have an account?
              <Link
                href={
                  callback
                    ? redirect(URLs.auth.login, callback)
                    : getUrl(URLs.auth.login)
                }
                className="font-medium mx-1 text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700 text-sm"
              >
                Log In
              </Link>
            </p>
          </FadeIn>

          <FadeIn>
            <form className="mt-8" onSubmit={(e) => handleSignUp(e)}>
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
                    label="Firstname"
                    name="firstname"
                    type="text"
                    isRequired
                    required
                    className="w-full"
                    value={credentials.firstname}
                    onValueChange={(val) => handleChange("firstname", val)}
                  />
                </div>

                <div className="sm:mt-2.5">
                  <Input
                    label="Lastname"
                    name="lastname"
                    type="text"
                    isRequired
                    required
                    className="w-full"
                    value={credentials.lastname}
                    onValueChange={(val) => handleChange("lastname", val)}
                  />
                </div>

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

                <div className="sm:mt-2.5">
                  <Input
                    label="Confirm Password"
                    type={isVisible ? "text" : "password"}
                    name="password"
                    placeholder="Confirm Password"
                    isRequired
                    required
                    className="w-full"
                    value={credentials.confirm_password}
                    onValueChange={(val) =>
                      handleChange("confirm_password", val)
                    }
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
                    isInvalid={
                      credentials.password !== credentials.confirm_password
                    }
                  />
                </div>

                <div>
                  <Button
                    size="lg"
                    radius="lg"
                    color={success ? "success" : "primary"}
                    type="submit"
                    isLoading={loading}
                    isDisabled={
                      credentials.password !== credentials.confirm_password
                    }
                    className="w-full px-4 py-4 text-base font-semibold"
                  >
                    {success ? "Sucess" : "Sign Up"}
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
