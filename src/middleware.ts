/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const referer = request.headers.get("referer");
  const pathname = request.nextUrl.pathname;

  const origin =
    forwardedHost && forwardedProto
      ? `${forwardedProto}://${forwardedHost}`
      : request.nextUrl.origin;

  // Logging (optional)
  console.log("Origin:", origin);
  console.log("Referer:", referer);
  console.log("Pathname:", pathname);
  console.log("Forwarded Host:", forwardedHost);
  console.log("Forwarded Proto:", forwardedProto);

  // Redirect if there is no locale
  if (
    origin !== "https://fmcshops.com" &&
    origin !== "http://localhost:3000" &&
    pathname === "/" &&
    !pathname.includes("admin") &&
    !pathname.includes("store")
  ) {
    const newUrl = `/custom-domain`;

    // Perform the internal rewrite (without changing the URL in the address bar)
    return NextResponse.rewrite(new URL(newUrl, request.url));
  }

  const response = NextResponse.next({});

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|images|favicon.ico|manifest.webmanifest|site.webmanifest|android-chrome-192x192.png|android-chrome-512x512.png|apple-touch-icon.png|favicon-16x16.png|favicon-32x32.png|preview.png|cover.jpg).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
