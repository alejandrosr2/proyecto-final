import { useState } from "react"
import users from "../../data/users.json"
import { useNavigate } from "react-router-dom";


const initial_state = {
    username: "",
    password: ""
}

function Login({handleLogin}) {

    const [showPopup, setShowPopup] = useState(true);
    



    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const [formLogin, setFormLogin] = useState(initial_state);
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleInput = (event) => {
    const idInput = event.target.id;
    const valueInput = event.target.value;

    setFormLogin({...formLogin, [idInput]: valueInput});
    };

    const handleClick = (event) => {
        event.preventDefault()
        const userFind = users.find((user) => user.username === formLogin.username && user.password === formLogin.password)

        if(userFind){
            handleLogin(userFind) // userFind pasa el array de data y el formLogin los datos del formulario que pongas
            navigate("/")
        } else {
            setError("Nombre o contraseña incorrectos  (pruebe con test@gmail.com y 1234)")
        }
    }

    return (
    <div>
        {showPopup && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
                <p className="">¡Bienvenido! Por favor, inicia sesión para acceder a todas las funcionalidades. Recuerde que su nombre de usuario es test@gmail.com y su contraseña 1234</p>
                <button onClick={handleClosePopup} className="bg-[#FF9E47] text-white px-4 py-2 rounded-lg mt-4" >Aceptar</button>
            </div>
        )}
        <form className={`${showPopup ? 'filter blur-sm' : ''}`}>
            <div className="bg-[#0D0D0D]  rounded-xl lg:w-80 p-2 lg:p-5 mb-2  grid">
                <label htmlFor="username" className="text-gray-300 pb-2">Usuario</label>
                <input className="border-2 rounded-xl mb-2 w-60 p-1 bg-black text-gray-300 border-gray-400" type="text" id="username" onChange={handleInput}/>
            </div>
            <div className="bg-[#0D0D0D] w-full  rounded-xl lg:w-80 p-2 lg:p-5 mb-2 grid">
                <label htmlFor="password" className="text-gray-300 pb-2">Password</label>
                <input className="border-2 rounded-xl mb-2 w-60 p-1 bg-black text-gray-300 border-gray-400" type="password"  id="password" onChange={handleInput} />

            </div>
            <div>
                <button className="border-2 border-[#FF9E47] rounded-xl w-20  bg-[#FF9E47] text-white hover:bg-white hover:border-white hover:text-[#FF9E47] font-bold p-2 " type="submit" value="login" onClick={handleClick}>login</button>
            </div>
        </form>
        <p className="text-white mt-10">{error}</p>
    </div>
    )
}

export default Login