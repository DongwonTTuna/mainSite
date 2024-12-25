import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { Metadata } from 'next'
import '@public/css/globals.css'
import 'sanitize.css'

export const metadata: Metadata = {
  title: 'DongwonTTuna',
  description: 'Introducing About @DongwonTTuna',
}

export class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
          <link href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap' rel='stylesheet' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
