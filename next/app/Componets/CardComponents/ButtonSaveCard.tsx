'use client'
import apiService from "@/app/services/apiService"
import { useRouter } from "next/navigation"
import { addToast } from "@heroui/react"
import useCount from "../hooks/useCount"
/*
Компонент сохранения корзины и соответсвенно перевода корзины в статус "Арендован"
*/
type props={
    userId:string|null
}
export default function ButtonSaveCard({userId}:props){
    const stateUseCount=useCount()
    if(!userId) return
    const router=useRouter()
    const handleClick=async ()=>{
        const res=await apiService.patch('/cart/checkout/',JSON.stringify({}))
        if(!res.error){
        addToast({
            title: "Заказ успешно оформлен!",
            description: "Ожидайте, скоро наш специалист с Вами свяжется!",
            color:'success'
        })
        stateUseCount.set_card_count(0)
        router.push('/')
        }else{
        addToast({
            title: "Возникла ошибка!",
            description: `${res.error}`,
            color:'danger'
        })
        }    
    }
    return(
        <button 
            className="bg-[#668544] text-xl w-full rounded-2xl text-white font-bold min-h-[80px] hover:bg-[#7fbd3c] transition hover:cursor-pointer"
            onClick={handleClick}
            >
            Создать заказ
        </button>
    )
}