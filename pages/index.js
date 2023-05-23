import Head from "next/head";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero";
import Spotlight from "../components/Spotlight";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fansite for Speak TCG</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <Hero />

        {/* <Spotlight /> */}
      </div>
    </div>
  );
}
