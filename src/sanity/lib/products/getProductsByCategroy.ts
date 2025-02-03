import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (
  category: string | null,
  page: number = 1,
  pageSize: number = 10,
) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const PRODUCT_BY_CATEGORY = defineQuery(`
    *[
      _type == "product" &&
      (${category ? `references(*[_type == "category" && slug.current == $category ]._id)` : "true"})
    ][${start}...${end}]|order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY,
      params: { category },
    });
    return products?.data || [];
  } catch (error) {
    console.error(`Error fetching products by category: ${error}`);
    throw new Error("Failed to fetch products");
  }
};
