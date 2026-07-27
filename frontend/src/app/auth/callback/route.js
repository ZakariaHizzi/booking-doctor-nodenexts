import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${origin}/auth/login?error=no_token`);
  }

  // التوجيه للصفحة الرئيسية بعد النجاح
  const response = NextResponse.redirect(`${origin}/dashboard`);

  // حفظ التوكن ليقرأه Next.js والـ Middleware
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: "/",
  });

  return response;
}
