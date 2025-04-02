
const exampleAccountData = {
    tasks: {},
};

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

weekdays.forEach((day) => {
    for (let hour = 7; hour < 9; hour++) {
        const key = `${day}-${hour}:00`;
        exampleAccountData.tasks[key] = { taskName: "Gym", color: "green" };
    }
});

weekdays.forEach((day) => {
    for (let hour = 9; hour < 17; hour++) {
        const key = `${day}-${hour}:00`;
        exampleAccountData.tasks[key] = { taskName: "Trabajo", color: "blue" };
    }
});

const testAccountData = { tasks: {} };

export { exampleAccountData, testAccountData };
