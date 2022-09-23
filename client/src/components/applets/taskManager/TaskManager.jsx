const TaskManager = ({dispatch, windows}) => {
    return (
        <div style={{height: 'calc(100% - 25px)', overflowY: 'scroll', overflowX: 'hidden'}}>
            <div className="container">
                <button className="lead killSwitch mt-1" onClick={() => {
                            dispatch({
                                type: "end_all"
                                })
                        }}>End All Processes</button>
                {windows && windows.map((window, index) => {
                    return (
                        <div key={index} className="container d-flex justify-content-between align-items-center">
                            {window.closed === false && window.name != "Task Manager" &&
                            <>
                            <div className="lead my-1">{window.name}</div>
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
        </div>
    )
}

export default TaskManager