import HeaderSkeleton from "./components/Skeleton/HeaderSkeleton";
import SaleBannerSkeleton from "./components/Skeleton/SaleBannerSkeleton";
import ProductCardSkeleton from "./components/Skeleton/ProductCardSkeleton";

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <SaleBannerSkeleton />
      <div className="flex flex-col items-center justify-top min-h-screen p-4 bg-gray-300 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
