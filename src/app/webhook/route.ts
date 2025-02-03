import { headers } from "next/headers";
import { backendClient } from "../../sanity/lib/backendClient";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import stripe from "../../lib/stripe";
import { Metadata } from "action/createCheckoutSession";

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const headersList = await headers();
  const sign = headersList.get("stripe-signature");

  if (!sign) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 },
    );
  }

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET ||
    "whsec_25f57f1a051b350806c367eb92ce9ab18ec064115153254cfad69c4d4b580f7f";
  if (!webhookSecret) {
    console.log("⚠️ Missing webhook secret");
    return NextResponse.json(
      { error: "Missing webhook secret" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sign, webhookSecret);
  } catch (error) {
    console.error(`❌ Invalid webhook signature: ${(error as Error).message}`);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log(`✅ Order created in Sanity:`, order);
    } catch (error) {
      console.error(
        `❌ Error creating order in Sanity: ${(error as Error).message}`,
      );
      return NextResponse.json(
        { error: "Error creating order in Sanity" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
};

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  // ✅ Ensure metadata exists
  if (!metadata) {
    throw new Error("Missing metadata in Stripe session.");
  }

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as Metadata;

  // ✅ Get `stripeCustomerId` (if available)
  const stripeCustomerId = customer || metadata.stripeCustomerId || null;

  // ✅ Fetch line items with product references
  const listLineWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const sanityProducts = listLineWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata.id,
    },
    quantity: item.quantity || 0,
  }));

  // ✅ Create order in Sanity
  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId, // ✅ Ensure `stripeCustomerId` is stored
    clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalAmount: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
