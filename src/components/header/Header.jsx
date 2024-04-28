import { useEffect, useState } from "react";


function Header({userLoggedIn}) {

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        
        const updateDate = () => {
            const now = new Date();
            if (now.getDate() !== currentDate.getDate()) {
                setCurrentDate(now);
            }
        };

        const intervalId = setInterval(updateDate, 30000);
        updateDate();
        
        return () => clearInterval(intervalId);
    }, [currentDate]); 

    return (
        <>
        <div className="mb-6">
            <h1 className="text-2xl text-gray-300">Bienvenido {userLoggedIn ? userLoggedIn.username : ""}</h1>
            <p className="text-gray-500">{currentDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        
        </>
    )
}

export default Header
