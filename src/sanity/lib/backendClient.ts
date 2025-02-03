import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:
    process.env.SANITY_API_TOKEN ||
    "skjp1s4Kb8v5841gS0IVZfCXQ8rqgaxMYPGcaRwFXGzl9SAPZANkE1xYVeGfXeTjR6iSIplZLUV00RzyxFPDoDAcaqFAW4X7SeCjp5VXOM1QrI5WsKVI8kvMO7NwHVzYsUT5rTEDZGie4NMobZvOB8OFH2f88XeF3zzBIzymR9trusXMdLDe",
});
