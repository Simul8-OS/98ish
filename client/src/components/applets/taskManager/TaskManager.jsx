const TaskManager = ({dispatch, windows}) => {
    return (
        <div className="container mt-1">
            <button className="lead killSwitch" onClick={() => {
                           dispatch({
                               type: "end_all"
                             })
                       }}>End All Processes</button>
            {windows && windows.map((window, index) => {
                return (
                    <div key={index} className="container d-flex justify-content-between align-items-center">
                        {window.closed === false && window.name != "Task Manager" &&
                        <>
                        <div className="lead">{window.name}</div>
                        <button className="lead" onClick={() => {
                           
                            dispatch({
                                type: "close_window",
                                payload: { name: window.name, index },
                              })
                        }}>End</button>
                        </>
                        }
                    </div>
                )})
            }
        </div>
    )
}

export default TaskManager