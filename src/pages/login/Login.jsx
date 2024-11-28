import { useState } from "react";
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";


const Login = () => {

      // Manejo de los valores de usuario y contraseña
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Hook para redirigir a la página principal
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Verificar las credenciales
        if (username === "1234" && password === "1234") {
            localStorage.setItem("isAuthenticated", "true"); // Guardamos la autenticación
            navigate("/"); // Redirigimos al home
        } else {
            alert("Credenciales incorrectas.");
        }
    };

    return (
        <div className="flex w-full min-h-screen">
            <div className="w-full min-h-full flex justify-center items-center ">
                <div className="border border-borderColor bg-bgColor rounded-lg h-80 w-80 drop-shadow-[0_0_5px_hsl(120,50%,30%)]">
                    <form className="p-4 space-y-10 pt-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-lg font-semibold">Username</label>
                            <input 
                                type="text" 
                                className="bg-[#202024] p-1 rounded-lg" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}    
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-semibold">Password</label>
                            <input 
                                type="password" 
                                className="bg-[#202024] p-1 rounded-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="rounded-lg bg-green/80 hover:drop-shadow-[0_0_5px_hsl(120,50%,30%)] duration-300 py-1 px-4">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full min-h-full flex justify-center items-center bg-green/80">
                <img src={logo} className="size-60 drop-shadow-[0_0_5px_hsl(120,50%,00%)]" />
            </div>
        </div>
    )
}

export default Login
