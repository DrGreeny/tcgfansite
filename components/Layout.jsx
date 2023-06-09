import Navigation from "./Navigation";
import Footer from "./Footer";
import Head from "next/head";
const Layout = ({ children }) => {
  return (
    <div className="bg-black">
      <Head>
        <title>Fansite for Speak TCG</title>
        <meta name="description" content="May the words be with you!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navigation />
      </header>
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
