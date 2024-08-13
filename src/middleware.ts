import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  if (!request.cookies.get("token")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const token = request.cookies.get("token")!.value;
  const parsed = await decrypt(token);
  parsed.expires = new Date(Date.now() + 900 * 1000);
  const response = NextResponse.next();
  response.headers.set("client-id", parsed.client_id);
  response.cookies.set({
    name: "token",
    value: await encrypt(parsed),
    expires: parsed.expires,
    // httpOnly: true,
  });
  return response;
}

// match all routes except homepage
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)",
};
