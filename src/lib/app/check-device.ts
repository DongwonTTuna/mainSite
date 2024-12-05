import { headers } from 'next/headers'

export default async function checkDevice() {
  const requestHeaders = await headers()
  const userAgent = requestHeaders.get('user-agent') || ''
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
}
