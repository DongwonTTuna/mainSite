import type { Metadata } from 'next'
import '@public/css/globals.css'
import 'sanitize.css'

export const metadata: Metadata = {
  title: '@DongwonTTuna',
  description: 'Introducing About @DongwonTTuna',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  )
}

export const runtime = 'edge'
