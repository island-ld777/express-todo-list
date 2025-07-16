import { BASE_URL } from "../App";
import { useState, useEffect } from "react";

export function ListForm() {

    const [task, setTask] = useState("");

    async function submitTask() {
        const newTask = {"task": task};
        try {
            const response = await fetch(`${BASE_URL}todos`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newTask),
            })

            if(!response.ok) {
                throw new Error("Failed to submit new Task.");
            }

            console.log("Task Successfully added!!");

        } catch (error) {
            alert(error);
        }
        finally {
            setTask("");
        }
    }

    return (
        <form onSubmit={(e) => {
            submitTask();
        }}>
            <label htmlFor="task">New Task:</label>
            <input type="text" name="task" onChange={(e) => setTask(e.target.value)}></input>
            <button type="submit">Submit Task</button>
        </form>
    );
}