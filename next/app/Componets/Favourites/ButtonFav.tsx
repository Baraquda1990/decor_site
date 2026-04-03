'use client'
import { useEffect,useState } from "react"
import apiService from "@/app/services/apiService"
import useFavourites from "../hooks/useFavourites"
import { addToast } from "@heroui/react"
import useCount from "../hooks/useCount"
/*
Кнопка добавления тоавра в Избранное
*/
type props={
    id:number
    userId:string|null
}
export default function ButtonFav({id,userId}:props){
    const stateUseCount=useCount()
    const stateUseFavourites=useFavourites()
    useEffect(() => {
        const load = async () => {
            if (!stateUseFavourites.isLoaded) {
                try {
                    const res = await apiService.get('/favourites_list_id/')
                    stateUseFavourites.setFav(res)
                    stateUseFavourites.setIsLoaded()
                } catch (e) {
                    console.error(e)
                }
            }
        }
        if(userId) load()
    }, [])
    const isFav = stateUseFavourites.fav.some(item => item.production === id)
    
    const handleFavourites=async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault() 
        if(!userId) {
            addToast({
                title: "Необходима авторизация!",
                description: "Для добавления в избранное необходима авторизация!",
                color:'danger'
            })
            return
        }
        const data={
            production:id
        }
        if(!isFav){
            await apiService.post('/favourites_create/',JSON.stringify(data))
            stateUseFavourites.setOneFav({production:id})
            stateUseCount.set_favourites_count(stateUseCount.favourites_count+1)
        }else{
            await apiService.delete(`/favourites_destroy/${id}`)
            stateUseFavourites.removeFav(id)
            stateUseCount.set_favourites_count(stateUseCount.favourites_count-1)
        }
    }
    return (
        <>
        <button 
            className="absolute top-[10px] lg:top-[15px] right-[10px] lg:right-[15px] w-[30px] lg:w-[40px] h-[30px] lg:h-[40px] z-10 transition-transform hover:scale-110"
            onClick={handleFavourites}
            >
            <svg data-v-4d63e510="" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill='none' className="w-full h-full"><circle data-v-4d63e510="" cx="15" cy="15" r="15" fill="none"></circle><path data-v-4d63e510="" d="M15 22.5L13.7625 21.3825C9.45 17.46 6.75 15 6.75 11.9625C6.75 9.5025 8.7525 7.5 11.2125 7.5C12.6075 7.5 13.9475 8.1525 15 9.2025C16.0525 8.1525 17.3925 7.5 18.7875 7.5C21.2475 7.5 23.25 9.5025 23.25 11.9625C23.25 15 20.55 17.46 16.2375 21.3825L15 22.5Z" 
                fill={isFav?"#aeca73":'none'} stroke="#C8C8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </button>
        </>
    )
}