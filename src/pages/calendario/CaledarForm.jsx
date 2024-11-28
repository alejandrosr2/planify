// CalendarForm.jsx
import { useState } from 'react';

const CalendarForm = ({ initialDay, initialHour, onClose, onSave }) => {
    const [taskName, setTaskName] = useState('');
    const [selectedDays, setSelectedDays] = useState([initialDay]);
    const [selectedHours, setSelectedHours] = useState([initialHour]);
    const [selectedColor, setSelectedColor] = useState('red'); // Color seleccionado

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hours = Array.from({ length: 16 }, (_, i) => `${i + 7}:00`);

    const handleCheckboxChange = (day) => {
        setSelectedDays((prev) => 
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleHourChange = (hour) => {
        setSelectedHours((prev) => 
            prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour]
        );
    };

    const handleSubmit = () => {
        if (taskName.trim() === '') return alert('Task name is required');
        
        const task = { taskName, selectedDays, selectedHours, selectedColor }; // Incluimos el color
        onSave(task);
        onClose(); // Cerrar el formulario después de guardar
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-bgColor p-6 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Task Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Select Days</label>
                        <div className="flex overflow-auto gap-2">
                            {days.map((day) => (
                                <div key={day} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={day} 
                                        checked={selectedDays.includes(day)} 
                                        onChange={() => handleCheckboxChange(day)} 
                                    />
                                    <label htmlFor={day} className="ml-2">{day}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Select Hours</label>
                        <div className="flex overflow-auto gap-2">
                            {hours.map((hour) => (
                                <div key={hour} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={hour} 
                                        checked={selectedHours.includes(hour)} 
                                        onChange={() => handleHourChange(hour)} 
                                    />
                                    <label htmlFor={hour} className="ml-2">{hour}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Select Task Color</label>
                        <select 
                            value={selectedColor} 
                            onChange={(e) => setSelectedColor(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="yellow">Yellow</option>
                            <option value="purple">Purple</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" className="text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                        <button type="button" className="text-white px-4 py-2 rounded" onClick={handleSubmit}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CalendarForm;
