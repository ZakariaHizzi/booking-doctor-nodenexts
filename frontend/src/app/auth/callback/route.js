import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  
  // استخراج الـ Token أو الـ Code القادم من رابط التوجيه
  const token = searchParams.get("token") || searchParams.get("code");
  const error = searchParams.get("error");

  // إذا وجد خطأ أو لم يصل توكن، يتم التحويل لصفحة الدخول
  if (error || !token) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
  }

  // التوجيه إلى الصفحة الرئيسية بعد نجاح الدخول (يمكنك تغيير /dashboard للـ Route المناسب لك)
  const response = NextResponse.redirect(`${origin}/dashboard`);

  // حفظ التوكن في الكوكيز ليعمل في Vercel
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}
