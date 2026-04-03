import { getUserId } from "@/app/lib/actions"
import Link from "next/link"
import ButtonFav from "../Favourites/ButtonFav"
import ButtonAddToCard from "../CardComponents/ButtonAddToCard"
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
/*
Товар в СубКаталоге или Каталоге
*/
export type catalogItemType={
    id:number,
    name:string,
    slug:string,
    price:string,
    nominal:string,
    image_url:string,
    width:number,
    length:number,
    height:number,
    diameter:number,
    unit:string,
    cart_quantity:number
}
type catalogItemProps={
    catalogItem:catalogItemType
}

export default async function CatalogItem({catalogItem}:catalogItemProps){
    const userId=await getUserId()
    type Unit = 'mm' | 'sm' | 'm'
    const units: Record<Unit, string> = {
        mm: "мм",
        sm: "см",
        m: "м"
    }

    type Nominal='rub'|'kaz'|'usd'
    const nominal:Record<Nominal,string>={
        rub:'руб',
        kaz:'тг.',
        usd:'usd'
    }

    return(
        <>
        <Link href={`/product/${catalogItem.slug}`}>
        <div className="bg-white rounded-[10px] lg:rounded-[12px] relative flex flex-col h-full transition-all hover:shadow-soft-md lg:hover:scale-[1.02] cursor-pointer border border-gray-100">
            <ButtonFav userId={userId} id={catalogItem.id}/>
            <div className="relative pt-[13%] pb-[4%] lg:pt-[8%] lg:pb-[4%] overflow-hidden rounded-t-[10px] lg:rounded-t-[12px]">
                <div className="flex w-full h-full items-center justify-center">
                    <img src={catalogItem.image_url} alt={catalogItem.name}
                        className="w-[230px] h-[200px] lg:w-full lg:h-[250px] xl:h-[280px] object-contain transition-opacity duration-200"/>
                </div>
            </div>
            <div className="px-[13px] lg:px-[18px] pb-[25px] lg:pb-[30px] flex flex-col">
                <div className="flex items-center gap-[10px]">
                    <span className="font-jost font-medium uppercase text-[#6f9340] text-[18px]">
                        {catalogItem.price}
                    </span>
                    <span className="text-[#6f9340]">
                        {nominal[catalogItem.nominal as Nominal]}
                    </span>
                </div>
                <div className="mb-[16px] lg:mb-[20px] block flex items-start h-[34px] lg:h-[40px] xl:h-[44px]">
                    <h3 className={`max-w-full ${onest.className} font-medium text-black text-[13px] lg:text-[15px] xl:text-[16px] leading-[17px] lg:leading-[20px] xl:leading-[22px] line-clamp-2`}>
                        {catalogItem.name}
                    </h3>
                </div>
                <div className="mb-[12px] lg:mb-[16px] min-h-[14px] lg:min-h-[16px] flex items-center">
                    {(catalogItem.diameter!==0)&&(
                        <div className="flex items-center ml-1">
                        <svg data-v-4d63e510="" className="dimension-icon diameter-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle data-v-4d63e510="" cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.8" fill="none"></circle><line data-v-4d63e510="" x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="0.8"></line></svg>
                        <span className="pl-1">{catalogItem.diameter}</span>
                        <span>{units[catalogItem.unit as Unit]}</span>
                        </div>
                    )}
                    {(catalogItem.height!==0)&&(
                        <div className="flex items-center ml-1">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3810_9571)">
                        <path d="M2.68372 8.79046L2.68372 1.20954L1.53547 2.4602C1.21114 2.75701 0.828313 2.3192 1.08307 1.96165L2.76255 0.109191C2.89621 -0.0295475 3.08957 -0.0393675 3.22723 0.0986788C3.25396 0.125432 4.39307 1.41381 4.94572 2.01711C5.1437 2.37566 4.7515 2.73863 4.4623 2.46272L3.31628 1.2096L3.31628 8.79046L4.46453 7.5398C4.78886 7.24299 5.17169 7.6808 4.91693 8.03835L3.23745 9.89081C3.10379 10.0295 2.91044 10.0394 2.77277 9.90132C2.74604 9.87457 1.60693 8.5862 1.05428 7.98289C0.856303 7.62434 1.2485 7.26137 1.5377 7.53728L2.68372 8.7904L2.68372 8.79046Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_3810_9571">
                        <rect width="10" height="6" fill="white" transform="translate(4.37114e-07 10) rotate(-90)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <span className="pl-1">{catalogItem.height}</span>
                        <span>{units[catalogItem.unit as Unit]}</span>
                        </div>
                    )}
                    {(catalogItem.width!==0)&&(
                        <div className="flex items-center ml-1">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3810_9573)">
                        <path d="M8.79046 3.31628L1.20954 3.31628L2.4602 4.46453C2.75701 4.78886 2.3192 5.17169 1.96165 4.91693L0.109191 3.23745C-0.0295473 3.10379 -0.0393673 2.91044 0.0986789 2.77277C0.125432 2.74604 1.41381 1.60693 2.01711 1.05428C2.37566 0.856303 2.73863 1.2485 2.46272 1.5377L1.2096 2.68372L8.79046 2.68372L7.5398 1.53547C7.24299 1.21114 7.6808 0.828314 8.03835 1.08307L9.89081 2.76255C10.0295 2.89621 10.0394 3.08957 9.90132 3.22723C9.87457 3.25396 8.5862 4.39307 7.98289 4.94572C7.62434 5.1437 7.26137 4.7515 7.53728 4.4623L8.7904 3.31628L8.79046 3.31628Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_3810_9573">
                        <rect width="10" height="6" fill="white" transform="translate(10 6) rotate(180)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <span className="pl-1">{catalogItem.width}</span>
                        <span>{units[catalogItem.unit as Unit]}</span>
                        </div>
                    )}
                </div>
                <ButtonAddToCard cart_quantity={catalogItem.cart_quantity} product_id={catalogItem.id} userId={userId}/>
            </div>
        </div>
        </Link>
        </>
    )
}