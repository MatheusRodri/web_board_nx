import { GetServerSideProps } from 'next';
import { useState } from 'react'; 
import styles from './styles.module.scss';
import Head from 'next/head'; 
import Image from "next/image";
import { getSession } from 'next-auth/client';
import firebase from '../../services/firebaseConnection';
import rocket from "../../../public/images/rocket.svg"

import { PayPalButtons } from '@paypal/react-paypal-js';


interface DonatePorps{
  user:{
    name: string;
    id: string;
    image: string; 
  }
}

export default function Donate({ user }: DonatePorps ){
  const [vip, setVip] = useState(false);

  async function handleSaveDonate(){
    await firebase.firestore().collection('users')
    .doc(user.id)
    .set({
      donate: true,
      lastDonate: new Date(),
      image: user.image
    })
    .then(()=>{
      setVip(true);
    })

  }


  return(
    <>
    <Head>
      <title>Help the platform stay online!</title>
    </Head>
    <main className={styles.container}>
      <Image src={rocket} alt="Seja Apoiador" />
      
      {vip && (
        <div className={styles.vip}>
          <img src={user.image} alt="Foto de perfil do usuario" />
          <span>Congrats you are a new support !</span>
        </div>
      )}

      <h1>Become a supporter of this project 🏆</h1>
      <h3>Contribute with only <span>R$ 1,00</span></h3>
      <strong>Appear on our home, have exclusive features.</strong>

      <PayPalButtons
        createOrder={ (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount:{
                value: '1'
              }
            }]
          })
        }}
        onApprove={ (data, actions) => {
          return actions.order.capture().then(function(details){
            console.log('Compra aprovada: ' + details.payer.name.given_name);
            handleSaveDonate();
          })
        }}

      />
      
    </main>    
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if(!session?.id){
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  } 


  const user = {
    name: session?.user.name,
    id: session?.id,
    image: session?.user.image
  }

  return{
    props:{
      user
    }
  }

}