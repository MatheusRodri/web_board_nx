import { GetStaticProps } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/styles.module.scss";
import firebase from "../services/firebaseConnection";
import boarUser from "../../public//images/board-user.svg";

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image:string;
}


interface HomeProps{
  data:string;
}

export default function Home({data}) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data)); 


  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <Image src={boarUser} alt="board" />

        <section className={styles.callToAction}>
          <h1>
            A tool to your day to day 
          </h1>
          <p>
            <span>100% free</span> and online
          </p>
        </section>

        {donaters.length !== 0 && <h3>Apoiadores : </h3>}
        <div className={styles.donators}>
          {donaters.map(item=>(
            <img key={item.image} src={item.image} alt="user 1" />
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async()=>{

  const donaters = await firebase.firestore().collection('users').get();

  const data  = JSON.stringify(donaters.docs.map(doc => {
    return{
      id: doc.id,
      ...doc.data(),
    }
  }))
  return{
    props:{
      data,
    },
    revalidate:60 * 60
  }
}
