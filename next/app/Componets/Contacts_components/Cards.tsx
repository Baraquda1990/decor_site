import Card from "./Card";
import { Url } from 'next/dist/shared/lib/router/router'
/*
Компоненты отображения контактов администратора. 
*/
type CardType={
    caption:string,
    text:string,
    href?:Url,
    muted_text?:string
}
export function Phone({caption,text,href,muted_text}:CardType){
    return(
        <Card 
            type="phone"
            caption={caption}
            text={text}
            href={href}
            muted_text={muted_text}
        />
    )
}
export function Email({caption,text,href,muted_text}:CardType){
    return(
        <Card 
            type="email"
            caption={caption}
            text={text}
            href={href}
            muted_text={muted_text}
        />
    )
}
export function Telegram({caption,text,href,muted_text}:CardType){
    return(
        <Card 
            type="telegram"
            caption={caption}
            text={text}
            href={href}
            muted_text={muted_text}
        />
    )
}
export function Adress({caption,text,href,muted_text}:CardType){
    return(
        <Card 
            type="adress"
            caption={caption}
            text={text}
            href={href}
            muted_text={muted_text}
        />
    )
}
export function WorkingHours({caption,text,href,muted_text}:CardType){
    return(
        <Card 
            type="working_hours"
            caption={caption}
            text={text}
            href={href}
            muted_text={muted_text}
        />
    )
}
export function Instagram({caption,text,href,muted_text}:CardType){
    return(
        <Card 
            type="instagram"
            caption={caption}
            text={text}
            href={href}
            muted_text={muted_text}
        />
    )
}