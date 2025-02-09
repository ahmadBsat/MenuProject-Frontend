import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const pathname = request.nextUrl.pathname;

  // // Redirect if there is no locale
  // if (
  //   origin !== "https://fmcshops.com" &&
  //   origin !== "http://localhost:3000" &&
  //   !pathname.includes("admin") &&
  //   !pathname.includes("store")
  // ) {
  //   const newUrl = `/${origin.split("//")[1]}`;

  //   // Perform the internal rewrite (without changing the URL in the address bar)
  //   return NextResponse.rewrite(new URL(newUrl, request.url));
  // }

  const response = NextResponse.next({});

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
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
