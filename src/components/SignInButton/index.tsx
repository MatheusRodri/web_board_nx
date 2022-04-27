import styles from "./styles.module.scss";
import {FaGithub} from 'react-icons/fa';
import {FiX} from "react-icons/fi";
import {signin,signOut,useSession} from "next-auth/client";
import Image from "next/image";

export function SignInButton() {

    const [session] = useSession();

    return session ? (
        <button 
        type="button"
        className={styles.signInButton}	
        onClick={() => signOut()}
        >
            <div>
           <Image objectFit="fill" width={35} height={35} src={session.user.image} alt="logo"/>
           </div>
            Olá {session.user.name}
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ):(
        <button 
        type="button"
        className={styles.signInButton}	
        onClick={() => signin('github')}
        >
            <FaGithub color="#ffb800"/>
            Sign in with GitHub
        </button>
    );
}