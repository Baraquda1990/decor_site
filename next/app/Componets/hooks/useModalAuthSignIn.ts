import { getUserId } from '@/app/lib/actions';
import {create} from 'zustand'
interface modalAuthSignIn{
    isOpen:boolean;
    open:()=>void;
    close:()=>void;
    userId:string|null;
    setUserId:()=>void
}
const useModalAuthSignIn=create<modalAuthSignIn>((set)=>({
    isOpen:false,
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false}),
    userId:null,
    setUserId: async () => {
    const id = await getUserId()
    set({ userId: id })
}
}))
export default useModalAuthSignIn