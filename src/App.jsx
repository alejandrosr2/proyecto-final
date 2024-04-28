import { RiAlignJustify,RiCloseLine  } from "react-icons/ri";


import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Board from "./components/board/Board";
import Analytics from "./components/analytics/Analytics";
import Assets from "./components/finanAsset/Assets";
import { AssetProvider } from "./provider/AssetContext";
import Login from "./components/login/Login";

function App() {

  const [showMenu, setShowMenu] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogin = (value) => {
    setUserLoggedIn(value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (showMenu && event.target.closest('.sidebar') === null) {
        setShowMenu(false);
      }
    }

    document.body.addEventListener('click', handleClickOutside);
    
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  return (

    
      <div className="bg-[#000000] w-full min-h-screen">
        <Sidebar showMenu={showMenu} handleLogin={handleLogin} userLoggedIn={userLoggedIn}/>
        <nav className=' bg-[#0D0D0D] lg:hidden md:hidden fixed top-0 right-0 text-3xl text-gray-400 p-2 flex items-center justify-between rounded-tl-xl rounded-tr-xl rounded-xl'>
          <button onClick={(e) => {e.stopPropagation(); toggleMenu();}} className="p-2 rounded-xl text-[#FF9E47]">
          {showMenu ? <RiCloseLine /> : <RiAlignJustify/>}
          </button>
        </nav>
        <AssetProvider>
          <main className="lg:pl-72 p-5 lg:pr-60 md:pl-32"> 
            <header>
              <Header userLoggedIn={userLoggedIn}/>
            </header>
              <Routes>
                <Route path="/" element={<Assets/>}/>
                <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                {userLoggedIn ? (
                  <>
                    <Route path="/board" element={<Board/>}/>
                    <Route path="/analytics" element={<Analytics/>}/>
                  </>
                ) : (
                  // Redirigir a la página de inicio de sesión si el usuario no ha iniciado sesión
                  <Route path="*" element={<Navigate to="/login"/>}/>
                )}
              </Routes> 
          </main>
        </AssetProvider>
      </div>
    
    
  );
}

export default App
