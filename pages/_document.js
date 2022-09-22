import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name="description" content="Best Footwear Store" />
        <link rel='icon' href='/favicon.ico' />

        <link rel='preconnect' href='https://cdn.snipcart.com' />
        <link
          rel='stylesheet'
          href='https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css'
        />
        <script
          src='https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js'
          async
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div
          id='snipcart'
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
          data-config-modal-style='side'
          hidden
        />
      </body>
    </Html>
  )
}
