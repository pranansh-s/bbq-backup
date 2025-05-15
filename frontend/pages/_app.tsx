import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Head from 'next/head';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader';
import { pageview } from '../utils/analytics';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    pageview();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startLoading = () => {
      timeoutId = setTimeout(() => {
        setIsLoading(true);
      }, 500);
    };
    const stopLoading = () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    router.events.on('routeChangeError', stopLoading);

    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
      router.events.off('routeChangeError', stopLoading);
      clearTimeout(timeoutId);
    };
  }, [router.events]);

  return (
    <>
    {isLoading ? <Loader/> :
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Head>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar" content="#000000" />
        <meta name="google-site-verification" content="6L9FeK2U8BXy6-QlyDNx0LjAyjJ9JGE2TYBHlduYWBc" />
        <title>The Barbeque Company - Best barbeque food buffet in town</title>
      </Head>
      <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}></Script>
      <Component {...pageProps} />
    </LocalizationProvider>}
    </>
)}


export default MyApp;