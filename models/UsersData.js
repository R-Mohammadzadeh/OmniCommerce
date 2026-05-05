import mongoose, { Schema, model, models } from "mongoose";


const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

/**
 * UsersSchema: Das Hauptschema für die Benutzerdaten deines Shops.
 */
const UsersSchema = new Schema({
  name: {
    type: String,
    required: [true, "Ein Name ist erforderlich"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Eine E-Mail-Adresse ist erforderlich"],
    unique: true, // Verhindert doppelte Registrierungen
    trim: true,
    lowercase: true, // Speichert E-Mails immer in Kleinbuchstaben
  },
  password: {
    type: String,
    required: [true, "Ein Passwort ist erforderlich"],
    // In Server Actions solltest du dies mit bcrypt hashen
  },
  phone: {
    type: String,
    required: [true, "Eine Telefonnummer ist erforderlich"],
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Nur diese beiden Rollen sind erlaubt
    default: 'user',
  },
  image: {
    type: String, // URL zum Profilbild (z.B. Cloudinary)
  },
  // OTP (Einmal-Passwort) Logik für sicheren Login
  otpCode: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  // Liste der vom Benutzer verfassten Rezensionen
  reviews: [ReviewSchema]
}, { 
  // Erzeugt automatisch 'createdAt' (Registrierungsdatum) und 'updatedAt'
  timestamps: true 
});


const UsersData = models.UsersData || model('UsersData', UsersSchema, 'usersDatas');

export default UsersData;