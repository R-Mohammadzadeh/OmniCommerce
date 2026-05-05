/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /**
     * remotePatterns erlaubt es Next.js, Bilder von externen Quellen sicher zu optimieren.
     * Jede Domain, von der Bilder geladen werden sollen, muss hier registriert sein.
     */
    remotePatterns: [
      {
        // Erlaubt Bilder von Cloudinary
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        // Erlaubt die Profilbilder von Pravatar für die About-Page
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
  },

  /**
   * ESLint-Einstellungen:
   * 'ignoreDuringBuilds' verhindert, dass der Build-Prozess bei Linting-Warnungen stoppt.
   * Nützlich für einen schnelleren Workflow während der Entwicklung.
   */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /**
   * TypeScript-Einstellungen:
   * 'ignoreBuildErrors' erlaubt den Build der Anwendung, selbst wenn Typ-Fehler vorliegen.
   * Hinweis: Sollte vor dem finalen Deployment idealerweise auf 'false' stehen.
   */
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;