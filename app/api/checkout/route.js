import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
try {
const { cartItems } = await req.json();

if (!cartItems || cartItems.length === 0) {
return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
}

const line_items = cartItems.map((item) => ({
price_data: {
    currency: 'eur',
    product_data: {
        name: item.name,
        
        images: item.image && item.image[0]?.startsWith('http') ? [item.image[0]] : [],
    },
    unit_amount: Math.round(item.price * 100),
},
quantity: item.quantity || 1,
}));

const origin = req.headers.get('origin') || 'http://localhost:3000';

const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
line_items,
mode: 'payment',

success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${origin}/cart`,
});

return NextResponse.json({ sessionId: session.id, url: session.url });
} catch (error) {
console.error('Stripe Error:', error);
return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
}
}