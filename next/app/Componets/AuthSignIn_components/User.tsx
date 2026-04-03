'use client'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,addToast} from "@heroui/react";
import useModalAuthSignIn from "../hooks/useModalAuthSignIn";
import SmallButton from "../Header_components/SmallButton";
import { headerType } from "../Header_components/HeaderDesktop";
import { resetAuthCookies } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import useCount from "../hooks/useCount";
/*
Кнопка пользователя. При нажатии открывает модальное окно авторизации - регистрации. 
Для авторизованного пользователя - функционал выхода.
*/
export default function User({userId}:headerType) {
  const stateCount=useCount()
  const router=useRouter()
  const stateModalAuthSignIn=useModalAuthSignIn()
  const handleLogout=async()=>{
    await resetAuthCookies()
    addToast({
      title: "Вы вышли!",
      description: "До новых встреч!",
      color:'secondary'
    })
    stateCount.set_card_count(0)
    stateCount.set_favourites_count(0)
  }
  if (!userId) {
    return (
      <SmallButton
        type="user"
        onPress={() => {stateModalAuthSignIn.open()}}
      />
    );
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button className='bg-primary rounded-full mx-1.5' isIconOnly={true}>
        <svg fill="#fff" width="16" height="16" viewBox="0 0 36 36" version="1.1">
            <path d="M30.61,24.52a17.16,17.16,0,0,0-25.22,0,1.51,1.51,0,0,0-.39,1v6A1.5,1.5,0,0,0,6.5,33h23A1.5,1.5,0,0,0,31,31.5v-6A1.51,1.51,0,0,0,30.61,24.52Z" className="clr-i-solid clr-i-solid-path-1"></path><circle cx="18" cy="10" r="7" className="clr-i-solid clr-i-solid-path-2"></circle>
            <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
        </svg>   
        </Button>
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