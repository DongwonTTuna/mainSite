import '@public/css/globals.css'
import 'sanitize.css'

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export const runtime = 'edge'
