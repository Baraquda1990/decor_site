import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})

const SvgPhone=()=>{
    return(
        <svg className="w-5 h-5 text-[#aeca73]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
    )
}
const SvgEmail=()=>{
    return(
        <svg className="w-5 h-5 text-[#aeca73]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bc3b1d35=""><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
    )
}
const SvgTelegram=()=>{
    return(
        <svg className="w-5 h-5 text-[#aeca73]" fill="currentColor" viewBox="0 0 24 24" data-v-bc3b1d35=""><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" data-v-bc3b1d35=""></path></svg>
    )
}
const SvgAdress=()=>{
    return(
        <svg className="w-5 h-5 text-[#aeca73]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bc3b1d35=""><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-bc3b1d35=""></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-bc3b1d35=""></path></svg>
    )
}
const SvgWorkingHours=()=>{
    return(
        <svg className="w-5 h-5 text-[#aeca73]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bc3b1d35=""><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-bc3b1d35=""></path></svg>
    )
}
const SvgInstagram=()=>{
    return(
        <svg className="w-5 h-5 text-[#aeca73]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bc3b1d35=""><rect x="2" y="2" width="20" height="20" rx="5" stroke-width="2" data-v-bc3b1d35=""></rect><circle cx="12" cy="12" r="5" stroke-width="2" data-v-bc3b1d35=""></circle><circle cx="18" cy="6" r="1.5" fill="currentColor" data-v-bc3b1d35=""></circle></svg>
    )
}
type CardProps={
    type: "phone" | "email" | "telegram" | "adress" | "working_hours" | "instagram"
    caption:string,
    text:string,
    href?:Url,
    muted_text?:string
}
export default function Card({type,caption,text,href,muted_text}:CardProps){
    let svg:React.ReactElement|null=null
    let content:React.ReactElement|null=null
    switch(type){
        case 'phone':
            svg=<SvgPhone/>
            content=(<Link className={`block ${onest.className} font-medium text-[16px] text-black hover:text-[#aeca73] transition-colors`} href={href ?? '/'}>{text}</Link>)
            break
        case 'email':
            svg=<SvgEmail/>
            content=(<Link className={`block ${onest.className} font-medium text-[16px] text-black hover:text-[#aeca73] transition-colors`} href={href ?? '/'}>{text}</Link>)
            break
        case 'telegram':
            svg=<SvgTelegram/>
            content=(<Link className={`block ${onest.className} font-medium text-[16px] text-black hover:text-[#aeca73] transition-colors`} href={href ?? '/'}>{text}</Link>)
            break
        case 'adress':
            svg=<SvgAdress/>
            content=(<p className={`${onest.className} font-medium text-[14px] text-black leading-[20px]`}>{text}</p>)
            break
        case 'working_hours':
            svg=<SvgWorkingHours/>
            content=(<p className={`${onest.className} font-medium text-[14px] text-black leading-[20px]`}>{text}</p>)
            break
        case 'instagram':
            svg=<SvgInstagram/>
            content=(<Link className={`block ${onest.className} font-medium text-[16px] text-black hover:text-[#aeca73] transition-colors`} href={href ?? '/'}>{text}</Link>)
            break
    }
    const muted_contend:React.ReactElement=(<p className='font-onest text-[12px] text-gray-400 mt-1'>{muted_text}</p>)
    return(
        <div className="bg-white border border-gray-200 rounded-[12px] p-5 hover:shadow-soft transition-all">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#aeca73]/10 flex items-center justify-center">
                    {svg!=null?svg:<></>}
                </div>
                    <h5 className={`${onest.className} font-semibold text-[15px] text-[#3d4a2e]`}>{caption}</h5>
            </div>
                {content}
                {muted_text?muted_contend:<></>}
            
        </div>
    )
}