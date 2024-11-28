// Calendar.jsx
import { useState } from 'react';
import CalendarForm from './CaledarForm';


const Calendar = () => {
    // Horas del día
    const hours = Array.from({ length: 16 }, (_, i) => `${i + 7}:00`);

    // Días de la semana
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Estado para almacenar tareas
    const [tasks, setTasks] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState({ day: '', hour: '' });

    // Mostrar el formulario
    const showForm = (day, hour) => {
        setSelectedTime({ day, hour });
        setIsFormVisible(true);
    };

    // Cerrar el formulario
    const closeForm = () => {
        setIsFormVisible(false);
    };

    // Guardar la tarea
    const saveTask = (task) => {
        const { taskName, selectedDays, selectedHours, selectedColor } = task;

        selectedDays.forEach(day => {
            selectedHours.forEach(hour => {
                const key = `${day}-${hour}`;
                setTasks((prev) => ({
                    ...prev,
                    [key]: { taskName, color: selectedColor }, // Guardamos el color
                }));
            });
        });
    };

    return (
        <div>
            <h1 className="mb-10">Weekly Calendar</h1>
            <div className="overflow-auto border border-borderColor bg-borderColor rounded-lg p-[2px]">
                <table className="table-auto border-collapse w-full bg-bgColor z-50">
                    {/* Header: Días de la semana */}
                    <thead>
                        <tr className="border-b border-b-borderColor">
                            <th className="p-2">Hours</th>
                            {days.map((day) => (
                                <th key={day} className="p-2">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Filas: Horas del día */}
                        {hours.map((hour) => (
                            <tr key={hour}>
                                <td className="border-b border-r border-borderColor p-2 text-center ">{hour}</td>
                                {days.map((day) => {
                                    const key = `${day}-${hour}`;
                                    const task = tasks[key];
                                    return (
                                        <td 
                                            key={key} 
                                            className={`border-b border-borderColor p-2 cursor-pointer ${task ? 'bg-selected' : 'hover:bg-hoverColor'}`}
                                            onClick={() => showForm(day, hour)}
                                        >
                                            {task ? (
                                                <ul className="space-y-1">
                                                    <li 
                                                        className={`text-xs p-1 rounded ${
                                                            task.color === 'red' ? 'bg-red' :
                                                            task.color === 'green' ? 'bg-green' :
                                                            task.color === 'blue' ? 'bg-blue' :
                                                            task.color === 'yellow' ? 'bg-yellow' :
                                                            task.color === 'purple' ? 'bg-purple' : ''
                                                        }`}  
                                                    >
                                                        {task.taskName.toUpperCase()}
                                                    </li>
                                                </ul>
                                            ) : null}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mostrar el formulario si está activo */}
            {isFormVisible && (
                <CalendarForm 
                    initialDay={selectedTime.day} 
                    initialHour={selectedTime.hour} 
                    onClose={closeForm} 
                    onSave={saveTask} 
                />
            )}
        </div>
    );
};

export default Calendar;
