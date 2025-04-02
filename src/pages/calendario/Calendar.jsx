import { useState } from "react";
import CalendarForm from "./CaledarForm";

const Calendar = ({ accountData, setAccountData }) => {
  const hours = Array.from({ length: 16 }, (_, i) => `${i + 7}:00`);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const calendarData = accountData.calendar || {};

  const saveTask = (task) => {
    const { taskName, selectedDays, selectedHours, selectedColor } = task;
    const newCalendarData = { ...calendarData };

    selectedDays.forEach(day => {
      selectedHours.forEach(hour => {
        const key = `${day}-${hour}`;
        newCalendarData[key] = { taskName, color: selectedColor };
      });
    });
    setAccountData(prev => ({
      ...prev,
      calendar: newCalendarData
    }));
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState({ day: "", hour: "" });

  const showForm = (day, hour) => {
    setSelectedTime({ day, hour });
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <h1 className="mb-10 p-1">Calendario - {accountData.accountName}</h1>
      <div className="overflow-auto  border-borderColor bg-borderColor rounded-lg p-[2px]">
        <table className="table-auto border-collapse w-full bg-bgColor z-50">
          <thead>
            <tr className="border-b border-b-borderColor">
              <th className="p-2">Horas</th>
              {days.map((day) => (
                <th key={day} className="p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="border-b border-r border-borderColor p-2 text-center">{hour}</td>
                {days.map((day) => {
                  const key = `${day}-${hour}`;
                  const task = calendarData[key];
                  return (
                    <td
                      key={key}
                      className={`border-b border-borderColor p-2 cursor-pointer ${
                        task ? "bg-selected" : "hover:bg-hoverColor"
                      }`}
                      onClick={() => showForm(day, hour)}
                    >
                      {task && (
                        <div className={`text-xs p-1 rounded ${task.color ? `bg-${task.color}` : 'bg-gray-500'}`}>
                          {task.taskName.toUpperCase()}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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