
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ["#4ade80", "#facc15", "#f87171"]; // Colores: verde, amarillo, rojo

const ActivityPieChart = ({ steps }) => {
    // Procesar datos para el gráfico
    const data = [
        { name: "Completadas", value: steps.filter(step => step.status === "Terminado").length },
        { name: "En proceso", value: steps.filter(step => step.status === "En proceso").length },
        { name: "Sin empezar", value: steps.filter(step => step.status === "Sin empezar").length },
    ];

    return (
        <div className="w-full h-[660px]">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivityPieChart;
