/* eslint-disable react/prop-types */
// import Dropdown from "../Dropdown";
// import { TbX } from "react-icons/tb";
import { useFetch } from "../../context/FetchContext";

// eslint-disable-next-line react/prop-types
export function NewProduct({products,onProductChange,onQuantityChange,onRateChange,product,quantity,rate}){
    return(
        <>
            <div className="flex w-full justify-center items-center gap-2">
                {/* <Dropdown 
                options={products} 
                onSelectionChange={(item)=>onProductChange(item)}
                initialSearchText={product?.name}
                placeholder={'Product'} 
                className={'w-full'}
                /> */}
                <select onChange={(e)=>{
                    onProductChange(JSON.parse(e.target.value))}} size={1} name="product" className=" w-full rounded shadow-sm py-2 px-2 border border-gray-800 text-gray-500" >
                    <option >--Choose one</option>
                    {products.map((product,ind)=>{
                        return(
                        <option className=" border" key={ind} value={JSON.stringify(product)}>{product?.name}</option>
                        )
                    })}
                </select>
                <div className="relative">
                    <input
                    type="number"
                    className="border border-gray-600 p-1.5 w-24 mobile:w-16 rounded shadow"
                    value={quantity}
                    onChange={(e) => onQuantityChange(e.target.value)}
                    />
                    {product && (
                    <span className="absolute right-1 top-1.5 p-1.5 text-xs bg-gray-500 text-white rounded">
                        {product?.specialCalculations?.sellingUnit}
                    </span>
                    )}
                </div>
                <input
                    type="number"
                    className="border border-gray-600 p-1.5 w-24 mobile:w-16 rounded shadow"
                    placeholder="Amount"
                    value={rate}
                    onChange={(e) => onRateChange(e.target.value)}
                
                    />
                {/* <TbX onClick={()=>{
                    onRemoveProduct(i)
                }} size={25} 
                className=" cursor-pointer rounded-full shadow-sm text-white p-1 bg-red-400 " /> */}
                        
            </div>
        </>
    )
}

export default function BillAddProduct({billProducts,setBillProdcuts,formName}){
    const {products}=useFetch()
    return(
        <>
             <div>
                <h1 className="text-gray-500 font-semibold text-2xl text-center mb-5">{formName}</h1>
            </div>
            {billProducts?.map((product,ind)=>{
                return(
                    <div id={ind} className="py-2" key={ind}>
                        <div className=" flex justify-center items-center">
                            <NewProduct 
                            {...product}
                            onProductChange={(product) => {
                                const newRows = [...billProducts];
                                newRows[ind].product = product;
                                setBillProdcuts(newRows);
                                }} 
                            onQuantityChange={(quantity)=>{
                                const newRows=[...billProducts]
                                newRows[ind].quantity=quantity
                                setBillProdcuts(newRows)
                            }}
                            onRateChange={(rate)=>{
                                const newRows=[...billProducts]
                                newRows[ind].rate=rate
                                setBillProdcuts(newRows)
                            }}
                            onRemoveProduct={()=>{
                                const newRows=[...billProducts]
                                newRows.splice(ind,1)
                                setBillProdcuts(newRows)
                            }}
                                products={products}
                                 />
                        </div>
                    </div>
                )
            })}
            <div className=" w-full flex justify-center items-center gap-2">
                <button onClick={()=>{
                    setBillProdcuts([...billProducts,{product:null,quantity:0,rate:0}])
                }} className=" py-2 px-3 rounded shadow-sm border  text-white font-semibold bg-gray-400 hover:bg-gray-300">Add Product</button>
            </div>
        </>
    )
}