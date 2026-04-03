'use client'
import apiService from "@/app/services/apiService"
import { useState } from "react"
import { addToast } from "@heroui/react"
import { useRouter } from "next/navigation"
import useCount from "../hooks/useCount"
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
/*
Компонент для добавления товара в корзину. Реализован в виде счетчика, можно менять количество товара.
*/
type props={
    product_id:number,
    cart_quantity:number,
    userId:string|null
}
export default function ButtonAddToCard({cart_quantity,product_id,userId}:props){
    const stateUseCount=useCount()
    const [quantity,setQuantity]=useState<number>(cart_quantity)
    const router=useRouter()
    return(
        <div className="flex items-center justify-between border border-[#aeca73] rounded-[10px] h-[50px] px-4 relative">
            <button 
                className="w-8 h-8 flex items-center justify-center text-[#668544] font-bold text-xl hover:bg-primary-50 rounded-full transition-colors"
                onClick={async(e)=>{
                    e.preventDefault()
                    if(userId===null){
                        addToast({
                            title: "Необходима авторизация!",
                            description: "Для добавления в корзину необходима авторизация!",
                            color:'danger'
                        })
                        return
                   }
                    if(quantity==0)return
                    setQuantity(quantity-1)
                    stateUseCount.set_card_count(stateUseCount.card_count-1)
                    await apiService.patch(`/cart/item/${product_id}/update/`,JSON.stringify({quantity:quantity-1}))
                    router.refresh()
                }}
            >-</button>
            <span className={`${onest.className} font-bold text-[14px] cursor-pointer hover:underline`}>{quantity}</span>
            <button 
                className="w-8 h-8 flex items-center justify-center text-[#aeca73] font-bold text-xl hover:bg-primary-50 rounded-full transition-colors disabled:opacity-50"
                onClick={async(e)=>{
                    e.preventDefault()
                   if(userId===null){
                        addToast({
                            title: "Необходима авторизация!",
                            description: "Для добавления в корзину необходима авторизация!",
                            color:'danger'
                        })
                        return
                   }
                    stateUseCount.set_card_count(stateUseCount.card_count+1)
                    setQuantity(quantity+1)
                    if(quantity>0){
                        await apiService.patch(`/cart/item/${product_id}/update/`,JSON.stringify({quantity:quantity+1}))
                    }else{
                        await apiService.post('/cart/add/',JSON.stringify({product_id:product_id,quantity:quantity+1}))
                    }
                    router.refresh()
                }}
            >+</button>
        </div>
    )
}