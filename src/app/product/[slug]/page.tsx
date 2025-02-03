import { Suspense } from "react";
import { getProductBySlug } from "../../../sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import ProductDetails from "../../components/layout/ProductDetails";

import { getActiveSaleByCouponCode } from "../../../sanity/lib/sales/getActiveSaleByCouponCode";
import { COUPON_CODES } from "../../../sanity/lib/sales/couponCode";
import { getAllProducts } from "../../../sanity/lib/products/getAllProducts";
import RecommendedProducts from "../../components/layout/RecommededProduct";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const productPromise = getProductBySlug(slug);
  const salePromise = getActiveSaleByCouponCode(
    COUPON_CODES.Ramadan as keyof typeof COUPON_CODES,
  );
  const recommendedProductsPromise = getAllProducts(1);

  const [product, sale, recommendedProducts] = await Promise.all([
    productPromise,
    salePromise,
    recommendedProductsPromise,
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <>

        <ProductDetails product={product} sale={sale || undefined} />

      <Suspense fallback={<div>Loading recommended products...</div>}>
        <RecommendedProducts products={recommendedProducts} sale={sale} />
      </Suspense>
    </>
  );
};

export default Page;
