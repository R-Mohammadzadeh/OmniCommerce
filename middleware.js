import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./lib/auth.config";

// Initialisierung von Auth.js mit deiner Konfiguration
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Definition der Routen-Typen
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginPage = nextUrl.pathname.startsWith('/login');
  const isProtectedRoute = 
    nextUrl.pathname.startsWith('/profile') || 
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/cart');

  /**
   * 1. Umleitung für bereits angemeldete Benutzer:
   * Wenn ein Nutzer eingeloggt ist und versucht, die Login-Seite aufzurufen,
   * wird er je nach Rolle zum Admin-Bereich oder zur Startseite weitergeleitet.
   */
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL(role === 'admin' ? '/admin' : '/', nextUrl));
  }

  /**
   * 2. Schutz von Standard-Benutzerseiten:
   * Nicht angemeldete Benutzer werden von geschützten Seiten zum Login umgeleitet.
   */
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  /**
   * 3. Schutz des Admin-Bereichs:
   * - Falls nicht eingeloggt -> Login-Seite.
   * - Falls eingeloggt, aber kein Admin -> Startseite (Zugriff verweigert).
   */
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', nextUrl));
    }
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
  }

  // Falls keine Regel zutrifft, wird die Anfrage normal weitergeführt
  return null;
});

/**
 * Der Matcher definiert, auf welche Pfade die Middleware angewendet wird.
 * Hier werden statische Dateien und API-Routen ausgeschlossen, um Performance zu sparen.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};