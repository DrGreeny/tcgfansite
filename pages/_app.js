import Layout from "../components/Layout";
import "../styles/globals.css";
import { AccountProvider } from "../components/contexts/AccountContext";

function MyApp({ Component, pageProps }) {
  return (
    <AccountProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AccountProvider>
  );
}

export default MyApp;
