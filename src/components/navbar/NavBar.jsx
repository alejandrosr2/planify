import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";


const NavBar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Eliminar la autenticación del localStorage
        navigate("/login"); // Redirigir al login
    };

    return (
        <div className="relative z-10 border-b border-b-borderColor bg-bgColor ">
            <div className="flex">
                <div className="p-4  min-w-[80%]">
                    <p>hola / ASDAdf / asgasdf</p>
                </div>
                <div className="p-4 border-l border-l-borderColor w-full flex justify-between">
                    <p className="">hey</p>
                    <button onClick={handleLogout} className="flex items-center gap-2 hover:text-hoverColor duration-200">
                        Log out<MdLogout />
                    </button>
                </div>        
            </div>
        </div>
    )
}

export default NavBar
