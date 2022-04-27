import Link from "next/link";
import Image from "next/image";
import styles from './styles.module.scss';
import {SignInButton} from "../SignInButton"
import Logo from "../../../public/images/logo.svg";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <a>
                    <Image src={Logo} alt='logo my board' />
                    </a>
                </Link>
                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/board">
                        <a>My board</a>
                    </Link>


                </nav>

                <SignInButton />
            </div>
        </header>
    );
}