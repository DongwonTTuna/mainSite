import type { Handle } from "@sveltejs/kit"

// In paraglide-js v2, handle might not be needed or work differently
export const handleParaglide: Handle = async ({ event, resolve }) => {
  // For now, just pass through - paraglide v2 might handle this automatically
  return resolve(event)
}
