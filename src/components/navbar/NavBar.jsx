import { useLocation, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const NavBar = ({ selectedAccount, onAccountChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const getPageName = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    return path.replace("/", "");
  };

  return (
    <div className="relative z-10 border-b border-b-borderColor bg-bgColor">
      <div className="flex">
        <div className="p-4 min-w-[80%]">
          <p>
            app / {selectedAccount} / {getPageName()}
          </p>
        </div>
        <div className="p-4 border-l border-l-borderColor w-full flex justify-between items-center">
          <select
            value={selectedAccount}
            onChange={(e) => onAccountChange(e.target.value)}
            className="bg-bgColor px-1 focus:outline-none focus:ring-hoverColor"
          >
            <option value="Cuenta Ejemplo">Cuenta Ejemplo</option>
            <option value="Cuenta de Prueba">Cuenta de Prueba</option>
          </select>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-hoverColor duration-200"
          >
            Log out<MdLogout />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
