import { useNavigate } from "react-router-dom"
import AddButton from "../components/AddButton"

export default function PageNotFound(){
    const navigate=useNavigate()
    return(
        <>
            <div className=" min-h-screen min-w-[100vw] grid place-items-center">
                <div className=" flex flex-col justify-center items-center rounded shadow-lg  p-10">
                    <h1 className=" font-bold text-2xl">Oops!</h1>
                    <h1 className=" font-bold text-2xl">404 Page not found</h1>
                    <p>The requested page does not exist</p>
                    <button type="button" onClick={()=>navigate(-1)} className=" font-bold mt-5 bg-blue-400 rounded shadow-sm text-white py-3 px-4">Go Back</button>
                </div>
            </div>
            <AddButton/>
        </>
    )
}