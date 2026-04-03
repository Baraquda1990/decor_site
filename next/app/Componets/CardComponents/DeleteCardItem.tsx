'use client'
import apiService from "@/app/services/apiService"
import { useRouter } from "next/navigation"
import useCount from "../hooks/useCount"
/*
Кнопка удаления товара из корзины.
*/
export default function DeleteCardItem({id,countProduct}:{id:number,countProduct:number}){
    const router=useRouter()
    const stateCount=useCount()
    return(
    <button className="absolute text-sm right-[10px] top-[10px] px-4 py-2 bg-red-400 text-white rounded-2xl hover:bg-red-600 transition"
        onClick={async(e)=>{
            e.preventDefault()
            await apiService.delete(`/cart/item/${id}/`)

            stateCount.set_card_count(stateCount.card_count-countProduct)
            router.refresh()
        }}>
        Удалить
    </button>
    )
}