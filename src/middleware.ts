import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (token) {
    // Protect admin routes: only admins can access /admin and its sub-paths
    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      if ((token.role as Role).role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Protect user dashboard routes: only authenticated users can access /dashboard and its sub-paths
    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      if ((token.role as Role).role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }

    // If the user is not on an admin or dashboard route, redirect based on role
    if (!pathname.startsWith("/admin") && !pathname.startsWith("/dashboard")) {
      if ((token.role as Role).role === "admin") {
        console.log("Redirecting to admin dashboard");
        return NextResponse.redirect(new URL("/admin", req.url));
      } else {
        console.log("Redirecting to user dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  } else {
    // Redirect to sign-in if no token is found
    const signInUrl = new URL("/auth/login", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/auth/callback"],
};
