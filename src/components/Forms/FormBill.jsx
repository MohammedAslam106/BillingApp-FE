import {  useEffect, useState } from "react";
import MultiStepForm from "../MultiStepForm";
import BillAddCustomer from "../StepsInMultiForm/BillAddCustomer";
import BillAddProduct from "../StepsInMultiForm/BillAddProduct";
import BillSubmit from "../StepsInMultiForm/BillSubmit";


// eslint-disable-next-line react/prop-types
export default function FormBill({Editproducts=null,EditCustomer=null,billNumber=null,objectId=null,paidAmount=null,prevProducts=null}){
    // console.log(prevProducts)
    const [billProducts,setBillProdcuts]=useState([])
    const [customer,setCustomer]=useState(null)

    useEffect(()=>{
        if(billNumber){
            setBillProdcuts(Editproducts)
            setCustomer(EditCustomer)
        }
    },[])
    return(
        <>
           <MultiStepForm
                steps={[
                    <BillAddCustomer customer={customer} setCustomer={setCustomer} formName={'Add Customer'} key={'bill-customer-adder'}/>,
                    <BillAddProduct billProducts={billProducts} setBillProdcuts={setBillProdcuts} formName={'Add Products'} key={'bill-product-adder'} />,
                    <BillSubmit billProducts={billProducts} customer={customer} prevProducts={prevProducts} billNumber={billNumber} objectId={objectId} paidAmount={paidAmount} formName={'Final Bill'} key={'bill-submission'} />
                ]}
           />
        </>
    )
}