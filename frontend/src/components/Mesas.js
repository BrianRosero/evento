import React, { useState, useEffect } from 'react';

const Mesas = ({ mainCircleX, mainCircleY, mesaNumber, reservas }) => {
    const mainCircleRadius = 26; // Reducir el tamaño de las mesas
    const smallCircleRadius = 7; // Reducir el tamaño de las sillas
    const smallCircleCount = 10;

    // Estado local para almacenar el estado de cada silla y si está seleccionada
    const [sillasActivas, setSillasActivas] = useState(() => {
        // Intenta cargar el estado de las sillas desde el almacenamiento local
        const savedState = localStorage.getItem(`mesa${mesaNumber}`);
        return savedState ? JSON.parse(savedState) : Array.from({ length: smallCircleCount }, () => ({ activa: false, seleccionada: false }));
    });

    // Función para manejar el clic en una silla
    const handleSillaClick = (index) => {
        // Verificar si la silla ya está seleccionada
        if (!sillasActivas[index].seleccionada) {
            setSillasActivas(prevState => {
                const newState = [...prevState];
                newState[index] = { ...newState[index], activa: !newState[index].activa, seleccionada: true }; // Cambiar el estado de activo a inactivo o viceversa
                // Guardar el nuevo estado en el almacenamiento local
                localStorage.setItem(`mesa${mesaNumber}`, JSON.stringify(newState));
                return newState;
            });
        }
    };

    // Función para verificar si una silla está reservada
    const estaReservado = (sillaNumber) => {
        if (reservas) {
            return reservas.some(reserva => reserva.mesa === mesaNumber && reserva.silla === sillaNumber);
        } else {
            return false;
        }
    };

    // Calcular las posiciones de las sillas alrededor del círculo principal
    const sillas = Array.from({ length: smallCircleCount }, (_, index) => {
        const angle = (index / smallCircleCount) * Math.PI * 2;
        const x = mainCircleX + Math.cos(angle) * 27; // Reducir la distancia de las sillas al centro
        const y = mainCircleY + Math.sin(angle) * 27; // Reducir la distancia de las sillas al centro

        // Retornar el componente de la silla
        return (
            <circle
                key={index}
                cx={x}
                cy={y}
                r={smallCircleRadius} // Radio para las sillas
                fill={estaReservado(index + 1) ? "red" : (sillasActivas[index].activa ? "red" : "#443131")}
                stroke="#443131"
                strokeWidth="2"
                onClick={() => handleSillaClick(index)} // Manejar el clic en la silla
            />
        );
    });

    // Agregar el círculo grande como mesa con número
    const mesa = (
        <g key="table">
            <circle
                cx={mainCircleX}
                cy={mainCircleY}
                r={mainCircleRadius} // Radio para las mesas
                fill="#c4c4c4"
                stroke="#c4c4c4"
                strokeWidth="2"
            />
            {/* Texto para el número de la mesa */}
            <text
                x={mainCircleX}
                y={mainCircleY}
                dominantBaseline="middle"
                textAnchor="middle"
                fill="black"
                fontSize="20"
                fontWeight="bold"
            >
                {mesaNumber}
            </text>
        </g>
    );

    return (
        <>
            {sillas}
            {mesa}
        </>
    );
};

export default Mesas;
