import type { Metadata } from 'next'
import '@public/css/globals.css'
import 'sanitize.css'

export const metadata: Metadata = {
  title: 'DongwonTTuna',
  description: 'Introducing About @DongwonTTuna'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap' rel='stylesheet' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>{children}</body>
    </html>
  )
}

export const runtime = 'edge'
