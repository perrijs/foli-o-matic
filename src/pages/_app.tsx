import Head from "next/head";
import type { AppProps } from "next/app";

import { LoadingProvider } from "src/contexts/loadingContext";

import "@/styles/global.css";
import { AudioProvider } from "@/contexts/audioContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/meta/favicon.png" />
        <link rel="apple-touch-icon" href="/images/meta/favicon.png" />

        <meta property="og:url" content="https://perrijs.io" />
        <meta property="og:image" content="/images/meta/share_image.jpg" />

        <meta name="twitter:image" content="/images/meta/share_image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <LoadingProvider>
        <AudioProvider>
          <Component {...pageProps} />
        </AudioProvider>
      </LoadingProvider>
    </>
  );
}
