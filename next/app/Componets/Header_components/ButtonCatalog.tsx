'use client'
import { Button } from '@heroui/react'
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
import useCatalogMenu from '../hooks/useCatalogMenu'
export const ButtonIcon = () => {
  return (
<svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="white" stroke-width="1.5"></rect><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="white" stroke-width="1.5"></rect><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="white" stroke-width="1.5"></rect><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="white" stroke-width="1.5"></rect></svg>  );
};
export default function Button_catalog(){
    const stateCatalogMenu=useCatalogMenu()
    return(
        <Button onPress={()=>{stateCatalogMenu.isOpen?stateCatalogMenu.close():stateCatalogMenu.open()}} className={`mx-6 rounded-full px-6 ${onest.className} text-[13px] font-bold bg-primary flex items-center gap-2`} startContent={<ButtonIcon/>}>
            <span className="uppercase text-white">Каталог</span>
        </Button>)
}