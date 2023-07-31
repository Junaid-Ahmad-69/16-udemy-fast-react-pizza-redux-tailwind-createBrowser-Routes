import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const SearchOrder = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState();
    function handleSubmit (e){
        e.preventDefault()
        navigate(`/order/${query}`);
        setQuery("")

    }
    return (
        <form onSubmit={handleSubmit}>
            <input className="rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300
            focus:outline-none focus:ring focus:text-yellow-500 focus:ring-opacity-50


            " value={query} placeholder="search order no" onChange={e=>setQuery(e.target.value)}/>
        </form>
    )
}
