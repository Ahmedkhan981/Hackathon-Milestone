import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug]|order(name asc)[0]
  `);

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    return product ? product.data : null;
  } catch (error) {
    console.error("Error fetching the product: " + error);
    return null;
  }
};
