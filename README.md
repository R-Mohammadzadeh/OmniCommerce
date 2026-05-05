# 🛒 OmniCommerce – Moderne E-Commerce Plattform

[![Live Demo](https://img.shields.io/badge/🚀_Live-Demo-green?style=for-the-badge)](https://omni-commerce-swart.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/💻_Source-Code-black?style=for-the-badge)](https://github.com/R-Mohammadzadeh/OmniCommerce)

> Eine moderne Full-Stack E-Commerce Anwendung mit Fokus auf Performance, Skalierbarkeit und exzellente User Experience.

---

##  Warum dieses Projekt?

Viele E-Commerce-Projekte sind entweder:

* ❌ Überkompliziert und langsam
* ❌ Oder zu simpel und nicht realitätsnah

👉 **OmniCommerce kombiniert beides richtig**
Realistische Architektur + moderne Technologien + sauberes UX.

---

##  Features

* 🔐 Passwortlose Authentifizierung (OTP per E-Mail)
* 🛍️ Warenkorb & Wunschliste (Zustand – in Echtzeit)
* 💳 Sichere Bezahlung mit Stripe
* 🧑‍💼 Admin-Dashboard (Produkte / Nutzer / Statistiken)
* ⭐ Bewertungen & Review-System
* 🌙 Dark Mode
* 🔎 Live-Produktsuche
* 📱 Vollständig responsiv (Mobile-first)
* ⚡ Sehr schnelle Performance (Next.js + Server Actions)

---

## 🧠 Tech Stack

**Frontend**

* Next.js (App Router)
* React
* Tailwind CSS
* Framer Motion

**Backend**

* Server Actions (kein klassisches REST API)

**Datenbank**

* MongoDB + Mongoose

**Authentifizierung**

* NextAuth (OTP-basiert)

**Payments**

* Stripe Checkout + Webhooks

**Storage**

* Cloudinary

**State Management**

* Zustand

---

## 🌐 Live Demo

👉 https://omni-commerce-swart.vercel.app

---
## ⚙️ Lokale Installation

```bash id="y6jz7m"
git clone https://github.com/R-Mohammadzadeh/OmniCommerce.git
cd OmniCommerce
npm install
npm run dev
```

---

## 🔑 Environment Variablen

```env id="l88v3k"
MONGODB_URI=

AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASS=

DEMO_OTP=111111
```

> ⚠️ `.env` Dateien niemals ins Repository committen!

---

## 🔐 Authentifizierungs-Flow

1. E-Mail eingeben
2. OTP-Code erhalten
3. Code bestätigen → eingeloggt

👉 Kein Passwort, keine Reibung.

---

## 🛡️ Zugriffskontrolle

| Route        | Zugriff                |
| ------------ | ---------------------- |
| `/`          | Öffentlich             |
| `/product/*` | Öffentlich             |
| `/cart`      | Nur eingeloggte Nutzer |
| `/profile`   | Nur eingeloggte Nutzer |
| `/admin/*`   | Nur Admin              |

---

## 🧩 Architektur

Client → Next.js (React + Zustand)
Server → Server Actions
Datenbank → MongoDB
Payments → Stripe
Media → Cloudinary

---

## 🚧 Herausforderungen

* OTP-Verifikation & Ablaufzeit korrekt implementieren
* Sichere Routen mit Middleware schützen
* Globalen State sauber synchronisieren
* Stripe Checkout korrekt integrieren

---

## 📈 Production-Ready Aspekte

* Skalierbare Projektstruktur
* Role-based Access Control
* Sichere Authentifizierung
* Optimierte Performance (SSR + Caching)

---

## 🚀 Zukünftige Erweiterungen

* Bestellhistorie
* Erweiterte Filter & Sortierung
* Pagination / Infinite Scroll
* Mehrsprachigkeit (i18n)
* Tests (Unit / Integration)

---

## 👨‍💻 Autor

**Reza Mohammadzadeh**

* GitHub: https://github.com/R-Mohammadzadeh

---

##  Support

Wenn dir das Projekt gefällt, lass gerne ein ⭐ da!
