// src/lib/stripe.ts
import Stripe from "stripe";


if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing environment variable: STRIPE_SECRET_KEY");
}

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51Qln8DLNVHWcBy2Rv67kNZ0Ay8vgRrkRp2gqMqK0kKtnFidHeGdm6iAD7jkRx5pxF5veAQB5TwG1yNe0anNeCeow00E1kSpVDw",
  {
    apiVersion: "2025-01-27.acacia",
  },
);

export default stripe;
