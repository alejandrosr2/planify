import { useState, useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import ActivityPieChart from "./PieChart";

const Actividades = ({ accountData, setAccountData }) => {
    const activities = accountData.activities || [];
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (selectedTask) {
            const currentTask = activities.find((t) => t.id === selectedTask.id);
            setSelectedTask(currentTask || null);
        } else {
            setSelectedTask(null);
        }
    }, [accountData]);

    const updateActivities = (newActivities) => {
        setAccountData((prevData) => ({
            ...prevData,
            activities: newActivities,
        }));
    };

    const handleAddActivity = () => {
        const newTask = prompt("Introduce una nueva tarea:");
        if (newTask) {
            const newToDo = [
                ...activities,
                { id: Date.now(), task: newTask, steps: [], status: "Sin empezar" },
            ];
            updateActivities(newToDo);
        }
    };

    const handleDeleteActivity = (id) => {
        const newToDo = activities.filter((task) => task.id !== id);
        updateActivities(newToDo);
        if (selectedTask?.id === id) setSelectedTask(null);
    };

    const handleSelectTask = (task) => {
        setSelectedTask(task);
    };

    const handleAddStep = () => {
        const newStep = prompt("Introduce un nuevo paso:");
        if (newStep && selectedTask) {
            const updatedSteps = [
                ...selectedTask.steps,
                { id: Date.now(), text: newStep, status: "Sin empezar" }
            ];

            const updatedTask = { ...selectedTask, steps: updatedSteps };

            const updatedToDo = activities.map((task) =>
                task.id === selectedTask.id ? updatedTask : task
            );

            updateActivities(updatedToDo);
        }
    };

    const handleChangeStepStatus = (stepId, newStatus) => {
        if (selectedTask) {
            const updatedSteps = selectedTask.steps.map((step) =>
                step.id === stepId ? { ...step, status: newStatus } : step
            );
            
            const updatedTask = { ...selectedTask, steps: updatedSteps };
            
            const updatedToDo = activities.map((task) =>
                task.id === selectedTask.id ? updatedTask : task
            );

            updateActivities(updatedToDo);
        }
    };

    return (
        <div>
            <h1 className="mb-10 p-1">Actividades</h1>
            <div className="flex flex-col md:flex-row gap-4 min-h-[660px] p-1">
                {/* Lista de tareas */}
                <div className="w-full min-h-full grid col-span-2 gap-2">
                    {/* Actividades generales */}
                    <div className="basic-card flex flex-col p-4 max-h-[330px] min-h-[330px]">
                        <div className="flex justify-between w-full pb-4">
                            <h2 className="text-xl font-semibold">Trabajo por hacer</h2>
                            <button onClick={handleAddActivity} className="text-lg font-bold hover:text-hoverColor duration-200">
                                <MdAddCircle />
                            </button>
                        </div>
                        <div>
                            {activities.length === 0 ? (
                                <p>No hay tareas por hacer.</p>
                            ) : (
                                <ul>
                                    {activities.map((task) => (
                                        <li key={task.id} className="flex justify-between gap-4 items-center">
                                            <span
                                                onClick={() => handleSelectTask(task)}
                                                className="py-1 cursor-pointer w-full hover:bg-hoverColor rounded-lg px-2"
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
                    {/* Pasos de las actividades */}
                    <div className="basic-card flex flex-col p-4 max-h-[330px] min-h-[330px]">
                        {selectedTask ? (
                            <div>
                                <div className="flex justify-between w-full pb-4">
                                    <h3 className="text-lg font-semibold">{selectedTask.task}</h3>
                                    <button onClick={handleAddStep} className=" hover:text-hoverColor duration-200 text-lg font-bold"><MdAddCircle /></button>
                                </div>
                                <ul>
                                    {selectedTask.steps.map((step) => (
                                        <li key={step.id} className="flex justify-between items-center space-y-1">
                                            <span
                                                className={`rounded-lg w-full px-2 ${
                                                    step.status === "Sin empezar"
                                                        ? "bg-red"
                                                        : step.status === "En proceso"
                                                        ? "bg-yellow"
                                                        : "bg-green"
                                                }`}
                                            >
                                                {step.text}
                                            </span>
                                            <select
                                                value={step.status}
                                                onChange={(e) => handleChangeStepStatus(step.id, e.target.value)}
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
                            <p className="p-4">Selecciona una tarea para ver los detalles.</p>
                        )}
                    </div>
                </div>
                {/* Gráfico */}
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
