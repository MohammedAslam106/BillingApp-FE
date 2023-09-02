import { useState } from "react"
import { allClassNames } from "../utils"

// eslint-disable-next-line react/prop-types
export default function Toggel({options,classNames,onChange,onChanged}){
    const [currentUnit,setCurrentUnit]=useState(0)
    return(
        <>
            <button type="button" onClick={()=>{
              // eslint-disable-next-line react/prop-types
              const index= currentUnit==options.length-1 ? 
               0:currentUnit+1
               setCurrentUnit(index)
               onChange((prev)=>{return{unit:options[index],value:prev.value}})
            }}
            className={allClassNames('text-sm  min-w-6 rounded shadow-sm bg-gray-600 text-white font-semibold',classNames)}
            >
                {onChanged?onChanged:options[currentUnit]}
            </button>
        </>
    )
}