import { useContext, useEffect, useState } from "react";
import { AssetContext } from "../../provider/AssetContext";

function Assets() {
    const assets = useContext(AssetContext);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const assetsPerPage = 20;

    useEffect(() => {
        if (assets && assets.data) {
            setIsLoading(false);
        }
    }, [assets]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0'); 
        const minutes = date.getMinutes().toString().padStart(2, '0'); 
        return `${hours}:${minutes}`;
    };

    const startIndex = (page - 1) * assetsPerPage;
    const endIndex = startIndex + assetsPerPage;
    const currentAssets = assets.data ? assets.data.slice(startIndex, endIndex) : []

    const totalPages = assets.data ? Math.ceil(assets.data.length / assetsPerPage) : 0;

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    
    if (isLoading) {
        return <div className="text-gray-300">Loading...</div>;
    }


    return (
        <div >
            <h1 className="text-gray-300 font-bold mb-2">Activos principales</h1>
                <div className="bg-[#0D0D0D] w-full  rounded-xl p-2 lg:p-5 mb-2">
                    <div className="grid grid-cols-3 p-1 text-[#FF9E47]">
                        <p>Activo</p>
                        <p>Última: {formatTime(assets.timestamp)}</p>
                        <p>Cambio%</p>
                    </div>
                    {currentAssets.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 p-1 border-b border-gray-400 border-opacity-10 hover:bg-gray-800 rounded-xl">
                            <h1  className="text-gray-300">{item.symbol}</h1>
                            <p className="text-gray-300">{parseFloat(item.priceUsd).toFixed(2)} $</p>
                            <p className={`text-gray-300 ${item.changePercent24Hr < 0 ? 'text-red-500' : 'text-green-500'}`}>{parseFloat(item.changePercent24Hr).toFixed(2)} %</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mb">
                    <button className="bg-[#0D0D0D] text-gray-300 rounded-xl hover:bg-[#FF9E47] font-bold py-2 px-4 mr-2" onClick={() => changePage(page - 1)}>Anterior</button>
                    <button className="bg-[#0D0D0D] text-gray-300 rounded-xl hover:bg-[#FF9E47] font-bold py-2 px-4" onClick={() => changePage(page + 1)}>Siguiente</button>
                </div>
        </div>
    );
}

export default Assets;