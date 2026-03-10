'use client'
import Image from 'next/image';
import logo from '@/public/images/logo.jpg'
import Button_catalog from './Header_components/ButtonCatalog';
import Search_input from './Header_components/Search';
import SmallButton from './Header_components/SmallButton';
import Link from 'next/link';
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
import useCatalogMenu from './hooks/useCatalogMenu';
import useNavModalForMobile from './hooks/useNavModalForMobile';
import useModalAuthSignIn from './hooks/useModalAuthSignIn';
export default function Header(){
    const stateCatalogMenu=useCatalogMenu()
    const stateNavModalForMobile=useNavModalForMobile()
    const stateModalAuthSignIn=useModalAuthSignIn()
    return(
        <>
        <header onClick={stateCatalogMenu.close} className='w-full hidden lg:block bg-white z-40 h-[80px] fixed top-0'>
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
                    <Link href="/contacts/" className={`${onest.className} text-xs text-[#3d4a2e] tracking-wider mx-2 transition duration-300 hover:cursor-pointer hover:text-primary`}>Контакты</Link>
                    <SmallButton type="favourites" onPress={()=>{}}/>
                    <SmallButton type="cart" onPress={()=>{}}/>
                    <SmallButton type="user" onPress={()=>{stateModalAuthSignIn.open()}}/>
                </div>

            </nav>
        </header>
        <header className='h-[60px] w-full bg-white relative border-b border-gray-100 lg:hidden'>
            <div className='flex items-center justify-between h-full px-4'>
                <button className='p-2' onClick={stateNavModalForMobile.open}>
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none"><rect y="0" width="28" height="3" rx="1.5" fill="#3d4a2e"></rect><rect y="8.5" width="20" height="3" rx="1.5" fill="#3d4a2e"></rect><rect y="17" width="24" height="3" rx="1.5" fill="#3d4a2e"></rect></svg>
                </button>
                <Link href='/' className='absolute left-1/2 -translate-x-1/2'>
                    <Image src={logo} className='h-[36px] w-auto object-contain' alt="Аренда декора" ></Image>
                </Link>
                <button className='w-10 h-10 rounded-[10px] bg-gray-100 hover:bg-primary-50 flex items-center justify-center transition-colors'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="#3d4a2e" stroke-width="2"></circle><path d="M13.5 13.5L17 17" stroke="#3d4a2e" stroke-width="2" stroke-linecap="round"></path></svg>
                </button>
            </div>
        </header>
        </>
    )
}