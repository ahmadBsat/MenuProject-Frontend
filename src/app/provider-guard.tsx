"use client";

import DotsLoader from "@/lib/components/Loader/DotsLoader";
import NotFound from "@/lib/components/Pages/NotFound";
import { URLs, getUrl } from "@/lib/constants/urls";
import { useAuth } from "@/lib/context/AuthContext";

const AuthGuardProvider = ({ children }) => {
  const { validating, logged } = useAuth();

  if (validating) {
    return (
      <div className="h-screen flex items-center justify-center">
        <DotsLoader />
      </div>
    );
  }

  if (!validating && !logged) {
    return (
      <NotFound
        error="Not Authenticated!"
        description="Please login or register to be able to access this page."
        title="Login"
        url={getUrl(URLs.auth.login)}
      />
    );
  }

  return children;
};

export default AuthGuardProvider;
