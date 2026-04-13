import {create} from 'zustand'
type favouritesType={
    production:number
}
interface favourites{
    fav:favouritesType[]
    setOneFav:(favItem:favouritesType)=>void
    setFav:(favMass:favouritesType[])=>void
    removeFav: (favItemId: number) => void
    isLoaded:boolean
    setIsLoaded:()=>void
}
const useFavourites = create<favourites>((set) => ({
    isLoaded:false,
    setIsLoaded:()=>set({isLoaded:true}),
    fav: [],
    setFav:(favMass)=>set({fav:favMass}),
    setOneFav: (favItem) =>
        set((state) => ({
            fav: [...state.fav, favItem]
        })),
    removeFav: (favItemId) =>
        set((state) => ({
            fav: state.fav.filter(item => item.production !== favItemId)
        }))
}))
export default useFavourites