'use client'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import useCatalogDrawer from "../hooks/useCatalogDrawer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
/*
Выпадающее меню со сменой содержимого при переходе от каталога к субкаталогу. Необходим для мобильной версии
*/
type catalogSubMenuType={
  id:number,
  name:string,
  image_url:string,
  slug:string
}
type calalogMenuType={
    id:number,
    name:string,
    subcatalog:catalogSubMenuType[]
}
type props={
    catalogData:calalogMenuType[]
}
export default function CatalogDrawer({catalogData}:props) {
  const router=useRouter()
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const stateCatalogDrawer=useCatalogDrawer()

  useEffect(()=>{
    if(stateCatalogDrawer.isOpen) onOpen()
      else onClose()
  },[stateCatalogDrawer.isOpen])

  useEffect(()=>{
    if(isOpen) stateCatalogDrawer.open()
      else stateCatalogDrawer.close(); setStep('main_menu')
  },[isOpen])
  type stepType="main_menu" | "sub_menu"
  const [step,setStep]=useState<stepType>("main_menu")
  const [nameSubMenu,setNameSubMenu]=useState<string>("")
  const [subMenu,setSubMenu]=useState<catalogSubMenuType[]>([])
  const contentForMainMenu=(
    catalogData.map((catalogItem)=>(
    <li key={catalogItem.id} onClick={()=>{setStep("sub_menu"); setSubMenu(catalogItem.subcatalog); setNameSubMenu(catalogItem.name)}}>
      <div className="relative block text-left w-full">
        <div className="w-full">
          <div className="w-full text-left px-5 py-3 text-[14px] font-medium text-[#3d4a2e] hover:text-[#aeca73] hover:bg-white border-l-[3px] border-transparent hover:border-l-[#aeca73] transition-all flex items-center justify-between cursor-pointer">
            <span>{catalogItem.name}</span>
          </div>
        </div>
      </div>
    </li>
    ))
  )
  const contentForSubMenu=(subMenu.map((subcatalogItem)=>(
    <li key={subcatalogItem.id} onClick={()=>{router.push(`/catalog/${subcatalogItem.slug}`); stateCatalogDrawer.close()}}>
      <div className="relative block text-left w-full">
        <div className="w-full">
          <div className="w-full text-left px-5 py-3 text-[14px] font-medium text-[#3d4a2e] hover:text-[#aeca73] hover:bg-white border-l-[3px] border-transparent hover:border-l-[#aeca73] transition-all flex items-center cursor-pointer">
            <img src={subcatalogItem.image_url} alt={subcatalogItem.name} width="50px" height="50px" className="rounded-xl mx-3"/>
            <span>{subcatalogItem.name}</span>
          </div>
        </div>
      </div>
    </li>
  )))
  const contentForHeaderMainMenu=(
    <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-gray-100 flex items-center justify-between z-10">
      <h2 className="text-lg font-bold text-[#aeca73] uppercase flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#aeca73" xmlns="http://www.w3.org/2000/svg"><rect data-v-dfac7976="" x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"></rect><rect data-v-dfac7976="" x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"></rect><rect data-v-dfac7976="" x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"></rect><rect data-v-dfac7976="" x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"></rect></svg>
        Каталог
      </h2>
    </div>
  )
  const contentForHeaderSubMenu=(
    <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-gray-100 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <button onClick={()=>{setStep('main_menu')}}
            className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-gray-100 text-gray-600">
            <svg data-v-b78cf922="" width="16" height="16" viewBox="0 0 20 20" fill="none"><path data-v-b78cf922="" d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </button>
        <h2 className={`${onest.className} font-bold text-[16px] text-[#3d4a2e]`}>
          {nameSubMenu}
        </h2>
       
      </div>  
    </div>
  )
  return (
    <>
      <Drawer placement="left" size="full" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} className="top-[60px]">
        <DrawerContent className="bg-[#f8faf5]">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {(step=="main_menu")?contentForHeaderMainMenu:contentForHeaderSubMenu}
              </DrawerHeader>
              <DrawerBody>
                <ul className="space-y-2">
                {(step=='main_menu')?contentForMainMenu:contentForSubMenu}
                </ul>
              </DrawerBody>
              <DrawerFooter>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

