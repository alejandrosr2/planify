import { Link } from "react-router-dom";

const Resumen = ({ accountData }) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  
  // Filtrar tareas del día actual
  const todayTasks = Object.entries(accountData.calendar || {})
    .filter(([key]) => key.startsWith(today))
    .map(([key, task]) => ({
      hour: key.split("-")[1],
      ...task
    }))
    .sort((a, b) => parseInt(a.hour.split(":")[0]) - parseInt(b.hour.split(":")[0]));

  return (
    <div>
      <h1 className="mb-10">Resumen - {accountData.accountName}</h1>
      <div className="grid grid-cols-2 gap-4 h-[70vh]">
        <div className="basic-card min-h-full p-4 relative group overflow-hidden">
          <h2 className="text-lg font-bold mb-2">Calendario de hoy</h2>
          <ul className="transition-opacity duration-300 group-hover:opacity-0">
            {todayTasks.length > 0 ? (
              todayTasks.map((task, index) => (
                <li
                  key={index}
                  className={`py-1 px-2 mb-2 rounded text-white flex justify-between items-center ${
                    task.color === "red" ? "bg-red" :
                    task.color === "green" ? "bg-green" :
                    task.color === "blue" ? "bg-blue" :
                    task.color === "yellow" ? "bg-yellow" :
                    task.color === "purple" ? "bg-purple" : "bg-gray-500"
                  }`}
                >
                  <span className="font-bold">{task.hour}</span>
                  <span>{task.taskName.toUpperCase()}</span>
                </li>
              ))
            ) : (
              <p>No hay tareas programadas para hoy.</p>
            )}
          </ul>
          <Link
            to="/calendario"
            className="absolute inset-0 flex justify-center items-center text-lg font-bold text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Ir al calendario
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="basic-card flex-1">
            {/* Sección para actividades */}
            <h3 className="text-lg font-semibold mb-2">Actividades Recientes</h3>
            <ul>
              {accountData.activities?.slice(0, 3).map((activity, index) => (
                <li key={index} className="py-1">
                  {activity.name} - {activity.status}
                </li>
              ))}
            </ul>
          </div>
          <div className="basic-card flex-1">
            {/* Espacio para futuras secciones */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumen;