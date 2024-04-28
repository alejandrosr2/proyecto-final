import { createContext, useEffect, useState } from "react";
import api from "../service/api"


export const AssetContext = createContext();

export const AssetProvider = ({children}) => {

    const [assets, setAsets] = useState([]);

    useEffect(() => {
        const getData = async() => {
            const dataAsset = await api.getDataApi();
            
            setAsets(dataAsset)
        }
        getData()
    }, []);

    return (

        <AssetContext.Provider value={assets}>
            {children}
        </AssetContext.Provider>
    )
}