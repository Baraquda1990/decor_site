'use client'
import Image from 'next/image';
import logo from '@/public/images/logo.jpg'
import Link from 'next/link';
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
import useCatalogMenu from '../hooks/useCatalogMenu';
import useSearch from '../hooks/useSearch';
import Button_catalog from '../Header_components/ButtonCatalog';
import Search_input from '../Header_components/Search';
import SmallButton from '../Header_components/SmallButton';
import User from '../AuthSignIn_components/User'
import { useRouter } from 'next/navigation';
import apiService from '@/app/services/apiService';
import { useEffect } from 'react';
import useCount from '../hooks/useCount';
/*
Отображение хедера для дектопа
*/
export type headerType={
    userId:string|null
}
export type countType={
    favourites_count:number,
    card_count:number
}
export default function HeaderDesktop({userId}:headerType){
    const router=useRouter()
    const stateCatalogMenu=useCatalogMenu()
    const stateSearch=useSearch()
    let countRes:countType={favourites_count:0,card_count:0}
    const stateUseCount=useCount()
    useEffect(()=>{
        const setCount=async()=>{
            countRes=await apiService.get('/count/')
            stateUseCount.set_card_count(countRes.card_count)
            stateUseCount.set_favourites_count(countRes.favourites_count)
        }
        if(userId) setCount()
    },[])

    return(
        <header onClick={()=>{stateCatalogMenu.close();stateSearch.close()}} className='w-full hidden lg:block bg-white z-40 h-[80px] fixed top-0'>
            <nav className='fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full h-[80px] flex items-center justify-between max-w-[1280px] px-[30px]'>
                <div className='flex'>
                    <Link href="/"><Image 
                        src={logo}
                        alt='Аренда декора'
                        className='h-[40px] w-auto mx-[10px]'
                    /></Link>
                    <Button_catalog/>
                    <div>
                        <Search_input/>
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <Link href="/gallery/" className={`${onest.className} text-xs text-[#3d4a2e] tracking-wider mx-2 transition duration-300 hover:cursor-pointer hover:text-primary`}>Галерея</Link>
                    <Link href="/contacts/" className={`${onest.className} text-xs text-[#3d4a2e] tracking-wider mx-2 transition duration-300 hover:cursor-pointer hover:text-primary`}>Контакты</Link>
                    <SmallButton type="favourites" onPress={()=>{router.push('/favourites/')}} count={stateUseCount.favourites_count}/>
                    <SmallButton type="cart" onPress={()=>{router.push('/card/')}} count={stateUseCount.card_count}/>
                    <User userId={userId}/>
                </div>
            </nav>
        </header>
    )
}