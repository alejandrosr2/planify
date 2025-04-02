import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import BgPages from "./components/bgPages/BgPages";
import NavBar from "./components/navbar/NavBar";
import SideMenu from "./components/sidemenu/SideMenu";
import Calendar from "./pages/calendario/Calendar";
import Resumen from "./pages/resumen/Resumen";
import Actividades from "./pages/work/Actividades";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import useAccountData from "./hooks/useAccountData";
import Commitments from "./pages/commitments/Commitments";

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  const [currentAccount, setCurrentAccount] = useState(() => {
    const storedAccount = localStorage.getItem("selectedAccount") || "Cuenta Ejemplo";
    return storedAccount;
  });

  const [accountData, setAccountData] = useAccountData(currentAccount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    localStorage.setItem("selectedAccount", currentAccount);
  }, [currentAccount]);

  return (
    <>
      {!isLoginRoute && (
        <>
          <NavBar selectedAccount={currentAccount} onAccountChange={setCurrentAccount} toggleMenu={toggleMenu} />
          <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <main className="lg:ml-44">
            <BgPages />
            <div className="mx-auto max-w-screen-xl pt-14">
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Resumen accountData={accountData} setAccountData={setAccountData} />} />
                  <Route path="/calendario" element={<Calendar accountData={accountData} setAccountData={setAccountData} />} />
                  <Route path="/actividades" element={<Actividades accountData={accountData} setAccountData={setAccountData} />} />
                  <Route path="/compromisos" element={<Commitments accountData={accountData} setAccountData={setAccountData} />} />
                </Route>
              </Routes>
            </div>
          </main>
        </>
      )}
      {isLoginRoute && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;