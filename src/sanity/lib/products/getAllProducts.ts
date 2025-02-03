import { client } from "../client";

export async function getAllProducts(
  page: number,
  limit: number = 10,
  categoryId?: string | null,
) {
  const offset = (page - 1) * limit;
  const categoryFilter = categoryId ? `&& references("${categoryId}")` : "";

  const query = `*[_type == "product" ${categoryFilter}] | order(_createdAt desc) [${offset}...${offset + limit}]`;
  return await client.fetch(query);
}
