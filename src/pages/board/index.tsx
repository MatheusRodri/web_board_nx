import Head from "next/head";
import styles from "./styles.module.scss";
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi';

export default function Board() {
    return (
        <>
            <Head>
                <title>My tasks</title>
            </Head>
            <main className={styles.container}>
                <form>
                    <input
                        type="text"
                        placeholder="Type your task"
                    />
                    <button type="submit">
                        <FiPlus size={25} color="#17181f" />;
                    </button>
                </form>

                <h1>
                    You have 2 tasks
                </h1>
                <section>
                    <article className={styles.tasklist}>
                        <p>Learn how to create apps </p>
                        <div className={styles.actions}>
                            <div>
                                <div>
                                    <FiCalendar size={20} color="#ffb800" />
                                    <time>17 July 2022</time>
                                </div>
                                <button>
                                    <FiEdit2 size={20} color="#FFF" />
                                    <span>Editar</span>
                                </button>
                            </div>
                            <button>
                                <FiTrash size={20} color="#ff3636" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </article>
                </section>
            </main>
            <div className={styles.vipContainer}>
                <h3> Thank you for using our app </h3>
                <div>
                    <FiClock size={28} color="#fff"/>
                    <time>
                        Last donate was to 3 days ago
                    </time>
                </div>
            </div>
        </>
    )
}