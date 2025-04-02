import { useState } from "react";
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (username === "1234" && password === "1234") {
            localStorage.setItem("isAuthenticated", "true"); 
            navigate("/"); 
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
                                placeholder="1234"    
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-semibold">Password</label>
                            <input 
                                type="password" 
                                className="bg-[#202024] p-1 rounded-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="1234"
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
            <div className="hidden md:flex w-full min-h-full  justify-center items-center bg-green/80">
                <img src={logo} className="size-60 drop-shadow-[0_0_5px_hsl(120,50%,00%)]" />
            </div>
        </div>
    )
}

export default Login
