import Document, { Html, Head, Main, NextScript } from 'next/document';
// https://simplernerd.com/add-google-analytics-to-next-js-application/
const gtag = `https://www.googletagmanager.com/gtag/js?id=G-KL3DBL6C33`;
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script async src={gtag} />
          <script 
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KL3DBL6C33', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
        <link href="https://tokenshit.xyz/fonts/stylesheet.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
