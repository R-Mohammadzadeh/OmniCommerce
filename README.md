# 🛒 Reza Store – Premium Gadgets Shop

Ein moderner E-Commerce-Shop für Premium-Gadgets, gebaut mit **Next.js 15**, **MongoDB** und **Stripe**.

---

## 🚀 Tech-Stack

| Technologie | Version | Beschreibung |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15.5 | App Router, Server Actions, Turbopack |
| [React](https://react.dev/) | 19.1 | UI-Framework |
| [MongoDB](https://www.mongodb.com/) + Mongoose | 9.5 | Datenbank |
| [NextAuth v5](https://authjs.dev/) | 5.0-beta | Authentifizierung (OTP-basiert) |
| [Stripe](https://stripe.com/) | 22.0 | Zahlungsabwicklung |
| [Cloudinary](https://cloudinary.com/) | 2.9 | Bild-Upload & Hosting |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0 | State Management (Cart, Wishlist, Theme) |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2 | Styling |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animationen |
| [Recharts](https://recharts.org/) | 3.8 | Admin-Dashboard Charts |
| [Nodemailer](https://nodemailer.com/) | 8.0 | OTP-E-Mails versenden |
| [Swiper](https://swiperjs.com/) | 12 | Produkt-Slider |

---

## 📋 Voraussetzungen

- **Node.js** >= 18.x
- **npm** >= 9.x
- MongoDB-Datenbank (lokal oder [MongoDB Atlas](https://www.mongodb.com/atlas))
- Stripe-Konto
- Cloudinary-Konto
- E-Mail-Konto für Nodemailer (z. B. Gmail)

---

## ⚙️ Installation

### 1. Repository klonen

```bash
git clone <repo-url>
cd my-app
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Umgebungsvariablen einrichten

Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
# Datenbank
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>

# NextAuth
AUTH_SECRET=<dein-geheimer-schluessel>         # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Nodemailer (E-Mail für OTP-Versand)
EMAIL_USER=deine@email.de
EMAIL_PASS=dein-app-passwort

# Demo-Admin OTP (optional, Standard: 11111)
DEMO_OTP=11111
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Die App ist unter [http://localhost:3000](http://localhost:3000) erreichbar.

---

## 📁 Projektstruktur

```
my-app/
├── app/                        # Next.js App Router
│   ├── page.js                 # Startseite
│   ├── layout.js               # Root Layout (Navbar, Footer)
│   ├── actions/                # Server Actions
│   │   ├── getHomeProductsAction.jsx
│   │   ├── stripeActions.jsx
│   │   ├── usersActions.jsx
│   │   └── ...
│   ├── admin/                  # Admin-Bereich (geschützt)
│   ├── cart/                   # Warenkorb
│   ├── product/                # Produkt-Detailseite
│   ├── profile/                # Benutzerprofil
│   ├── login/                  # Login (OTP)
│   ├── register/               # Registrierung
│   ├── wishlist/               # Wunschliste
│   └── ...
├── Components/                 # Wiederverwendbare Komponenten
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── HomeSlider.jsx
│   ├── ProductReviews.jsx
│   └── ...
├── models/                     # Mongoose-Schemas
│   ├── UsersData.js            # Benutzer-Schema
│   └── ProductsData.js         # Produkt-Schema
├── lib/                        # Auth-Konfiguration
│   ├── auth.js                 # NextAuth Setup
│   ├── auth.config.js          # Auth-Callbacks & Pages
│   └── authActions.js
├── store/                      # Zustand Stores
│   ├── useCartStore.js         # Warenkorb
│   ├── useWishlistStore.js     # Wunschliste
│   └── themeStore.js           # Dark/Light Mode
├── config/
│   └── connectDB.js            # MongoDB-Verbindung
├── dictionaries/
│   └── de.js                   # Deutsche Übersetzungen
├── utils/
│   └── Helper.jsx
└── middleware.js               # Routen-Schutz (Auth)
```

---

## 🔐 Authentifizierung

Das Login-System basiert auf **OTP (Einmal-Passwort)** per E-Mail – kein klassisches Passwort-Login.

**Login-Ablauf:**
1. Benutzer gibt E-Mail-Adresse ein
2. Ein 6-stelliger OTP-Code wird per E-Mail versendet
3. Benutzer gibt den Code ein und wird eingeloggt

**Rollen:**
- `user` – Standardbenutzer (Warenkorb, Profil, Bestellungen)
- `admin` – Zugriff auf Admin-Panel

**Demo-Admin-Konto:**
```
E-Mail: demo-admin@test.com
OTP:    11111  (oder DEMO_OTP aus .env)
```

---

## 🛡️ Routen-Schutz (Middleware)

| Route | Zugriff |
|---|---|
| `/` | Öffentlich |
| `/product/*` | Öffentlich |
| `/login` | Nur nicht eingeloggte Nutzer |
| `/cart`, `/profile`, `/dashboard` | Eingeloggte Nutzer |
| `/admin/*` | Nur Admins |

---

## 🏪 Features

- **Startseite** – Produkt-Slider nach Kategorien (Kameras, Laptops, Smartphones, Tablets, Gaming)
- **Produktsuche** – Live-Suche über alle Produkte
- **Produktdetailseite** – Bilder, Beschreibung, Bewertungen, In den Warenkorb
- **Warenkorb** – Menge ändern, löschen, Checkout mit Stripe
- **Wunschliste** – Produkte speichern (Zustand)
- **Bewertungen** – Sterne-Bewertung & Kommentare (nur eingeloggte Nutzer)
- **Profil** – Daten bearbeiten, Profilbild hochladen (Cloudinary)
- **Passwort vergessen** – Reset per OTP-Code
- **Dark Mode** – System-weite Umschaltung
- **Cookie-Consent** – DSGVO-konformes Banner
- **Admin-Panel:**
  - Dashboard mit Charts (Recharts)
  - Produkte hinzufügen / bearbeiten / löschen
  - Benutzerverwaltung
  - Kategorieübersicht

---

## 🛍️ Produkt-Kategorien

| Kategorie | Slug |
|---|---|
| Kameras | `camera` |
| Laptops | `laptop` |
| Smartphones | `mobile` |
| Tablets | `tablet` |
| Gaming / PlayStation | `playstation` |

---

## 💳 Stripe-Integration

Zahlungen werden über Stripe Checkout abgewickelt. Nach erfolgreichem Checkout wird der Nutzer auf `/success` weitergeleitet.

**Testdaten für Stripe:**
```
Kartennummer: 4242 4242 4242 4242
Datum:        beliebig (z. B. 12/34)
CVC:          beliebig (z. B. 123)
```

---

## 🖼️ Bild-Upload (Cloudinary)

Produkt- und Profilbilder werden direkt zu Cloudinary hochgeladen. Die zurückgegebene URL wird in der Datenbank gespeichert.

---

## 🧪 Verfügbare Scripts

```bash
npm run dev      # Entwicklungsserver starten (Turbopack)
npm run build    # Produktions-Build erstellen
npm run start    # Produktions-Server starten
npm run lint     # ESLint ausführen
```

---

## 🗄️ Datenbank-Schemas

### User
| Feld | Typ | Pflicht |
|---|---|---|
| `name` | String | ✅ |
| `email` | String (unique) | ✅ |
| `password` | String (gehasht) | ✅ |
| `phone` | String | ✅ |
| `role` | `user` \| `admin` | – |
| `image` | String (URL) | – |
| `otpCode` | String | – |
| `otpExpires` | Date | – |
| `lastLogin` | Date | – |

### Produkt
| Feld | Typ | Pflicht |
|---|---|---|
| `name` | String | ✅ |
| `description` | String | ✅ |
| `price` | Number | ✅ |
| `category` | Enum | ✅ |
| `brand` | String | ✅ |
| `stock` | Number | – |
| `image` | String[] | – |
| `rating` | Number (0–5) | – |
| `reviews` | Review[] | – |

---

## 📄 Lizenz

Dieses Projekt ist privat und nicht für die öffentliche Nutzung freigegeben.

---

> Gebaut mit ❤️ – **Reza Mohammadzadeh** © 2026