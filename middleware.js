
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./lib/auth.config";


const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginpage = nextUrl.pathname.startsWith('/login');
 

  // Wenn der Pfad login lautete und der Benutzer bereits eingeloggt war
  if (isLoginpage && isLoggedIn) {
    return NextResponse.redirect(new URL(role === 'admin' ? '/admin' : '/', nextUrl));
  } 
  // Wenn der Pfad admin lautete und der Benutzer nicht admin war
  if (isAdminRoute) {
    if (!isLoggedIn) {
     
      return NextResponse.redirect(new URL('/login', nextUrl));
    }

    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }

  }

  return null;
});

export const config = {
  // Dies führt dazu, dass die Middleware auf allen Routen außer den Ausnahmen ausgeführt wird. 
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};