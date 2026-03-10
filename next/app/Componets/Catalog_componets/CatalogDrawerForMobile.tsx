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

export default function CatalogDrawer() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const stateCatalogDrawer=useCatalogDrawer()

  useEffect(()=>{
    if(stateCatalogDrawer.isOpen) onOpen()
  },[stateCatalogDrawer.isOpen])

  useEffect(()=>{
    if(isOpen) stateCatalogDrawer.open()
      else stateCatalogDrawer.close(); setStep('main_menu')
  },[isOpen])
  type stepType="main_menu" | "sub_menu"
  const [step,setStep]=useState<stepType>("main_menu")
  let [nameSubMenu,setNameSubMenu]=useState<string>("")
  const [subMenu,setSubMenu]=useState<string[]>([])
  const contentForMainMenu=(
    <>
    <li onClick={()=>{setStep("sub_menu"); setSubMenu(['Мебель дорогая','Мебель дешовая']); setNameSubMenu("Мебель")}}>
      <div className="relative block text-left w-full">
        <div className="w-full">
          <div className="w-full text-left px-5 py-3 text-[14px] font-medium text-[#3d4a2e] hover:text-[#aeca73] hover:bg-white border-l-[3px] border-transparent hover:border-l-[#aeca73] transition-all flex items-center justify-between cursor-pointer">
            <span>Мебель</span>
          </div>
        </div>
      </div>
    </li>
    </>
  )
  const contentForSubMenu=(subMenu.map((itemMenu)=>(
    <li>
      <div className="relative block text-left w-full">
        <div className="w-full">
          <div className="w-full text-left px-5 py-3 text-[14px] font-medium text-[#3d4a2e] hover:text-[#aeca73] hover:bg-white border-l-[3px] border-transparent hover:border-l-[#aeca73] transition-all flex items-center justify-between cursor-pointer">
            <span>{itemMenu}</span>
          </div>
        </div>
      </div>
    </li>
  )))
  const contentForHeaderMainMenu=(
    <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-gray-100 flex items-center justify-between z-10">
      <h2 className="text-lg font-bold text-[#aeca73] uppercase flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#aeca73" xmlns="http://www.w3.org/2000/svg"><rect data-v-dfac7976="" x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"></rect><rect data-v-dfac7976="" x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"></rect><rect data-v-dfac7976="" x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"></rect><rect data-v-dfac7976="" x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"></rect></svg>
        Каталог
      </h2>
    </div>
  )
  const contentForHeaderSubMenu=(
    <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-gray-100 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <button onClick={()=>{setStep('main_menu')}}
            className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-gray-100 text-gray-600">
            <svg data-v-b78cf922="" width="16" height="16" viewBox="0 0 20 20" fill="none"><path data-v-b78cf922="" d="M12 5L7 10L12 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
        <h2 className="font-onest font-bold text-[16px] text-[#3d4a2e]">
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

