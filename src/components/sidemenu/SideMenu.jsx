import { Link } from "react-router-dom"

const menuList = [
    { name: "Resumen", href: "/" },
    { name: "Calendario", href: "/calendario" },
    { name: "Actividades", href: "/actividades" },
    { name: "Compromisos", href: "/compromisos" },
]

const SideMenu = () => {
    return (
        <div className="border border-borderColor absolute left-0 top-0 h-full w-44">
            <div className="pt-16 px-2">
                <ul className="">
                    {menuList.map((menu) => (
                        <Link key={menu.href} to={menu.href}>
                            <li className="p-1 hover:bg-hoverColor rounded-lg">
                                {menu.name}
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SideMenu
