import { Product, Sale } from "../../../../sanity.types";
import ClientSideCarousel from "./ClientSideCarousel";

export default async function RecommendedProducts({
  products,
  sale,
}:{
  products: Product[];
  sale: Sale | null;
}) {
  // Receive products and sale as props
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Recommended Products
      </h2>
      <ClientSideCarousel products={products} sale={sale} />
    </div>
  );
}
