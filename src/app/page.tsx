import type React from "react";
import ProductView from "./components/layout/ProductView";
import { getAllCategories } from "../sanity/lib/products/getAllCategories";
import SaleBanner from "./components/layout/SaleBanner";
import { getActiveSaleByCouponCode } from "../sanity/lib/sales/getActiveSaleByCouponCode";
import { COUPON_CODES } from "../sanity/lib/sales/couponCode";

export const dynamic = "force-static";
export const revalidate = 60;
const Home: React.FC = async () => {
  const categoriesPromise = getAllCategories();
  const salePromise = getActiveSaleByCouponCode(
    COUPON_CODES.Ramadan as keyof typeof COUPON_CODES,
  );


  const [categories, sale] = await Promise.all([
    categoriesPromise,
    salePromise,
  ]);

  return (
    <>
      <SaleBanner />
      <div className="flex flex-col items-center justify-top min-h-screen p-4 bg-gray-300 pt-12">
        <ProductView categories={categories} sale={sale} />
      </div>
    </>
  );
};

export default Home;
