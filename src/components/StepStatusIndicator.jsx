
// eslint-disable-next-line react/prop-types
export default function StepStatusIndicator({goto,totalSteps,currentStep}){
    return(
        <>
            <div>
                <ol className="flex items-center space-x-5">
                    {Array(totalSteps).fill(0).map((_,ind)=>{
                        return(
                        <li key={ind}>
                            {ind<currentStep ? 
                            <button onClick={()=>goto(ind)} className="   w-5 h-5 rounded-full shadow-sm">
                                <span className="flex justify-center items-center w-full h-ful rounded-full">
                                    <span className="  w-2.5 h-2.5 bg-blue-600 hover:bg-blue-300 rounded-full"/>
                                </span>
                            </button> :ind==currentStep ? 
                            <button className="w-5 h-5">
                                <span className="flex justify-center items-center w-full h-full bg-blue-300 rounded-full">
                                    <span className="  w-2.5 h-2.5 bg-blue-600 rounded-full"/>
                                </span>
                            </button>: 
                            <button onClick={()=>goto(ind)} className="  w-5 h-5 rounded-full shadow-sm">
                                <span className="flex justify-center items-center w-full h-full rounded-full">
                                    <span className="  w-2.5 h-2.5 bg-gray-400 hover:bg-gray-300 rounded-full"/>
                                </span>
                            </button>}
                        </li>
                        )
                    })}

                </ol>
            </div>
        </>
    )
}