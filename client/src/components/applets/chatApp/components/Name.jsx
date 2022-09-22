import React, { useState } from "react"

const Name = ({ setConfirmedName }) => {
  const [name, setName] = useState("")
  return (
    <div className="container-sm">
      <div className="row justify-content-center mt-3">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card">
            <div className="card-body">
              <div className="card-title text-center">
                <h4>Start chatting now</h4>
                <form>
                  <div className="form-floating">
                    <input
                      style={{fontWeight: 'bold', textAlign: 'center'}}
                      className="form-control"
                      type="text"
                      placeholder="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => setConfirmedName(name)}
                  >
                    Go
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Name