import { AppProps } from 'next/app';
import "../styles/global.scss";
import { Header } from "../components/Header";
import { Provider as NextAuthProvider } from "next-auth/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const initialOptions = {
  "client-id":"AVixcvJrWHU5rsimyCj6GSHJhmNsRyT_T58bsJejVhY_aXmUuJ0A1o6Rvi5t0C36Pi9xVwbMu6e1WhrC",
  currency: "BRL",
  intent:"capture"
}



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp
