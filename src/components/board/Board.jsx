import { useContext, useEffect, useState } from "react";
import DayCharts from "../charts/DayCharts";
import { AssetContext } from "../../provider/AssetContext";

function Board() {
    const assets = useContext(AssetContext);
    const [prices, setPrices] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [totalValue, setTotalValue] = useState(0);
    const [userAssets, setUserAssets] = useState([]);
    const [newAsset, setNewAsset] = useState({ name: "", amount: "" });
    const [assetSymbols, setAssetSymbols] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (assets && assets.data) {
            const pricesData = {};
            const symbols = [];
            assets.data.forEach((asset) => {
                pricesData[asset.symbol] = parseFloat(asset.priceUsd).toFixed(2);
                symbols.push(asset.symbol);
            });
            setPrices(pricesData);
            setAssetSymbols(symbols);
            setIsLoading(false);
        }
    }, [assets]);

    useEffect(() => {
        if (!isLoading && Object.keys(prices).length > 0) {
            let sum = 0;
            userAssets.forEach((item) => {
                if (prices[item.name]) {
                    const price = parseFloat(prices[item.name]);
                    const amount = parseFloat(item.amount);
                    sum += price * amount;
                }
            });
            setTotalValue(sum.toFixed(2));
        }
    }, [prices, isLoading, userAssets]);

    useEffect(() => {
        // Leer datos del localStorage al cargar el componente
        const storedAssets = JSON.parse(localStorage.getItem("userAssets")) || [];
        setUserAssets(storedAssets);
    }, []);


    const handleAddAsset = (e) => {
        e.preventDefault();
        if (newAsset.name && newAsset.amount) {
            const updatedAssets = [...userAssets, newAsset];
            localStorage.setItem("userAssets", JSON.stringify(updatedAssets));
            setUserAssets(updatedAssets);
            setNewAsset({ name: "", amount: "" });
        }
    };

    const handleNameChange = (e) => {
        setNewAsset({ ...newAsset, name: e.target.value.toUpperCase() });
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setNewAsset({ ...newAsset, name: suggestion });
        setShowSuggestions(false);
    };

    const handleRemoveAsset = (indexToRemove) => {
        const updatedAssets = userAssets.filter((item, index) => index !== indexToRemove);
        localStorage.setItem("userAssets", JSON.stringify(updatedAssets));
        setUserAssets(updatedAssets);
    };


    if (isLoading) {
        return <div className="text-gray-300">Loading...</div>;
    }

    const suggestions = assetSymbols.filter((symbol) =>
        symbol.includes(newAsset.name)
    );

    return (
        <div className="grid grid-cols-1">
            <div className="bg-[#0D0D0D] w-full  rounded-xl p-2 lg:p-5 mb-6">
                <h2 className="text-gray-300 mb-4 font-bold">Balance: {totalValue}$</h2>
                <form onSubmit={handleAddAsset} className="mb-4">
                    <div className="lg:flex lg:items-center">
                        <div className="relative mr-2">
                            <input
                                type="text"
                                value={newAsset.name}
                                onChange={handleNameChange}
                                placeholder="Nombre del activo"
                                className="bg-black text-gray-300 p-1 rounded"
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setShowSuggestions(false)}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-10 bg-black text-gray-300 p-1 rounded w-full max-h-40 overflow-y-auto">
                                    {suggestions.map((suggestion) => (
                                        <li className="hover:cursor-pointer hover:text-[#FF9E47] border-b border-gray-400 border-opacity-10" key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            type="number"
                            value={newAsset.amount}
                            onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
                            placeholder="Cantidad"
                            className="bg-black text-gray-300 p-1 rounded mr-2 mt-3 lg:mt-0"
                        />
                        <div className="pt-3 lg:pt-0">
                            <button type="submit" className="bg-[#FF9E47] text-white px-4 py-1 rounded-lg">Añadir</button>
                        </div>
                    </div>
                </form>
                <table className="table-fixed w-full text-gray-300 px-2">
                    <thead className="border-b mb-5">
                        <tr>
                            <th className="text-left">Activo</th>
                            <th className="text-left">Precio</th>
                            <th className="text-left">Cant. Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-400 divide-opacity-10">
                        {userAssets.map((item, index) => (
                            <tr key={index}>
                                <td className="py-1 pt-4">{item.name}</td>
                                <td className="py-1 pt-4">{prices[item.name] !== undefined ? prices[item.name] : "Cargando..."} $</td>
                                <td className="py-1 pt-4">{item.amount}</td>
                                <td><button onClick={() => handleRemoveAsset(index)} className="bg-[#FF9E47] hover:bg-red-500 text-white px-4 py-1 rounded-lg">Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-[#0D0D0D] w-full h-60 lg:h-96 rounded-xl p-2 lg:mt-10">
                <DayCharts/>
            </div>
        </div>
    );
}

export default Board;
