// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import "server-only";
import { defineLive } from "next-sanity";
import { client } from './client'

const token =
  process.env.SANITY_API_READ_TOKEN ||
  "skqWj0iqyvQgwnF8yWD3Fil6FzxBffgxpsRpKftWSGzVemGFbKTzr1abc6U0xHvv0bRFIWc3ciYUxaIX3bXVSyBftmBrKBCPq6r563CzUOWnEXm3lqgBf0vcuzVGVWzuq7FVdAqashQzCaIcmhOhao2V46pld4xk0bvtCy5RCnvq5ZoC1c99";
if(!token){
throw new Error (`Missing environment variable: SANITY_API_READ_TOKEN`)
};
export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken:token,
  browserToken:token,
  fetchOptions:{
    revalidate:0
  }
})
