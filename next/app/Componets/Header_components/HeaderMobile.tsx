'use client'
import Image from 'next/image';
import logo from '@/public/images/logo.jpg'
import Link from 'next/link';
import useNavModalForMobile from '../hooks/useNavModalForMobile';
/*
Отображение хедера для мобильных устройств
*/
export default function HeaderMobile(){
    const stateNavModalForMobile=useNavModalForMobile()
    return(
        <header className='h-[60px] w-full bg-white relative border-b border-gray-100 lg:hidden'>
            <div className='flex items-center justify-between h-full px-4'>
                <button className='p-2' onClick={stateNavModalForMobile.open}>
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none"><rect y="0" width="28" height="3" rx="1.5" fill="#3d4a2e"></rect><rect y="8.5" width="20" height="3" rx="1.5" fill="#3d4a2e"></rect><rect y="17" width="24" height="3" rx="1.5" fill="#3d4a2e"></rect></svg>
                </button>
                <Link href='/' className='absolute left-1/2 -translate-x-1/2'>
                    <Image src={logo} className='h-[36px] w-auto object-contain' alt="Аренда декора" ></Image>
                </Link>
            </div>
        </header>
    )
}