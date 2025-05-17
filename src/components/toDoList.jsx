import { useEffect, useState } from "react"
import TaskRow from "./taskRow"

function ToDoList() {

    // list of tasks
    const [tasks, setTasks] = useState([])
    
    // task
    const [newTask, setNewTask] = useState("")

    // display new task
    function handleOnInputChange (event) {
        setNewTask(event.target.value)
    }

    // add new task
    function handleOnInputEnter (event) {
        if(event.key === "Enter") {
            const numero = tasks.length + 1
            setTasks(prevTasks => [
                ...prevTasks,
                {
                    itemId: numero, 
                    itemText: newTask
                }
            ])

            setNewTask("")
        }
    }

    // delete a task
    function handleOnDelete (itemId) {
        const filteredTasks = tasks.filter((task) => task.itemId !== itemId)
        setTasks(filteredTasks)
    }

    // move a task
    function handleOnMoveUp(itemId) {
        const indexToMove = tasks.findIndex((t) => t.itemId === itemId)
        if(indexToMove === 0) {
            return
        }

        const prev = tasks.at(indexToMove - 1)
        const nodeToMove = tasks.at(indexToMove)
        
        let tasksCopy = [...tasks]
        tasksCopy.splice(indexToMove - 1, 1, nodeToMove)
        tasksCopy.splice(indexToMove, 1, prev)

        setTasks(tasksCopy)

    }

    function handleOnMoveDown(itemId) {
        const indexToMove = tasks.findIndex((t) => t.itemId === itemId)
        if(indexToMove === tasks.length - 1) {
            return
        }

        const prev = tasks.at(indexToMove + 1)
        const nodeToMove = tasks.at(indexToMove)
        
        let tasksCopy = [...tasks]
        tasksCopy.splice(indexToMove + 1, 1, nodeToMove)
        tasksCopy.splice(indexToMove, 1, prev)

        setTasks(tasksCopy)
    }
    

    useEffect(() => {
        console.log(tasks)
    }, [tasks])


    return (
        <div>
            <input 
                id="new-task"
                value={newTask}
                onChange={handleOnInputChange}
                onKeyUp={handleOnInputEnter}
                type="text"
            />
            <div className="pt-lg">
                {tasks.map((t, i) => 
                    <TaskRow 
                        key={`task-row-${i}`} 
                        itemId={t.itemId}
                        itemText={t.itemText} 
                        onDelete={handleOnDelete}
                        onMoveUp={handleOnMoveUp}
                        onMoveDown={handleOnMoveDown}
                    />
                )}
            </div>
        </div>
    )

}

export default ToDoList