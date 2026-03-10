'use client'
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect,useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react"
import ContentForAuth from "./ContentForAuth"
import ContentSignIn from "./ContentForSignIn"
import useModalAuthSignIn from "../hooks/useModalAuthSignIn"
export default function ModalAuthSignIn() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const stateModalAuthSignIn=useModalAuthSignIn()
  useEffect(()=>{
    if(stateModalAuthSignIn.isOpen) onOpen()
  },[stateModalAuthSignIn.isOpen])
  useEffect(()=>{
    if(isOpen) stateModalAuthSignIn.open()
      else stateModalAuthSignIn.close()
  },[isOpen])
  type modeType='auth'|'sign_in'
  const [mode,setMode]=useState<modeType>('auth')
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
                        <ContentForAuth />
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
                        <ContentSignIn />
                      </motion.div>
                    )}
                  </AnimatePresence>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
                <Button color="primary" onPress={onClose}>
                  {mode==='auth'?'Войти':'Зарегистрироваться'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}
