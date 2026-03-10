'use client'
import { Button } from '@heroui/react'

export const SvgUser = () => {
  return (              
    <svg fill="#fff" width="16" height="16" viewBox="0 0 36 36" version="1.1">
        <title>user-solid</title>
        <path d="M30.61,24.52a17.16,17.16,0,0,0-25.22,0,1.51,1.51,0,0,0-.39,1v6A1.5,1.5,0,0,0,6.5,33h23A1.5,1.5,0,0,0,31,31.5v-6A1.51,1.51,0,0,0,30.61,24.52Z" class="clr-i-solid clr-i-solid-path-1"></path><circle cx="18" cy="10" r="7" class="clr-i-solid clr-i-solid-path-2"></circle>
        <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
    </svg>                                          
  )
}
export const SvgCart = () => {
  return (
<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 6H21" stroke="white" stroke-width="2" stroke-linecap="round"></path><path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>                                           
  )
}
const SvgFavourites = () => {
  return (          
    <svg fill="#fff" width="16" height="16" viewBox="0 0 24 24" version="1"><path d="M2.2 9.4c0 1.3.2 3.3 2 5.1 1.6 1.6 6.9 5.2 7.1 5.4.2.1.4.2.6.2s.4-.1.6-.2c.2-.2 5.5-3.7 7.1-5.4 1.8-1.8 2-3.8 2-5.1 0-3-2.4-5.4-5.4-5.4-1.6 0-3.2.9-4.2 2.3-1-1.4-2.6-2.3-4.4-2.3-2.9 0-5.4 2.4-5.4 5.4z"/></svg>
)
}
type SmallButtonProps={
    type: "user" | "cart" | "favourites",
    onPress:()=>void,
}
export default function SmallButton({type,onPress}:SmallButtonProps){
    let svg_elem:React.ReactElement | null= null
        switch(type){
            case 'user':
                svg_elem=<SvgUser/>
                break
            case 'cart':
                svg_elem=<SvgCart/>
                break
            case 'favourites':
                svg_elem=<SvgFavourites/>
                break
        }
    if(!svg_elem) return null
    return(
        <Button className='bg-primary rounded-full mx-1.5' isIconOnly={true} onPress={()=>onPress()}>
            {svg_elem}
        </Button>
    )
}