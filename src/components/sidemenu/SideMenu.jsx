import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

const menuList = [
  { name: "Resumen", href: "/" },
  { name: "Calendario", href: "/calendario" },
  { name: "Actividades", href: "/actividades" },
  { name: "Compromisos", href: "/compromisos" },
];

const SideMenu = ({ isOpen, toggleMenu }) => {
  return (
    <>
      {/* Fondo oscuro cuando el menú está abierto en móviles */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden z-10" onClick={toggleMenu}></div>}
      <div className={`fixed top-0 left-0 h-full w-44 z-40 md:z-0 bg-bgColor border-r border-borderColor transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:block`}>
        {/* Botón de cerrar en móviles*/}
        <button className="absolute top-4 right-4 lg:hidden" onClick={toggleMenu}>
          <MdClose className="text-2xl" />
        </button>
        <div className="pt-16 px-2">
          <ul>
            {menuList.map((menu) => (
              <Link key={menu.href} to={menu.href} onClick={toggleMenu}>
                <li className="p-2 hover:bg-hoverColor rounded-lg">{menu.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
