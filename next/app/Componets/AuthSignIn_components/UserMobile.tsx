'use client'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,addToast} from "@heroui/react";
import useModalAuthSignIn from "../hooks/useModalAuthSignIn";
import { resetAuthCookies } from "@/app/lib/actions";
import { useEffect } from "react";
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
/*
Кнопка пользователя для мобильных устройств. При нажатии открывает модальное окно авторизации - регистрации. 
Для авторизованного пользователя - функционал выхода.
*/
export default function UserMobile() {
  const stateModalAuthSignIn=useModalAuthSignIn()
  const handleLogout=async()=>{
    await resetAuthCookies()
    addToast({
      title: "Вы вышли!",
      description: "До новых встреч!",
      color:'secondary'
    })
    stateModalAuthSignIn.setUserId()
  }
  useEffect(()=>{
    stateModalAuthSignIn.setUserId()
  },[])
  if (!stateModalAuthSignIn.userId) {
    return (
        <button 
            className="flex flex-col items-center gap-1 text-gray-500"
            onClick={() => {stateModalAuthSignIn.open()}}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="6" r="4" stroke="#9A9A9A" strokeWidth="2"></circle><path d="M2 18C2 14.6863 5.13401 12 9 12H11C14.866 12 18 14.6863 18 18" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round"></path></svg>
            <span className={`text-[8px] uppercase ${onest.className}`}>Войти</span>
        </button>
    );
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button className="flex flex-col items-center gap-1 text-gray-500">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="6" r="4" stroke="#9A9A9A" strokeWidth="2"></circle><path d="M2 18C2 14.6863 5.13401 12 9 12H11C14.866 12 18 14.6863 18 18" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round"></path></svg>
            <span className={`text-[8px] uppercase ${onest.className}`}>Войти</span>
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions">
        <DropdownItem 
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

