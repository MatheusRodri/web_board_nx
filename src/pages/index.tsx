import Head from "next/head";
import styles from "../styles/styles.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="/images/board-user.svg" alt="board" />

        <section className={styles.callToAction}>
          <h1>
            A tool to your day to day 
          </h1>
          <p>
            <span>100% free</span> and online
          </p>
        </section>

        <div className={styles.donators}>
          <img src="https://sujeitoprogramador.com/steve.png" alt="user 1" />
        </div>
      </main>
    </>
  )
}
