'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useEffect,useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  addToast
} from "@heroui/react"
import ContentForAuth from "./ContentForAuth"
import ContentSignIn from "./ContentForSignIn"
import useModalAuthSignIn from "../hooks/useModalAuthSignIn"
import apiService from "@/app/services/apiService";
import { setAccessToken, setRefreshToken, setUserId } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import useCount from "../hooks/useCount";
import { countType } from "../Header_components/HeaderDesktop";
/*
Логика модального окна авторизации и регистрации, а также действий после регистрации или авторизации
*/
export type errorsType={
  username:string[]|undefined,
  password:string[]|undefined,
  re_password:string[]|undefined,
  non_field_errors:string[]|undefined
}
export default function ModalAuthSignIn() {
  const stateCount=useCount()
  const router=useRouter()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const stateModalAuthSignIn=useModalAuthSignIn()
  useEffect(()=>{
    if(stateModalAuthSignIn.isOpen) onOpen()
  },[stateModalAuthSignIn.isOpen])
  useEffect(()=>{
    if(isOpen) stateModalAuthSignIn.open()
      else {stateModalAuthSignIn.close(); setSuccessMes({...successMes,visible:false}); setErrorMes({...errorMes,visible:false})}
  },[isOpen])
  type modeType='auth'|'sign_in'
  const [mode,setMode]=useState<modeType>('auth')

  const [username,setUsername]=useState<string>('')
  const [password1,setPassword1]=useState<string>('')
  const [password2,setPassword2]=useState<string>('')

  const [errors,setErrors]=useState<errorsType>({username:undefined,password:undefined,re_password:undefined,non_field_errors:undefined})
  type mesType={
    title:string,
    description:string
    visible:boolean
  }
  const [successMes,setSuccessMes]=useState<mesType>({title:'',description:'',visible:false})
  const handleSignIn=async()=>{
    setIsLoading(true)
    const formData={
      username:username,
      password:password1,
      re_password:password2
    }
    const response=await apiService.postWithoutToken('/auth/users/',JSON.stringify(formData))
    if(response.ok){
      setMode('auth')
      setSuccessMes({
        title:"Регистрация прошла успешно!",
        description:"Для продолжения введите логин и пароль!",
        visible:true
      })
    }else{
      setErrors({username:response.json.username,password:response.json.password,re_password:response.json.re_password,non_field_errors:response.json.non_field_errors})
    }
    setIsLoading(false)
  }
  const [usernameAuth,setUsernameAuth]=useState<string>('')
  const [passwordAuth,setPasswordAuth]=useState<string>('')
  const [errorMes,setErrorMes]=useState<mesType>({title:'',description:'',visible:false})
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const handleAuth=async()=>{
    setIsLoading(true)
    const formData={
      username:usernameAuth,
      password:passwordAuth
    }
    const response=await apiService.postWithoutToken('/auth/jwt/create/',JSON.stringify(formData))
    if(response.ok){
      await setAccessToken(response.json.access)
      await setRefreshToken(response.json.refresh)
      const responseForUserId=await apiService.get('/auth/users/me')
      if(responseForUserId.id){
        setUserId(String(responseForUserId.id))
        addToast({
          title: "Успешный вход!",
          description: "Добро пожаловать на сайт!",
          color:'success'
        })
        await stateModalAuthSignIn.setUserId()
        let countRes:countType={favourites_count:0,card_count:0}
        countRes=await apiService.get('/count/')
        stateCount.set_card_count(countRes.card_count)
        stateCount.set_favourites_count(countRes.favourites_count)
        router.refresh()
        router.push('/')
        onClose()
      }else{
        setErrorMes({
          title:"Ошибка Авторизации!",
          description:"Неверный логин или пароль!",
          visible:true
        })
      }
    }else{
      setErrorMes({
        title:"Ошибка Авторизации!",
        description:"Неверный логин или пароль!",
        visible:true
      })
    }
    setIsLoading(false)
  }
  return (
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-center space-x-5 text-gray-400 my-2">
                  <button 
                    className={`${mode==='auth'?'text-[#aeca73] underline':''} transition hover:text-[#aeca73] hover:cursor-pointer`}
                    onClick={()=>{setMode('auth')}}
                    >
                      Войти
                  </button>
                  <button 
                    className={`${mode==='sign_in'?'text-[#aeca73] underline':''} transition hover:text-[#aeca73] hover:cursor-pointer`}
                    onClick={()=>{setMode('sign_in')}}
                    >
                      Регистрация
                  </button>
                </div>
              </ModalHeader>
              <ModalBody>
                  <AnimatePresence mode="wait">
                    {mode === "auth" && (
                      <motion.div
                        key="auth"
                        initial={{ opacity: 0,}}
                        animate={{ opacity: 1,}}
                        exit={{ opacity: 0,}}
                        transition={{ duration: 0.25 }}
                      >
                        <ContentForAuth setUsername={setUsernameAuth} setPassword={setPasswordAuth} successMes={successMes} errorMes={errorMes}/>
                      </motion.div>
                    )}

                    {mode === "sign_in" && (
                      <motion.div
                        key="sign"
                        initial={{ opacity: 0,}}
                        animate={{ opacity: 1,}}
                        exit={{ opacity: 0,}}
                        transition={{ duration: 0.25 }}
                      >
                        <ContentSignIn setUsername={setUsername} setPassword1={setPassword1} setPassword2={setPassword2} errors={errors}/>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
                  {mode==='auth'&&<Button color="primary" isLoading={isLoading} onPress={handleAuth}>Войти</Button>}
                  {mode==='sign_in'&&<Button color="primary" isLoading={isLoading} onPress={handleSignIn}>Зарегистрироваться</Button>}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}
