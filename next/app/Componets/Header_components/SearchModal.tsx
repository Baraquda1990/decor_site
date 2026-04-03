'use client'
import React, { useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";
import { useRouter } from "next/navigation";
import {Button, ButtonGroup} from "@heroui/react";
import apiService from "@/app/services/apiService";
/*
Отображение списка товаров исходя из результатов поиска
*/
export default function SearchModal(){
    const stateSearch=useSearch()
    const router=useRouter()
    type Nominal='rub'|'kaz'|'usd'
    const nominal:Record<Nominal,string>={
        rub:'руб',
        kaz:'тг.',
        usd:'usd'
    }

    type Unit = 'mm' | 'sm' | 'm'
    const units: Record<Unit, string> = {
        mm: "мм",
        sm: "см",
        m: "м"
    }
    const loadPage = async (url: string | null) => {
        if (!url) return
        const res = await apiService.getSearchForPaginator(url)
        stateSearch.setItems(res.results)
        stateSearch.setNext(res.next)
        stateSearch.setPrevious(res.previous)
    }
    const content=(<>
        <div className="fixed inset-0 bg-black/20 h-full" onClick={stateSearch.close}></div>
        <div className="flex flex-col space-y-2 absolute z-60 hover:cursor-pointer top-[90px] left-[50%] translate-x-[-50%]">
            {stateSearch.items.map((item)=>{
                return <div 
                            key={item.id} 
                            className="bg-white px-[10px] py-[8px] rounded-xl border-[2px] border-emerald-400 transition transform hover:scale-110 hover:bg-emerald-200"
                            onClick={()=>{router.push('/product/'+item.slug);stateSearch.close()}}
                        >
                        <div className="grid grid-flow-col auto-cols-auto items-center gap-4">
                            <img src={item.image_url} alt="" className="w-[100px] h-auto justify-center" />
                            <div className="">
                                <h2 className="font-bold text-xl">{item.name}</h2>
                                {(item.diameter!==0)&&(
                                    <p className="text-sm">Диаметр: {item.diameter} {units[item.unit as Unit]}</p>
                                )}                                            
                                {(item.height!==0)&&(
                                    <p className="text-sm">Высота: {item.height} {units[item.unit as Unit]}</p>
                                )}
                                {(item.width!==0)&&(
                                    <p className="text-sm">Ширина: {item.width} {units[item.unit as Unit]}</p>
                                )}
                                {(item.length!==0)&&(
                                    <p className="text-sm">Длина : {item.length} {units[item.unit as Unit]}</p>
                                )}
                            </div>
                            <p className="text-right">{item.price} {nominal[item.nominal as Nominal]}</p>
                        </div>
                    </div>})}
            <ButtonGroup>
            <Button 
                isDisabled={!stateSearch.previous}
                onPress={()=>{loadPage(stateSearch.previous)}}
                color="success" variant="solid"
                className="z-50"
            >
                Назад</Button>
            <Button 
                isDisabled={!stateSearch.next}
                onPress={()=>{loadPage(stateSearch.next)}}
                color="success" variant="solid"
                className="z-50"
            >
                Вперед</Button>
            </ButtonGroup>
        </div>
    </>)
    const contentNotFound=(
        <>
        <div className="fixed inset-0 bg-black/20 h-full" onClick={stateSearch.close}></div>
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] z-50">
            <h1 className="text-xl font-bold">Нет результатов</h1>
        </div>
        </>
    )
    const [mainContent,setMainContent]=useState<React.ReactNode>()
    useEffect(()=>{
        if(stateSearch.items.length){
            setMainContent(content)
        }else{
            setMainContent(contentNotFound)
        }
    },[stateSearch.items])
    return(
        stateSearch.isOpen&&mainContent
    )
}