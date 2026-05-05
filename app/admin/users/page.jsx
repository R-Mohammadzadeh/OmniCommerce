import connectDB from "@/config/connectDB";
import UsersData from "@/models/UsersData";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, ShieldCheck, Mail, Calendar} from "lucide-react";
import Link from "next/link";
import UsersDataActions from "@/Components/UsersDataActions";

/**
 * Server Komponente zur Anzeige und Verwaltung aller registrierten Benutzer.
 * Nur für Administratoren zugänglich.
 */
export default async function UsersInfo() {

  // 1. Authentifizierung und Rollenprüfung:
  // Verhindert, dass nicht-Admins oder Gäste diese Seite sehen können.
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  // 2. Datenbankverbindung herstellen
  await connectDB();

  // 3. Benutzerdaten abrufen
  let users = [];
  try {
    const usersRaw = await UsersData.find({})
      .select("-password") // Passwörter niemals an den Client übertragen
      .sort({ createdAt: -1 }) // Neueste Registrierungen zuerst anzeigen
      .lean(); // Konvertiert Mongoose Dokumente in einfache JS-Objekte für bessere Performance
    
    // Konvertierung komplexer MongoDB-Typen (wie ObjectId) in einfache Strings
    users = JSON.parse(JSON.stringify(usersRaw));
  } catch (error) {
    console.error("Fehler beim Abrufen der Benutzer:", error);
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-24">
        {/* Header-Bereich mit Titel und Gesamtanzahl */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Benutzerverwaltung
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Verwalten Sie die registrierten Profile Ihrer Plattform.
            </p>
          </div>
          <div className="bg-blue-600 text-white text-xs font-black px-5 py-2.5 rounded-2xl shadow-lg uppercase">
            Gesamt: {users.length}
          </div>
        </div>

        {/* Listen-Container für die Benutzerprofile */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800/50">
          {users.length > 0 ? (
            <ul className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {users.map((user) => (
                <li 
                  key={user._id} 
                  className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  {/* Name und E-Mail Info */}
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <User size={24} />
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        {user.name} {user.familyName}
                        {/* Admin-Icon anzeigen, wenn der Nutzer Administrator ist */}
                        {user.role === 'admin' && <ShieldCheck size={16} className="text-red-500" />}
                      </span>
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Mail size={14} /> {user.email}
                      </span>
                    </div>
                  </div>

                  {/* Rollen-Badge und Aktions-Buttons */}
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-xl tracking-widest ${
                      user.role === 'admin' 
                        ? 'bg-red-50 text-red-600 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30' 
                        : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30'
                    }`}>
                      {user.role}
                    </span>

                    {/* Client-Komponente für interaktive Aktionen (z.B. Löschen oder Rolle ändern) */}
                    <UsersDataActions userId={user._id} userRole={user.role} /> 
                    
                    {/* Registrierungsdatum anzeigen */}
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(user.createdAt).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            /* Anzeige, falls keine Benutzer in der Datenbank vorhanden sind */
            <div className="p-20 text-center text-slate-500">
              Keine Benutzer gefunden.
            </div>
          )}
        </div>
      </div>

      {/* Zurück-Button zum Admin-Dashboard */}
      <button className="flex border justify-center my-8 mx-auto transition-all hover:bg-blue-500
        px-10 py-4 bg-slate-300 hover:rounded-3xl hover:text-white">
        <Link className="flex justify-center" href='/admin'>Admin Dashboard</Link>
      </button>
    </>
  );
}