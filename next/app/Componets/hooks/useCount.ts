import {create} from 'zustand'
interface count{
    card_count:number
    favourites_count:number
    set_card_count:(value:number)=>void
    set_favourites_count:(value:number)=>void
}
const useCount=create<count>((set)=>({
    card_count:0,
    favourites_count:0,
    set_card_count:(value:number)=>set({card_count:value}),
    set_favourites_count:(value:number)=>set({favourites_count:value})
}))
export default useCount