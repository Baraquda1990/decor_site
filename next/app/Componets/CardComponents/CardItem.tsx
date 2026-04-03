import { cardItemsType } from "@/app/card/page"
import Link from "next/link"
import ButtonAddToCard from "./ButtonAddToCard"
import DeleteCardItem from "./DeleteCardItem"
/*
Отображение товара в корзине.
*/
type props={
    item:cardItemsType,
    userId:string|null
}
export default function CardItem({item,userId}:props){
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
        <Link className="flex space-x-1 border border-[#aeca73] border-xl rounded-2xl w-full transform transition hover:scale-102 relative"
            href={`/product/${item.product.slug}`}>
            <div className="p-4">
                <img src={item.product.image_url} alt="Фото карточки товара" width={100} height={100}/>
            </div>
            <div className="flex flex-col space-y-2 py-4">
                <h3 className="font-bold text-[#668544] text-xl">{item.product.name}</h3>
                <p>{'Цена за единицу товара: '+item.product.price+' '+nominal[item.product.nominal as Nominal]}</p>
                <div className="mb-[12px] lg:mb-[16px] min-h-[14px] lg:min-h-[16px] flex items-center">
                    {(item.product.diameter!==0)&&(
                        <div className="flex items-center ml-1">
                        <svg data-v-4d63e510="" className="dimension-icon diameter-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle data-v-4d63e510="" cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.8" fill="none"></circle><line data-v-4d63e510="" x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="0.8"></line></svg>
                        <span className="pl-1">{item.product.diameter}</span>
                        <span>{units[item.product.unit as Unit]}</span>
                        </div>
                    )}
                    {(item.product.height!==0)&&(
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
                        <span className="pl-1">{item.product.height}</span>
                        <span>{units[item.product.unit as Unit]}</span>
                        </div>
                    )}
                    {(item.product.width!==0)&&(
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
                        <span className="pl-1">{item.product.width}</span>
                        <span>{units[item.product.unit as Unit]}</span>
                        </div>
                    )}
                </div>
                <ButtonAddToCard product_id={item.product.id} cart_quantity={item.quantity} userId={userId} />
                <div className="py-3">
                    <p className="">Цена с учетом количества: {item.price_by_quantity} {nominal[item.product.nominal as Nominal]} </p>
                </div>
                <DeleteCardItem id={item.id} countProduct={item.quantity}/>
            </div>

        </Link>
    )
}