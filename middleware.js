import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/resume",
  "/ai-cover-letter",
  "/interview",
];

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Better Auth uses "better-auth.session_token" as the cookie name
    const sessionCookie = req.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      return NextResponse.redirect(
        new URL(`/sign-in?returnUrl=${encodeURIComponent(req.url)}`, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};