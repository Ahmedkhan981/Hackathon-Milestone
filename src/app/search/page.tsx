import ProductView from "../components/layout/ProductView";
import { searchProductsByName } from "../../sanity/lib/products/searchProductsByName";
import { Category, Product, Sale } from "../../../sanity.types";
import { getActiveSaleByCouponCode } from "../../sanity/lib/sales/getActiveSaleByCouponCode";
import { COUPON_CODES } from "../../sanity/lib/sales/couponCode";
import { getAllCategories } from "../../sanity/lib/products/getAllCategories";


const SearchPage= async({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const {query}=await searchParams
  const products: Product[] = (await searchProductsByName(query)) || [];
  const categories:Category[] = await getAllCategories();
  const sale:Sale|null= await getActiveSaleByCouponCode(COUPON_CODES.Ramadan as keyof typeof COUPON_CODES); // Explicit cast
  
  if(!products?.length){
    return (
      <div className="flex flex-col items-center justify-top min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full text-center font-bold mb-6">
          No products found for: {query}
        </div>
        <div className="text-gray-600">
          Try searching with different keywords.
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col items-center justify-top min-h-screen p-4 bg-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-500">Search result for ${query}</h1>
        <ProductView  categories={categories} sale={sale} />
      </div>
    </>
  );
};

export default SearchPage;