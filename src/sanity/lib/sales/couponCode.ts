export const COUPON_CODES={
  Ramadan: "RAMADAN",
  Eid: "Eid",
  End2024: "End2024",

}as const
export type CouponCode = keyof typeof COUPON_CODES;