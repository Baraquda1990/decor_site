'use client'
import { useState } from "react"
import apiService from "@/app/services/apiService"
import { addToast } from "@heroui/react"
import { useRouter } from "next/navigation"
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
/*
Обратная связь с администратором.
*/
export default function Feedback(){
    const router=useRouter()
    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [message,setMessage]=useState('')
    type errorType={
        name:string,
        phone:string,
        message:string
    }
    const [errors,setErrors]=useState<errorType>({name:'',phone:'',message:''})
    const handleSubmit=async()=>{
        const res=await apiService.postWithoutToken('/feedback/',JSON.stringify({
           name:name,
           phone:phone,
           message:message 
        }))
        if(!res.ok){
            setErrors(res.json)
        }else{
            setErrors({name:'',phone:'',message:''})
            addToast({
                title: "Заявка успешно оформлена!",
                description: "Ожидайте, скоро наш специалист с Вами свяжется!",
                color:'success'
            })
            setName('')
            setPhone('')
            setMessage('')
            router.refresh()
        }
    }
    return(
        <div className='bg-white border border-gray-200 rounded-[12px] p-6'>
            <h2 className={`${onest.className} font-bold text-[18px] lg:text-[20px] text-[#3d4a2e] mb-[20px]`}>
                Остались вопросы? 
            </h2>
            <form className='space-y-[15px]' action={handleSubmit}>
                <span className="text-sm text-red-500">{errors.name}</span>
                <input 
                    type="text" 
                    placeholder='Имя' 
                    className='w-full h-[50px] lg:h-[60px] px-[20px] bg-white border border-[#dfe8cc] rounded-[10px] text-[14px] lg:text-[16px] text-[#5B5C5E] placeholder-[#B8B8B8] focus:outline-none focus:border-[#aeca73] transition-colors' 
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <span className="text-sm text-red-500">{errors.phone}</span>
                <input 
                    type="text" 
                    placeholder="+7 (000) 000-00-00" 
                    className='w-full h-[50px] lg:h-[60px] px-[20px] bg-white border border-[#dfe8cc] rounded-[10px] text-[14px] lg:text-[16px] text-[#5B5C5E] placeholder-[#B8B8B8] focus:outline-none focus:border-[#aeca73] transition-colors' 
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
                />
                <span className="text-sm text-red-500">{errors.message}</span>
                <textarea 
                    name="" 
                    id="" 
                    placeholder="Ваш вопрос" 
                    rows={4} 
                    className='w-full px-[20px] py-[15px] bg-white border border-[#dfe8cc] rounded-[10px] text-[14px] lg:text-[16px] text-[#5B5C5E] placeholder-[#B8B8B8] focus:outline-none focus:border-[#aeca73] transition-colors resize-none'
                    onChange={(e)=>{setMessage(e.target.value)}}
                >
                        {message}
                    </textarea>
                <button 
                    className={`w-full h-[50px] lg:h-[60px] rounded-[10px] bg-[#aeca73] text-white text-[14px] lg:text-[16px] font-bold ${onest.className} uppercase tracking-wide hover:bg-[#8fb55a] transition-colors disabled:opacity-50 flex items-center justify-center`}
                    type='submit'
                >
                    Отправить заявку
                </button>
            </form>
        </div>
    )
}