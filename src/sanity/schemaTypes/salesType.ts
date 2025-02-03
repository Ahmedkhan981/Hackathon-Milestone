import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";
export const saleType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Sale Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Sale Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Amount off in percentage or fixed amount",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Toggle to activate or deactivate the sale",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      isActive: "isActive",
      couponCode: "couponCode",
    },
    prepare(selection) {
      const { title, discountAmount, isActive, couponCode } = selection;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off | ${couponCode} | ${status}`,
      };
    },
  },
});
