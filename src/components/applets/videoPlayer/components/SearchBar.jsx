import {useState} from "react"

const Searchbar = ({handleFormSubmit}) => {
    const [term, setTerm] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit(term);
    }
 
    return (
        <>
        <h2>This isn't youtube I swear</h2>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="video-search">Video Search</label>
                    <input onChange={(e) => setTerm(e.target.value)} placeholder="Search.."/>
                </div>
            </form>
        </div>
        </>
    )
}
export default Searchbar;