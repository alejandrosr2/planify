import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ActivityPieChart from "./PieChart";

const Actividades = () => {
    const [toDo, setToDo] = useState(() => {
        const savedToDo = localStorage.getItem("toDo");
        return savedToDo
        ? JSON.parse(savedToDo)
        : [
            {
                id: 1,
                task: "Examen de economía",
                steps: [
                    { id: 1, text: "Estudiar tema 1", status: "Terminado" },
                    { id: 2, text: "Revisar tema 2", status: "En proceso" },
                    { id: 3, text: "Hacer ejercicios", status: "Sin empezar" }
                ],
                status: "Sin empezar"
            },
        ];
});

    const [selectedTask, setSelectedTask] = useState(null); // Para la tarea seleccionada

    // Maneja la adición de una nueva tarea
    const handleAddActivity = () => {
        const newTask = prompt("Introduce una nueva tarea:");
        if (newTask) {
            const newToDo = [
                ...toDo,
                { id: toDo.length + 1, task: newTask, steps: [], status: "Sin empezar" }
            ];
            setToDo(newToDo);
            localStorage.setItem("toDo", JSON.stringify(newToDo));
        }
    };

    // Maneja la eliminación de una tarea
    const handleDeleteActivity = (id) => {
        const newToDo = toDo.filter(task => task.id !== id);
        setToDo(newToDo);
        localStorage.setItem("toDo", JSON.stringify(newToDo));
        if (selectedTask?.id === id) setSelectedTask(null); // Si la tarea eliminada es la seleccionada, resetea
    };

    // Maneja la selección de una tarea
    const handleSelectTask = (task) => {
        setSelectedTask(task);
    };

    // Maneja la adición de pasos a la tarea seleccionada
    const handleAddStep = () => {
        const newStep = prompt("Introduce un nuevo paso:");
        if (newStep && selectedTask) {
            const updatedTask = {
                ...selectedTask,
                steps: [...selectedTask.steps, { id: Date.now(), text: newStep, status: "Sin empezar" }]
            };
            const updatedToDo = toDo.map(task =>
                task.id === selectedTask.id ? updatedTask : task
            );
            setToDo(updatedToDo);
            setSelectedTask(updatedTask); // Actualiza la tarea seleccionada
            localStorage.setItem("toDo", JSON.stringify(updatedToDo));
        }
    };

    // Maneja el cambio de estado de un paso
    const handleChangeStepStatus = (stepId, newStatus) => {
        if (selectedTask) {
            const updatedSteps = selectedTask.steps.map(step =>
                step.id === stepId ? { ...step, status: newStatus } : step
            );
            const updatedTask = { ...selectedTask, steps: updatedSteps };
            const updatedToDo = toDo.map(task =>
                task.id === selectedTask.id ? updatedTask : task
            );
            setToDo(updatedToDo);
            setSelectedTask(updatedTask);
            localStorage.setItem("toDo", JSON.stringify(updatedToDo));
        }
    };

    return (
        <div>
            <h1 className="mb-10">Actividades</h1>
            <div className="flex gap-4 min-h-[660px]">
                {/* Lista de tareas */}
                <div className="w-full min-h-full grid col-span-2 gap-2">
                    <div className="basic-card flex flex-col p-4 max-h-[330px] min-h-[330px]">
                        <div className="flex justify-between w-full  pb-4">
                            <h2 className="text-xl font-semibold">Trabajo por hacer</h2>
                            <button onClick={handleAddActivity} className="text-lg font-bold hover:text-hoverColor duration-200"><MdAddCircle /></button>
                        </div>
                        <div>
                            {toDo.length === 0 ? (
                                <p>No hay tareas por hacer.</p>
                            ) : (
                                <ul>
                                    {toDo.map(task => (
                                        <li key={task.id} className="flex justify-between gap-4 items-center">
                                            <span
                                                onClick={() => handleSelectTask(task)}
                                                className="cursor-pointer w-full hover:bg-hoverColor rounded-lg px-2"
                                            >
                                                {task.task}
                                            </span>
                                            <button
                                                onClick={() => handleDeleteActivity(task.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="basic-card max-h-[300px] min-h-[330px]">
                        {selectedTask ? (
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">
                                    {selectedTask.task}
                                </h3>
                                <button onClick={handleAddStep}>Añadir paso</button>
                                <ul>
                                    {selectedTask.steps.map(step => (
                                        <li key={step.id} className="flex justify-between items-center space-y-1">
                                            <span className={`rounded-lg w-full px-2 
                                                ${step.status === "Sin empezar" ? "bg-red" : 
                                                step.status === "En proceso" ? "bg-yellow" : 
                                                "bg-green"}`}>{step.text}</span>
                                            <select
                                                value={step.status}
                                                onChange={e =>
                                                    handleChangeStepStatus(step.id, e.target.value)
                                                }
                                                className="ml-2 rounded-lg"
                                            >
                                                <option value="Sin empezar">Sin empezar</option>
                                                <option value="En proceso">En proceso</option>
                                                <option value="Terminado">Terminado</option>
                                            </select>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>Selecciona una tarea para ver los detalles.</p>
                        )}
                    </div>
                </div>
                <div className="basic-card w-full min-h-full flex justify-center items-center">
                    {selectedTask ? (
                        <ActivityPieChart steps={selectedTask.steps} />
                            ) : (
                                <p>Selecciona una tarea para ver el gráfico.</p>
                            )}
                </div>
            </div>
        </div>
    );
};

export default Actividades;
