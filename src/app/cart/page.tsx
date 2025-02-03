import { COUPON_CODES } from "@/sanity/lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import OrderClient from '../components/layout/CartClient';




const Order = async () => {
  const sale = await getActiveSaleByCouponCode(
    COUPON_CODES.Ramadan as keyof typeof COUPON_CODES,
  ); // Explicit cast

  
  return (
    <>
      <OrderClient sale={sale} />
    </>
  );
};

export default Order;
