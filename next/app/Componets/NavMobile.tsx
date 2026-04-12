'use client'
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
import Link from "next/link"
import useCatalogDrawer from './hooks/useCatalogDrawer'
import UserMobile from './AuthSignIn_components/UserMobile'
/*
Навигация в мобильной версии
*/
export default function NavMobile(){
    const stateCatalogDrawer=useCatalogDrawer()
    return(
        <nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-200 z-50 lg:hidden">
            <div className="flex items-center justify-around h-full">
                <Link href='/' className="flex flex-col items-center gap-1 text-gray-500">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8L10 2L17 8V17C17 17.5304 16.7893 18.0391 16.4142 18.4142C16.0391 18.7893 15.5304 19 15 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V8Z" stroke="#aeca73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <span className={`text-[8px] uppercase ${onest.className}`}>Главная</span>
                </Link>
                <Link href='/favourites/' className="flex flex-col items-center gap-1 text-gray-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21L10.55 19.7C6.4 15.9 3.5 13.3 3.5 10.1C3.5 7.5 5.5 5.5 8.1 5.5C9.54 5.5 10.92 6.17 12 7.27C13.08 6.17 14.46 5.5 15.9 5.5C18.48 5.5 20.5 7.5 20.5 10.1C20.5 13.3 17.6 15.9 13.45 19.7L12 21Z" fill="none" stroke="#9A9A9A" strokeWidth="1.5"></path></svg>
                    <span className={`text-[8px] uppercase ${onest.className}`}>Избранное</span>
                </Link>
                <button className="flex flex-col items-center gap-1 text-gray-500" 
                    onClick={()=>{stateCatalogDrawer.isOpen?stateCatalogDrawer.close():stateCatalogDrawer.open()}}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="6" height="6" rx="1" stroke="#9A9A9A" strokeWidth="2"></rect><rect x="12" y="2" width="6" height="6" rx="1" stroke="#9A9A9A" strokeWidth="2"></rect><rect x="2" y="12" width="6" height="6" rx="1" stroke="#9A9A9A" strokeWidth="2"></rect><rect x="12" y="12" width="6" height="6" rx="1" stroke="#9A9A9A" strokeWidth="2"></rect></svg>
                    <span className={`text-[8px] uppercase ${onest.className}`}>Каталог</span>
                </button>
                <Link href='/card' className="flex flex-col items-center gap-1 text-gray-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 6H21" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round"></path><path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <span className={`text-[8px] uppercase ${onest.className}`}>Корзина</span>
                </Link>
                <UserMobile/>
            </div>
        </nav>
    )
}