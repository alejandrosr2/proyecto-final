import { RiLogoutCircleRLine, RiTableFill ,RiBarChartFill,RiEditCircleFill  } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

function Sidebar({showMenu, handleLogin, userLoggedIn}) {

    const location = useLocation();

    // Función para verificar si la ruta actual coincide con la ruta dada
    const isActive = (path) => {
        return location.pathname === path;
    };

    const logOut = () => {
        if(userLoggedIn) {
            handleLogin(null)
        }
    }

    return (
        <div className={`bg-[#0D0D0D] fixed lg:left-0 md:left-0 top-0 w-28 h-full flex  flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${showMenu ? "left-0" : "-left-full"} border-r border-black  lg:border-r-0`}>
            <div>
                <ul className=" pl-4">
                    <li>
                        <h1 className="text-2xl text-gray-300 uppercase font-bold text-center my-5"><Link to="/">blnz</Link></h1>
                    </li>
                    <li className={`hover:bg-[#000000] p-4 rounded-tl-xl rounded-bl-xl group transition-colors ${isActive('/') ? 'bg-[#000000]' : ''}`}>
                        <Link to="/">
                            <button className={`group-hover:bg-[#FF9E47]  p-4 flex justify-center rounded-xl text-[#FF9E47] group-hover:text-white transition-colors ${isActive('/') ? 'bg-[#FF9E47]' : ''} `}>
                                <RiEditCircleFill  className={`text-2xl ${isActive('/') ? 'text-white' : ''}`} />
                            </button>
                        </Link>
                    </li>
                    <li className={`hover:bg-[#000000] p-4 rounded-tl-xl rounded-bl-xl group transition-colors ${isActive('/analytics') ? 'bg-[#000000]' : ''}`}>
                        <Link to="/analytics">
                            <button className={`group-hover:bg-[#FF9E47]  p-4 flex justify-center rounded-xl text-[#FF9E47] group-hover:text-white transition-colors ${isActive('/analytics') ? 'bg-[#FF9E47]' : ''} `}>
                                <RiBarChartFill   className={`text-2xl ${isActive('/analytics') ? 'text-white' : ''}`} />
                            </button>                            
                        </Link>
                    </li>
                    <li className={`hover:bg-[#000000] p-4 rounded-tl-xl rounded-bl-xl group transition-colors ${isActive('/board') ? 'bg-[#000000]' : ''}`}>
                        <Link to="/board">
                            <button className={`group-hover:bg-[#FF9E47]  p-4 flex justify-center rounded-xl text-[#FF9E47] group-hover:text-white transition-colors ${isActive('/board') ? 'bg-[#FF9E47]' : ''} `}>
                                <RiTableFill  className={`text-2xl ${isActive('/board') ? 'text-white' : ''}`} />
                            </button>
                        </Link>
                    </li>                 
                </ul>
            </div>
            
            <div>
                <ul className=" pl-4">
                    <li className="hover:bg-[#000000] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
                        <button onClick={logOut} className="group-hover:bg-[#FF9E47]  p-4 flex justify-center rounded-xl text-[#FF9E47] group-hover:text-white transition-colors">
                            <RiLogoutCircleRLine  className="text-2xl " />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
