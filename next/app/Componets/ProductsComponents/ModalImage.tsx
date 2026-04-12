'use client'
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from "react";
/*
Модальное окно с фото товара
*/
type props={
    modalIsOpen:boolean,
    setModalIsOpen:(flag:boolean)=>void,
    imgSrc:string
}
export default function ModalImage({modalIsOpen,setModalIsOpen,imgSrc}:props) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(()=>{
        if(modalIsOpen) onOpen();
    },[modalIsOpen])

    useEffect(()=>{
        if(isOpen) setModalIsOpen(true)
        else setModalIsOpen(false)
    },[isOpen])

    return (
    <>
        <div className="flex flex-wrap gap-3">
        </div>
        <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
            {(onClose) => (
                <ModalBody>
                    <img src={imgSrc} alt='Photo'/>
                </ModalBody>
            )}
        </ModalContent>
        </Modal>
    </>
    );
}