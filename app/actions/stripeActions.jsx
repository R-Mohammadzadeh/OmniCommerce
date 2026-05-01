"use server"

import { headers } from "next/headers";
import Stripe from "stripe"





const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) ;

export async function createCheckoutAction(cart){
try{

// 1. Validierung der Warenkorb-Daten
if(!cart || cart.length === 0) {
    return {error : true , message : "Der Warenkorb ist leer."}
}

// 2. Erstellung der Line Items für Stripe
const line_items = cart.map((item) =>({
    price_data : {
        currency : 'eur' ,
        product_data :{
            name : item.name,
            images:item.image && item.image[0]?.startsWith('http') ? [item.image[0]] : [],
        },
        unit_amount: Math.round(item.price * 100) ,// Stripe arbeitet mit Cents
       },
       quantity : item.quantity || 1
}))

// 3. Origin-URL ermitteln
const headerList = await headers() ;
const origin = headerList.get('origin') || 'https://omni-commerce-swart.vercel.app/ '

// 4. Stripe Checkout Session erstellen
const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items,
    mode:'payment',
    success_url:`${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`${origin}/cart`,
})

// Wir geben nur die URL zurück, zu der der Benutzer weitergeleitet wird
return {erro:false , url: session.url}

}
catch(error){
console.error('Stripe Fehler:', error)
return {error : true , message :"Stripe-Verbindungsfehler."}
}
}
















