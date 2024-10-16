import SummaryApi from "../common/index"
import {toast} from "react-toastify"
import { getAuthToken } from "../utils/auth";

const addToCart = async (e, id)=>{
    e?.stopPropagation()
    e?.preventDefault()

    const token = getAuthToken();

    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
    }

    if(responseData.error){
        toast.error(responseData.message)
    }

    return responseData

}

export default addToCart