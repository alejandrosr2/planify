import { useState, useEffect } from "react";

const useAccountData = (accountName) => {
  const storageKey = `${accountName.replace(/ /g, "")}Data`;

  const defaultData = {
    calendar: {},
    activities: [],
    settings: {},
    commitments: [],
  };

  if (accountName === "Cuenta Ejemplo") {
    defaultData.calendar = {};
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    weekdays.forEach((day) => {
      for (let hour = 7; hour < 9; hour++) {
        defaultData.calendar[`${day}-${hour}:00`] = {
          taskName: "Gym",
          color: "green",
        };
      }
      for (let hour = 9; hour < 17; hour++) {
        defaultData.calendar[`${day}-${hour}:00`] = {
          taskName: "Trabajo",
          color: "blue",
        };
      }
    });
    defaultData.activities = [
      {
        id: 1,
        task: "Examen de economía",
        steps: [
          { id: 1, text: "Estudiar tema 1", status: "Terminado" },
          { id: 2, text: "Revisar tema 2", status: "En proceso" },
          { id: 3, text: "Hacer ejercicios", status: "Sin empezar" }
        ],
        status: "Sin empezar"
      }
    ];
    defaultData.commitments = [
      {
        id: 1,
        title: "Cita Médica",
        description: "Chequeo general",
        date: "2025-02-06",
        hour: "10:00",
        color: "red",
      },
      {
        id: 2,
        title: "Entrevista de Trabajo",
        description: "Entrevista con la empresa XYZ",
        date: "2025-02-07",
        hour: "15:00",
        color: "green",
      },
    ]
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [accountData, setAccountData] = useState(defaultData);

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      setAccountData(JSON.parse(savedData));
    } else {
      setAccountData(defaultData);
    }
    setIsLoaded(true); 
  }, [accountName]); 

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(accountData));
    }
  }, [accountData, storageKey, isLoaded]); 
  return [accountData, setAccountData];
};

export default useAccountData;
