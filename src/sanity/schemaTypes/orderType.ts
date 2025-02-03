import { defineField, defineType, defineArrayMember } from "sanity";
import { BasketIcon } from "@sanity/icons";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(100)
          .error("Clerk User ID should be between 3 and 100 characters."),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(100)
          .error("Customer name should be between 3 and 100 characters."),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .email()
          .error("Please enter a valid email address for the customer."),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(100)
          .error("Payment Intent ID should be between 3 and 100 characters."),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
            }),
            defineField({
              name: "discountAmount",
              title: "Discount Amount",
              type: "number",
              description: "Discount applied to this product in USD",
            }),
            defineField({
              name: "finalPrice",
              title: "Final Price",
              type: "number",
              description: "Final price of the product after discount in USD",
            }),
            defineField({
              name: "savedAmount",
              title: "Saved Amount",
              type: "number",
              description: "Total amount saved due to discount in USD",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
              finalPrice: "finalPrice",
              discountAmount: "discountAmount",
            },
            prepare({
              product,
              quantity,
              image,
              currency,
              finalPrice,
              discountAmount,
            }) {
              return {
                title: `${product} x ${quantity}`,
                subtitle: `${quantity} x ${finalPrice} ${currency} (Discount: ${discountAmount} ${currency})`,
                media: image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (Rule) =>
        Rule.required().error("Please select the order status."),
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Order date is required."),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalAmount",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare({ name, amount, currency, orderId, email }) {
      const orderIdSnippet = orderId
        ? `${orderId.slice(0, 5)}...${orderId.slice(-5)}`
        : "N/A";
      return {
        title: `${name || "Unknown Customer"} (${orderIdSnippet})`,
        subtitle: `${email || "No Email"} - ${amount || 0} ${currency || ""}`,
        media: BasketIcon,
      };
    },
  },
});
