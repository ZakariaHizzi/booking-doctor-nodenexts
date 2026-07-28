import { NextResponse } from "next/server";

const publicRoutes = new Set([
  "/",
  "/auth/login",
  "/auth/register",
  "/doctors",
  "/doctors/",
]);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/") || pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  const isPublicRoute = publicRoutes.has(pathname) || pathname.startsWith("/doctors/");

  if (!token && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (token && pathname.startsWith("/auth/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
