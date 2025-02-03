"use server";

import { BasketItem } from "@/store/store";
import stripe from "@/lib/stripe";
import { imageUrl } from "@/lib/imageUrl";

export type Metadata = {
  orderNumber: string; // UUID or unique order identifier
  customerName: string; // Customer's name
  customerEmail: string; // Customer's email
  clerkUserId: string; // Clerk user ID
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

/**
 * Converts Sanity block content into a plain text string.
 * @param blocks An array of blocks from Sanity
 * @returns A plain text string
 */
function blocksToPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata,
) {
  try {
    // Check for items without a price
    const itemWithoutPrice = items.find((item) => !item.product.price);
    if (itemWithoutPrice) {
      throw new Error(`Item "${itemWithoutPrice.product.name}" has no price.`);
    }

    // 🔹 Ensure the customer exists in Stripe
    let customerId: string | null = null;
    const existingCustomers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: metadata.customerEmail,
        name: metadata.customerName,
        metadata: { clerkUserId: metadata.clerkUserId },
      });
      customerId = newCustomer.id;
    }

    // Base URL setup
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.BASE_URL}`;
    console.log("Base URL:", baseUrl);

    // 🔹 Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: customerId ? undefined : metadata.customerEmail,
      customer: customerId || undefined, // ✅ Ensures Stripe Customer linking
      metadata: {
        ...metadata,
        stripeCustomerId: customerId, // ✅ Store in metadata for webhook
      },
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/order`,
      line_items: items.map((item) => {
        // Convert description from Sanity block content
        let description = item.product.description || "";
        if (typeof description !== "string" && Array.isArray(description)) {
          description = blocksToPlainText(description);
        }

        return {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(item.product.price! * 100),
            product_data: {
              name: item.product.name || "Untitled Product",
              images: item.product.image
                ? [imageUrl(item.product.image).url()]
                : [],
              description, // now a plain string
              metadata: { id: item.product._id },
            },
          },
          quantity: item.quantity,
        };
      }),
    });

    return session.url;
  } catch (error) {
    console.error("⚠️ Error creating checkout session:", error);
    throw error;
  }
}
