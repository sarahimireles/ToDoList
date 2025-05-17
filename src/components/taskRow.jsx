import { useState } from "react"

function TaskRow(props) {
    const [completed, setCompleted] = useState(false)

    // update task
    function handleOnComplete (event) {
        setCompleted(event.target.checked)

    }

    return (
        <div id={`item-${props.itemId}`} className={`taskRow ${completed ? "completed" : "" }`}>
            <div className="itemDetails">
                <input type="checkbox" onChange={handleOnComplete} />
                <span>{props.itemText}</span>
            </div>
            <div>
                <button aria-label="delete" onClick={() => props.onDelete(props.itemId)}>x</button>
                <button aria-label="move-up" disabled={completed} onClick={() => props.onMoveUp(props.itemId)}>⬆️</button>
                <button aria-label="move-up" disabled={completed} onClick={() => props.onMoveDown(props.itemId)}>⬇️</button>
            </div>
            
        </div>
    )
}

export default TaskRow