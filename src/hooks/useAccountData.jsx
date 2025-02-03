import { useState, useEffect } from "react";

const useAccountData = (accountName) => {
  const storageKey = `${accountName.replace(/ /g, "")}Data`;

  const defaultData = {
    calendar: {},
    activities: [],
    settings: {},
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
  }

  // Estado de carga para evitar sobrescritura de datos
  const [isLoaded, setIsLoaded] = useState(false);
  const [accountData, setAccountData] = useState(defaultData);

  // Cargar datos correctos al cambiar de cuenta
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      console.log("📂 Datos recuperados de localStorage:", JSON.parse(savedData));
      setAccountData(JSON.parse(savedData));
    } else {
      console.log("🆕 No hay datos guardados. Usando valores predeterminados.");
      setAccountData(defaultData);
    }
    setIsLoaded(true); // Solo después de cargar los datos, permitimos guardarlos
  }, [accountName]); // Se ejecuta solo cuando cambia de cuenta

  // Guardar en localStorage solo si ya se cargaron los datos correctos
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(accountData));
    }
  }, [accountData, storageKey, isLoaded]); // Solo guarda si ya cargó los datos correctos

  return [accountData, setAccountData];
};

export default useAccountData;
