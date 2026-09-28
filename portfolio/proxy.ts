import { NextResponse, type NextRequest } from "next/server";
import { adminHosts, SESSION_COOKIE, verifySession } from "@/lib/admin-auth";

/**
 * Guards the private admin panel.
 *
 * - /admin exists only on ADMIN_HOST. Anywhere else it returns a plain 404.
 *   Without ADMIN_HOST the panel is disabled in production (it still works in
 *   `npm run dev` for local testing).
 * - On the admin host, every other path redirects to /admin, so that domain
 *   shows nothing but the panel.
 * - Admin pages require a valid session, except the login page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const hostname = host.replace(/:\d+$/, "");
  const allowed = adminHosts();
  const onAdminHost = allowed.length > 0 && (allowed.includes(host) || allowed.includes(hostname));
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminPath) {
    const devOpen = allowed.length === 0 && process.env.NODE_ENV !== "production";
    if (!onAdminHost && !devOpen) {
      return new NextResponse("Not Found", { status: 404, headers: { "content-type": "text/plain" } });
    }
    const isLogin = pathname === "/admin/login";
    const authed = verifySession(request.cookies.get(SESSION_COOKIE)?.value);
    if (!authed && !isLogin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (authed && isLogin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  if (onAdminHost) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Everything except static assets and image optimisation.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|images/).*)"],
};
