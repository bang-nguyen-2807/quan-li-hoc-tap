import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const url = req.nextUrl.clone();

  // Chưa đăng nhập
  if (!role) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Admin
  if (url.pathname.startsWith("/admin") && role !== "ADMIN") {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  // Teacher
  if (url.pathname.startsWith("/teach") && role !== "TEACH") {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  //student
  if (url.pathname.startsWith("/student") && role !== "STUDENT") {
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/teach/:path*", "/student/:path*"],
};
