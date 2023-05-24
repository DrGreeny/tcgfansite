import Head from "next/head";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero";
import Spotlight from "../components/Spotlight";

export default function Home() {
  return (
    <div className={styles.container}>


      <div className="">
        <Hero />

        {/* <Spotlight /> */}
      </div>
    </div>
  );
}
