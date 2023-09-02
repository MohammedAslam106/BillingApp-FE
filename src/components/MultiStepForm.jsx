/* eslint-disable react/prop-types */
import { useState } from "react";
import StepStatusIndicator from "./StepStatusIndicator";

export function MultiFormFunctionality(steps){
    const [currentIndex,setCurrentIndex]=useState(0)
    const goto=(ind)=>{
        setCurrentIndex(ind)
    }
    const next=()=>{
        if( currentIndex<steps.length-1){
            setCurrentIndex((prev)=>prev+1)
        }
    }
    const prev=()=>{
        if(currentIndex>0){
            setCurrentIndex((prev)=>prev-1)
        }
    }

    return{
        goto,
        next,
        prev,
        currentIndex,
        setCurrentIndex
    }
}

// eslint-disable-next-line react/prop-types
export default function MultiStepForm({steps}){
    const {goto,next,prev,currentIndex}=MultiFormFunctionality(steps)
    return (
        <>
            <div onKeyDown={(e)=>{
                e.key=="ArrowRight"?next():e.key=="ArrowLeft" && prev()
            }}>

            <div>
                {steps[currentIndex]}
            </div>
            <div className=" flex justify-around items-center mt-2 ">
                <button onKeyDown={(e)=>{
                    if(e.key=="ArrowLeft"){
                        console.log(e.key)
                        prev()
                    }
                }} className=" py-1 px-3 rounded shadow-sm bg-gray-300 hover:bg-gray-200" onClick={prev}>Prev</button>
                <StepStatusIndicator goto={goto} currentStep={currentIndex} totalSteps={steps.length}/>
                <button onKeyDown={(e)=>{
                    if(e.key=="ArrowRight"){
                        console.log(e.key)
                        next()
                    }
                }} className=" py-1 px-3 rounded shadow-sm bg-gray-300 hover:bg-gray-200" onClick={next}>Next</button>
            </div>
            </div>
        </>
    )
}