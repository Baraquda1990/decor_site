import CatalogMenu from "./CatalogMenu";
import CatalogSubMenu from "./CatalogSubMenu";
import CatalogDrawer from "./CatalogDrawerForMobile";
import apiService from "@/app/services/apiService";
/*
Компонент оберка который передает Каталог и субкаталог
*/
export default async function Catalog(){
    const catalogData=await apiService.getWithoutToken('/listcatalog/')
    return(
        <>
            <CatalogMenu catalogData={catalogData}/>
            <CatalogSubMenu/>
            <CatalogDrawer catalogData={catalogData}/>
        </>
    )
}