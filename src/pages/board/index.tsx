import { useState, FormEvent } from "react"
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Link from "next/link";

import styles from "./styles.module.scss";
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from 'react-icons/fi';
import { DonateButton } from "../../components/DonateButton";
import firebase from "../../services/firebaseConnection";

import { format, formatDistance } from "date-fns";
import { ptBR } from 'date-fns/locale';


type TaskList = {
    id: string;
    created: string | Date;
    createdFormated?: string;
    task: string;
    userId: string;
    name: string;
}


interface BoardProps {
    user: {
        id: string,
        name: string,
        vip: boolean,
        lastDonate: string | Date,
    }
    data: string;
}

export default function Board({ user, data }: BoardProps) {

    const [input, setInput] = useState("");
    const [tasksList, setTasksList] = useState<TaskList[]>(JSON.parse(data));
    const [taskEdit, setTaskEdit] = useState<TaskList | null>(null);

    async function handleAddTask(e: FormEvent) {
        e.preventDefault();

        if (input == "") {
            alert("Please, type the input of task");
            return;
        }

        if (taskEdit) {
            await firebase.firestore().collection("tasks").doc(taskEdit.id).update({
                task: input
            })
                .then(() => {
                    let data = tasksList;
                    let taskIndex = tasksList.findIndex(item => item.id === taskEdit.id);
                    data[taskIndex].task = input;

                    setTasksList(data);
                    setTaskEdit(null);
                    setInput("");
                })
            return;
        }

        await firebase.firestore().collection("tasks")
            .add({
                created: new Date(),
                task: input,
                userId: user.id,
                name: user.name,
            })
            .then((doc) => {
                console.log("UHULL");
                let data = {
                    id: doc.id,
                    created: new Date(),
                    createdFormated: format(new Date(), "dd MMMM yyyy"),
                    task: input,
                    userId: user.id,
                    name: user.name,
                };

                setTasksList([...tasksList, data]);
                setInput("");
            })
            .catch((error) => {
                console.log("Error ", error);
            })

    }

    async function handleDelete(id: string) {
        await firebase.firestore().collection("tasks").doc(id).delete()
            .then(() => {
                alert("Task delete with success");
                let taskDeleted = tasksList.filter(item => {
                    return (item.id !== id)
                })

                setTasksList(taskDeleted);
            })
            .catch((error) => {
                alert("Erro ao deletar tarefa");
            })
    }

    function handleEditTask(task: TaskList) {
        setTaskEdit(task);
        setInput(task.task);

    }

    function handleCancelEdit() {
        setInput("");
        setTaskEdit(null);
    }

    return (
        <>
            <Head>
                <title>My tasks</title>
            </Head>
            <main className={styles.container}>

                {taskEdit && (
                    <span className={styles.warnText}>
                        <button onClick={handleCancelEdit}>
                            <FiX size={30} color="#ff3636" />
                        </button>
                        You are editing a task
                    </span>
                )}

                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder="Type your task"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit">
                        <FiPlus size={25} color="#17181f" />
                    </button>
                </form>

                <h1>
                    You have {tasksList.length}{tasksList.length > 1 ? " tasks" : " task"}
                </h1>
                <section>
                    {tasksList.map(task => (
                        <article key={task.id} className={styles.tasklist}>
                            <Link href={`/board/${task.id}`}>
                                <p>{task.task}</p>
                            </Link>
                            <div className={styles.actions}>
                                <div>
                                    <div>
                                        <FiCalendar size={20} color="#ffb800" />
                                        <time>{task.createdFormated}</time>
                                    </div>
                                    {user.vip && (
                                        <button onClick={() => handleEditTask(task)}>
                                            <FiEdit2 size={20} color="#FFF" />
                                            <span>Edit</span>
                                        </button>
                                    )}
                                </div>
                                <button onClick={() => handleDelete(task.id)}>
                                    <FiTrash size={20} color="#ff3636" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </main>


            {user.vip && (
                <div className={styles.vipContainer}>
                    <h3> Thank you for using our app </h3>
                    <div>
                        <FiClock size={28} color="#fff" />
                        <time>
                            Last donate was to {formatDistance(new Date(user.lastDonate), new Date(), { locale: ptBR })}
                        </time>
                    </div>
                </div>
            )}
            <DonateButton />
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req });

    if (!session?.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const tasks = await firebase.firestore().collection("tasks")
        .where("userId", "==", session?.id)
        .orderBy("created", "asc").get()

    const data = JSON.stringify(tasks.docs.map(itemDoc => {
        return {
            id: itemDoc.id,
            createdFormated: format(itemDoc.data().created.toDate(), "dd MMMM yyyy"),
            ...itemDoc.data()
        }
    }))


    const user = {
        name: session?.user.name,
        id: session?.id,
        vip: session?.vip,
        lastDonate: session?.lastDonate
    }

    return {
        props: {
            user,
            data
        }
    }
}