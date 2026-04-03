'use client'
import ModalImage from "./ModalImage";
import {Tabs, Tab} from "@heroui/react";
import { useState } from "react";
import ButtonFav from "../Favourites/ButtonFav";
/*
Список изображений для просмотра
*/
type imagesType={
    id:number,
    image_url:string
}
type props={
    id:number,
    image:string,
    images:imagesType[],
    userId:string|null
}
export default function TabImage({id,image,images,userId}:props){
    const [currentImg,setCurrentImg]=useState(image)
    const [modalOpen,setModalOpen]=useState(false)
    images.push({
        id:images.length+10,
        image_url:image
    })
  return (
    <div className="flex relative">
        <ButtonFav id={id} userId={userId}/>
        <Tabs aria-label="Options" isVertical={true}>
            {images.map((img)=>(
                <Tab 
                    key={img.id}
                    className="w-[100px] h-[100px]"
                    title={
                        <img src={img.image_url} alt="Photos" 
                            className="w-full"/>
                    }
                    onClick={()=>{setCurrentImg(img.image_url)}}
                    >
                </Tab>
            ))}
        </Tabs>
            <div className="aspect-square max-h-[400px] w-full bg-white rounded-[12px] overflow-hidden group border border-gray-100">
                <img 
                    src={currentImg} alt="Photo" 
                    className="w-full h-full object-contain cursor-pointer transition-all duration-500 group-hover:scale-[1.02]"    
                    onClick={()=>{setModalOpen(true)}}
                />
            </div>
        <ModalImage modalIsOpen={modalOpen} setModalIsOpen={setModalOpen} imgSrc={currentImg}/>
    </div>
  )
}

