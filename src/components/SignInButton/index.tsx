import styles from "./styles.module.scss";
import {FaGithub} from 'react-icons/fa';
import {FiX} from "react-icons/fi";
import {signin,signOut,useSession} from "next-auth/client";

export function SignInButton() {

    const [session] = useSession();

    return session ? (
        <button 
        type="button"
        className={styles.signInButton}	
        onClick={() => signOut()}
        >
           <img src={session.user.image} alt="logo"/>
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
            Entrar com Github
        </button>
    );
}