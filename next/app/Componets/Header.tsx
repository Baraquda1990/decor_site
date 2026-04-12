import HeaderDesktop from "./Header_components/HeaderDesktop";
import HeaderMobile from "./Header_components/HeaderMobile";
import { getUserId } from "../lib/actions";
/*
Компонент обертка для отображения хедера мобильной или десктопной версии сайта.
*/
export default async function Header(){
    const userId=await getUserId()
    return(
        <>
            <HeaderDesktop userId={userId}/>
            <HeaderMobile/>
        </>
    )
}