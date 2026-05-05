"use server"

import { headers } from "next/headers";
import Stripe from "stripe"

/**
 * Stripe Instanz initialisieren.
 * Der geheime Schlüssel wird sicher aus den Umgebungsvariablen geladen.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Erstellt eine Stripe Checkout Session basierend auf dem aktuellen Warenkorb.
 * @param {Array} cart - Liste der Produkte im Warenkorb.
 */
export async function createCheckoutAction(cart) {
  try {
    // 1. Validierung der Warenkorb-Daten
    if (!cart || cart.length === 0) {
      return { error: true, message: "Der Warenkorb ist leer." }
    }

    // 2. Erstellung der Line Items (Rechnungsposten) für Stripe
    const line_items = cart.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          // Nur valide Bild-URLs an Stripe senden
          images: item.image && item.image[0]?.startsWith('http') ? [item.image[0]] : [],
        },
        /**
         * WICHTIG: Stripe erwartet den Betrag in der kleinsten Währungseinheit (Cents).
         * Daher wird der Preis mit 100 multipliziert und gerundet.
         */
        unit_amount: Math.round((Number(item.price) || 0) * 100),
      },
      quantity: item.quantity || 1
    }))

    // 3. Ermittlung der Basis-URL für die Erfolgs- und Abbruch-Rückkehr
    const headerList = await headers();
    const origin = headerList.get('origin') || 'https://omni-commerce-swart.vercel.app'

    // 4. Konfiguration der Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      // Nach der Zahlung wird die Session-ID für die Bestätigungsseite angehängt
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    })

    // Rückgabe der Stripe-URL, zu der der Benutzer weitergeleitet wird
    return { error: false, url: session.url }

  } catch (error) {
    // Protokollierung bei Verbindungsfehlern oder API-Problemen
    console.error('Stripe Fehler:', error)
    return { error: true, message: "Fehler bei der Verbindung zu Stripe." }
  }
}