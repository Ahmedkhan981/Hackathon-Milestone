import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";


export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qwbwdhl8", // 🔹 Replace with your actual Sanity project ID
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-01",
});

const builder = ImageUrlBuilder(sanityClient);

export const imageUrl = (source: SanityImageSource) => {
  return builder.image(source);
};
