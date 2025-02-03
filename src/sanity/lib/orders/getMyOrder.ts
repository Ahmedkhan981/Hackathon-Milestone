import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getMyOrder = async (userId:string) => {
if (!userId) {
  throw new Error("User ID is required");
}
const MY_ORDER_QUERY = defineQuery(`*[_type == "order" && clerkUserId == $userId]|order(orderDate desc){
  ...,
  products[]{
    ...,
    product->
  }
}`);
try {
  const orders = await sanityFetch({
    query: MY_ORDER_QUERY,
    params: { userId },

  })
  return orders.data || [];
} catch (error) {
  console.log("Error fetching orders:", error);
  throw new Error("Failed to fetch orders");
  
}
};