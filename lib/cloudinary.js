// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

// Konfiguration von Cloudinary mit Umgebungsvariablen
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // Stellt sicher, dass alle generierten URLs das sichere HTTPS-Protokoll nutzen
  secure: true,
});

/**
 * Sicherheitscheck: Falls Umgebungsvariablen fehlen, wird eine Warnung in der Konsole ausgegeben.
 * Dies hilft beim Debugging, falls der Bildupload nicht funktioniert.
 */
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.warn("Cloudinary-Konfiguration: CLOUDINARY_CLOUD_NAME fehlt in der .env-Datei.");
}

export default cloudinary;