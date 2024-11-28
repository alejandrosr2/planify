import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import BgPages from './components/bgPages/BgPages';
import NavBar from './components/navbar/NavBar';
import SideMenu from './components/sidemenu/SideMenu';
import Calendar from './pages/calendario/Calendar';
import Resumen from './pages/resumen/Resumen';
import Actividades from './pages/work/Actividades';
import Login from './pages/login/Login';
import ProtectedRoute from './components/protected/ProtectedRoute';


function App() {
  const location = useLocation(); // Detecta la ruta actual
  // Comprueba si estás en la ruta de login
  const isLoginRoute = location.pathname === '/login';

  return (
    <>
      {!isLoginRoute && (
        <>
          <div>
            <NavBar />
          </div>
          <div>
            <SideMenu />
          </div>
          <div>
            <main className="ml-44">
              <BgPages />
              <div className="mx-auto max-w-screen-xl pt-14">
                <Routes>
                  <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<Resumen />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/actividades" element={<Actividades />} />
                  </Route>
                </Routes>
              </div>
            </main>
          </div>
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
