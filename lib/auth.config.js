export const authConfig = {
  // Definition der benutzerdefinierten Login-Seite
  pages: {
    signIn: '/login', // Leitet nicht angemeldete Benutzer hierhin weiter
  },

  // Sitzungskonfiguration
  session: {
    strategy: 'jwt', // Verwende JSON Web Tokens für die Sitzungsspeicherung
    maxAge: 30 * 24 * 60 * 60, // Gültigkeit der Sitzung: 30 Tage
    updateAge: 24 * 60 * 60, // Intervall, in dem das Token aktualisiert wird: 24 Stunden
  },

  callbacks: {
    /**
     * Prüft, ob ein Benutzer berechtigt ist, eine bestimmte Seite aufzurufen.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth;
      // Definition der geschützten Routen
      const isProtected = 
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/profile');

      // Falls die Seite geschützt ist, entscheidet der Login-Status über den Zugriff
      if (isProtected) return isLoggedIn;
      
      // Öffentliche Seiten sind für alle zugänglich
      return true;
    },

    /**
     * Wird aufgerufen, wenn ein JWT erstellt oder aktualisiert wird.
     * Hier werden zusätzliche Benutzerdaten aus der Datenbank in das Token geschrieben.
     */
    async jwt({ token, user }) {
      if (user) {
        // Diese Daten sind nur beim ersten Login im 'user'-Objekt verfügbar
        token.role = user.role;
        token.createdAt = user.createdAt;
        token.lastLogin = user.lastLogin;
      }
      return token;
    },

    /**
     * Wird aufgerufen, wenn auf die Session zugegriffen wird (Client- oder Serverseitig).
     * Überträgt die Daten aus dem verschlüsselten JWT in das session.user-Objekt.
     */
    async session({ session, token }) {
      if (token && session.user) {
        // Daten vom Token für die Benutzeroberfläche verfügbar machen
        session.user.role = token.role;
        session.user.createdAt = token.createdAt;
        session.user.lastLogin = token.lastLogin;
      }
      return session;
    },
  },
  
  // Die Providers (z.B. Credentials, Google) werden in der Haupt-Auth-Datei ergänzt
  providers: [],
};