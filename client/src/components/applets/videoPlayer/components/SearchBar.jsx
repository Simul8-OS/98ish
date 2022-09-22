import {useState} from "react"

const Searchbar = ({handleFormSubmit}) => {
    const [term, setTerm] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit(term);
    }
 
    return (
        <div className="text-center d-flex flex-column justify-content-center" style={{height: "calc(100% - 25px)"}}>
            <h2 className="mt-2">YouTube '98</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="video-search" className="lead">Video Search</label>
                        <input 
                            onChange={(e) => setTerm(e.target.value)} 
                            placeholder="Search.."
                            className="form-control-lg"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Searchbar;