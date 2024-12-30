import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
  const { items, email } = await req.json();

  const customer = await stripe.customers.create({
    email: email,
  });

  const line_items = items.map(
    (item: {
      name: string;
      imageUrl: string;
      price: number;
      quantity: number;
    }) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })
  );

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer: customer.id,
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
