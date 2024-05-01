import Document, { Head, Html, Main, NextScript } from 'next/document';
  
  class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
      const initialProps = await Document.getInitialProps(ctx);
  
      return initialProps;
    }
  
    render() {
      return (
        <Html>
          <Head>
            <link rel="icon" href="/favi.ico" type='image/x-icon' />
            <link rel="apple-touch-icon" href="/logo64.png" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: `
              {
                "@context": "https://schema.org",
                "@type": "Restaurant",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Sector 63",
                  "addressRegion": "Noida",
                  "postalCode": "201301",
                  "streetAddress": "C 87 First floor"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.2",
                  "reviewCount": "250"
                },
                "name": "The Barbeque Company",
                "openingHours": [
                  "Mo-Su 12:00-16:30",
                  "Mo-Su 18:30-23:30",
                ],
                "priceRange": "799",
                "telephone": "(+91) 9654396643",
                "url": "thebbq.company"
              }
            `}} />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument;