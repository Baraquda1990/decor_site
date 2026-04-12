import {create} from 'zustand'
interface navModalForMobile{
    isOpen:boolean;
    open:()=>void;
    close:()=>void;
}
const useNavModalForMobile=create<navModalForMobile>((set)=>({
    isOpen:false,
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false})
}))
export default useNavModalForMobile