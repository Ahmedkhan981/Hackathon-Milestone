import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParams: string|undefined) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`*[_type == "product" && name match $searchParams]|order(name asc)`);
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParams:`${searchParams}*`,
      },
    });
    return products?products.data : null;
  } catch (error) {
    console.error(`search products by name error ${error}`);
    return null;
  }
}