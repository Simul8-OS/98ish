import {useState} from "react"

const Searchbar = ({handleFormSubmit}) => {
    const [term, setTerm] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit(term);
    }
 
    return (
        <>
        <h2 className="mt-2">YouTube '98</h2>
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