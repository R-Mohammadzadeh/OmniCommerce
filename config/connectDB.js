import mongoose from "mongoose";

// Die MongoDB-URI wird aus den Umgebungsvariablen geladen
const MONGO_URI = process.env.MONGO_URI;

// Sicherheitscheck: Falls die URI fehlt, wird die Anwendung sofort gestoppt
if (!MONGO_URI) {
  throw new Error("Bitte definieren Sie die Variable MONGO_URI in Ihrer .env.local Datei");
}

/**
 * In Next.js (besonders im Development-Modus) wird das globale Objekt verwendet, 
 * um die Datenbankverbindung über Hot-Reloads hinweg beizubehalten. 
 * Dies verhindert, dass bei jeder Code-Änderung eine neue Verbindung geöffnet wird.
 */
let cached = global.mongoose;

if (!cached) {
  // Initialisierung des Caches, falls noch keine Verbindung existiert
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Wenn bereits eine aktive Verbindung im Cache ist, gib diese sofort zurück
  if (cached.conn) {
    return cached.conn;
  }

  // Falls noch kein Verbindungsaufbau (Promise) läuft, starte einen neuen
  if (!cached.promise) {
    const opts = {
      // Deaktiviert das Puffern von Befehlen, falls die Verbindung noch nicht steht
      bufferCommands: false, 
    };

    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ Neue MongoDB-Verbindung erfolgreich aufgebaut");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("Fehler beim Aufbau der MongoDB-Verbindung:", error);
        // Falls der Aufbau fehlschlägt, setzen wir das Promise zurück, 
        // damit ein erneuter Versuch möglich ist.
        cached.promise = null; 
        throw error;
      });
  }

  try {
    // Warte darauf, dass das Promise aufgelöst wird und speichere die Verbindung
    cached.conn = await cached.promise;
  } catch (e) {
    // Bei Fehlern während des 'await' setzen wir das Promise ebenfalls zurück
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;