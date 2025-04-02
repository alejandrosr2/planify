import { useLocation, useNavigate } from "react-router-dom";
import { MdLogout, MdMenu } from "react-icons/md";

const NavBar = ({ selectedAccount, onAccountChange, toggleMenu }) => {
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
      <div className="flex items-center justify-between p-4">
        {/* Menú hamburguesa en móviles */}
        <button className="lg:hidden" onClick={toggleMenu}>
          <MdMenu className="text-2xl" />
        </button>
        <p className="hidden lg:block">
          <span className=" font-bold">Planify</span> / {selectedAccount} / {getPageName()}
        </p>
        <div className="flex items-center gap-4">
          <select
            value={selectedAccount}
            onChange={(e) => onAccountChange(e.target.value)}
            className="bg-bgColor px-1 focus:outline-none focus:ring-hoverColor"
          >
            <option value="Cuenta Ejemplo">Cuenta Ejemplo</option>
            <option value="Cuenta de Prueba">Cuenta de Prueba</option>
          </select>
          <button onClick={handleLogout} className="flex items-center gap-2 hover:text-hoverColor duration-200">
            Log out <MdLogout />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
