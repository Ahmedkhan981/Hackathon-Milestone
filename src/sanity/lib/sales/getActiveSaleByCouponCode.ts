
import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCode";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
const Active_SALE_BY_COUPON_QUERY = defineQuery(
`*[_type == "sale" && couponCode == $couponCode && isActive == true]|order(validFrom desc)[0]`


)
try {
  const activeSale = await sanityFetch({
    query: Active_SALE_BY_COUPON_QUERY,
    params: { couponCode },
  }); ;
  return activeSale?  activeSale.data : null;
} catch (error) {
  console.error(`coupon code error ${error}`);
  return null;
}
};