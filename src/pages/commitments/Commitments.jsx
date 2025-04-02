// Commitments.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Commitments = ({ accountData, setAccountData }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newCommitment, setNewCommitment] = useState({
        title: "",
        description: "",
        date: "",
        hour: "",
        color: "blue",
        id: Date.now()
    });

    const commitments = (accountData.commitments || [])
        .map(c => ({
            ...c,
            date: c.date.split('-').reverse().join('/') // Formatea la fecha a dd/mm/yyyy
        }))
        .sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('/');
            const [dayB, monthB, yearB] = b.date.split('/');
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
        return dateA - dateB;
    });

    const saveCommitment = () => {
        if (!newCommitment.title || !newCommitment.date) return;

        const formattedDate = newCommitment.date.split('-').reverse().join('/');
        
        const updatedCommitments = [
            ...accountData.commitments,
            {
                ...newCommitment,
                id: Date.now(),
                date: formattedDate
            }
            ];
            
        setAccountData(prev => ({
            ...prev,
            commitments: updatedCommitments
        }));
        
        setIsFormVisible(false);
        setNewCommitment({
            title: "",
            description: "",
            date: "",
            hour: "",
            color: "blue",
            id: Date.now()
        });
    };

    const handleDeleteCommitment = (id) => {
        const updatedCommitments = accountData.commitments.filter(c => c.id !== id);
        setAccountData(prev => ({
        ...prev,
        commitments: updatedCommitments
        }));
    };

    const handleChange = (e) => {
        setNewCommitment(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <h1 className="mb-10 p-1">Compromisos Importantes</h1>
            <div className="grid grid-cols-1 gap-4 p-1">
                <div className="basic-card p-4">
                    <h2 className="text-lg font-bold mb-4">Tus próximos compromisos</h2>
                    <ul className="space-y-2">
                    {commitments.length > 0 ? (
                    commitments.map((commitment) => (
                        <li
                        key={commitment.id}
                        className={`py-2 px-4 rounded text-white flex justify-between items-center ${
                            commitment.color === "red" ? "bg-red" :
                            commitment.color === "green" ? "bg-green" :
                            commitment.color === "blue" ? "bg-blue" :
                            commitment.color === "yellow" ? "bg-yellow" :
                            commitment.color === "gray" ? "bg-bgHeader" : "bg-gray-500"
                        }`}>
                            <div className="flex-1">
                                <span className="font-semibold">{commitment.title}</span>
                                <p className="text-sm">{commitment.description}</p>
                            </div>
                            <div className="text-right mx-4">
                                <span className="block">{commitment.date}</span>
                                <span>{commitment.hour}</span>
                            </div>
                            <button
                                onClick={() => handleDeleteCommitment(commitment.id)}
                                className="ml-2 text-white hover:text-red-300"
                                title="Eliminar"
                            >
                                x
                            </button>
                        </li>
                    ))
                    ) : (
                        <p>No tienes compromisos programados.</p>
                    )}
                    </ul>
                </div>
                <div className="basic-card p-4">
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                >
                    Agregar nuevo compromiso
                </button>
                {isFormVisible && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Nuevo Compromiso</h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                name="title"
                                value={newCommitment.title}
                                onChange={handleChange}
                                placeholder="Título"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <textarea
                                name="description"
                                value={newCommitment.description}
                                onChange={handleChange}
                                placeholder="Descripción"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="date"
                                name="date"
                                value={newCommitment.date}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="time"
                                name="hour"
                                value={newCommitment.hour}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            <select
                                name="color"
                                value={newCommitment.color}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="blue">Azul</option>
                                <option value="red">Rojo</option>
                                <option value="green">Verde</option>
                                <option value="yellow">Amarillo</option>
                                <option value="gray">Gris</option>
                            </select>
                            <div className="flex gap-2">
                                <button
                                    onClick={saveCommitment}
                                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded flex-1"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setIsFormVisible(false)}
                                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded flex-1"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};

export default Commitments;