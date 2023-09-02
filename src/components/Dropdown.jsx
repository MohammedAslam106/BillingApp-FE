/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react"
// import { allClassNames } from "../utils"

// /* eslint-disable react/prop-types */
// // eslint-disable-next-line no-unused-vars
// export default function Dropdown({className,placeholder,options,selectedOption,displaySelcetedOption,onSlectionChange}){
//     const [showDropdown,setShowDropdown]=useState([])
//     const [visibleDd,setVisibleDd]=useState(false)

//     useEffect(()=>{
//         setShowDropdown(options)
        
//     },[])
//     return(
//         <>
//             <div onMouseLeave={()=>setVisibleDd(false)} className=" relative">
//                 {/* <input  placeholder={placeholder} className=" py-2 px-3 rounded shadow-sm border border-gray-300" type="text" name="" id="" /> */}
//                 {/* <select placeholder={placeholder} className={allClassNames(className)} onChange={(e)=>{
//                     console.log(JSON.parse(e.target.value))
//                     selectedOption(JSON.parse(e.target.value))}} name="" id="">
//                     <option value="aslam">aslam</option>
//                     {options?.map((opt,ind)=>{
//                         return(
//                             <option value={JSON.stringify(opt)} key={ind}>
//                                 {opt.name}
//                             </option>
//                         )
//                     })}
//                 </select> */}
//                 <div  className="">
//                     <input value={displaySelcetedOption?.name} placeholder={placeholder} onMouseOver={()=>setVisibleDd(true)} onChange={(e)=>{
//                         setShowDropdown(options.filter((option,ind)=>{
//                             return option.name.toLowerCase().includes(e.target.value)
//                         }))
//                     }} className=" rounded py-2 px-3 border border-gray-400 shadow-sm text-gray-400" type="text" name="" id="" />
//                 </div>

//                 {visibleDd && <ul className=" z-10 h-24 overflow-y-scroll absolute bg-white rounded shadow-sm w-full">
//                     {showDropdown?.map((opt,ind)=>{
//                        return( <li className=" py-2 px-3" key={ind}>
//                             <button onClick={()=>{
//                                 selectedOption(opt)
//                                 setVisibleDd(false)
//                                 onSlectionChange?.(opt)
//                                 }} className=" text-left w-full font-semibold ">{opt.name}</button>
//                         </li>)
//                     })}
//                 </ul>}
//             </div>
//         </>
//     )
// }



import { useCallback, useState } from "react";

const Dropdown = ({
  options = [],
  limit = 3,
  initialSearchText = "",
  label = (item) => (typeof item === "string" ? item : item?.label),
  match = (item, searchText) =>{
   return label(item).trim().toLowerCase().includes(searchText.trim().toLowerCase())
  },
  className = "",
  placeholder = "",
  onSearchChange,
  onSelectionChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState(initialSearchText);
  const [items, setItems] = useState(options);

  const handleOnSearchChange = useCallback(
     (searchText) => {
      const filteredItems =
        options.filter((item) => {
            return match(item?.name, searchText)});
      setItems(filteredItems);
    },
    [ match, options]
  );

  return (
    <div className={"relative inline-block " + className}>
      <input
        type="text"
        value={searchText}
        placeholder={placeholder}
        onClick={() => setShowDropdown(!showDropdown)}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleOnSearchChange(e.target.value);
          onSearchChange?.(e.target.value);
        }}
        className="appearance-none h-10 block w-full border border-gray-400 rounded py-2 px-4 text-sm hover:bg-gray-50 focus:outline-none focus:bg-white focus:ring-primary-500"
      />
      <div
        // style={{overflow:'auto'}}
        hidden={!showDropdown}
        //absolute has been removed from the bottom line
        className="origin-top-left overflow-auto absolut z-40 left-0 mt-1 w-full rounded-md shadow-xl border "
      >
        <div className="rounded-md bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-height-dropdown">
            {items.slice(0,limit).map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => {
                  setSearchText(label(item?.name));
                  setShowDropdown(false);
                  onSelectionChange?.(item);
                }}
                className="w-full block px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              >
                {label(item?.name)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;