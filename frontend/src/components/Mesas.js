import React, { useState } from 'react';

const Mesas = ({ mainCircleX, mainCircleY, mesaNumber, reservas }) => {
    const mainCircleRadius = 31;
    const smallCircleRadius = 11;
    const smallCircleCount = 10;

    const [sillasActivas, setSillasActivas] = useState(() => {
        const savedState = localStorage.getItem(`mesa${mesaNumber}`);
        return savedState ? JSON.parse(savedState) : Array.from({ length: smallCircleCount }, () => ({ activa: false, seleccionada: false }));
    });

    const handleSillaClick = (index) => {
        if (sillasActivas[index].activa) {
            const confirmar = window.confirm("¿Estás seguro de cambiar el estado de esta silla?");
            if (!confirmar) return;
        }

        setSillasActivas(prevState => {
            const newState = [...prevState];
            newState[index] = { ...newState[index], activa: !newState[index].activa, seleccionada: true };
            localStorage.setItem(`mesa${mesaNumber}`, JSON.stringify(newState));
            return newState;
        });
    };

    const estaReservado = (sillaNumber) => {
        return reservas ? reservas.some(reserva => reserva.mesa === mesaNumber && reserva.silla === sillaNumber) : false;
    };

    const sillas = Array.from({ length: smallCircleCount }, (_, index) => {
        const angle = (index / smallCircleCount) * Math.PI * 2;
        const x = mainCircleX + Math.cos(angle) * 33;
        const y = mainCircleY + Math.sin(angle) * 33;

        return (
            <circle
                key={index}
                cx={x}
                cy={y}
                r={smallCircleRadius}
                fill={estaReservado(index + 1) ? "red" : (sillasActivas[index].activa ? "red" : "#443131")}
                stroke="#443131"
                strokeWidth="2"
                onClick={() => handleSillaClick(index)}
            />
        );
    });

    const mesa = (
        <g key="table" style={{ cursor: 'pointer' }}>
            <circle
                cx={mainCircleX}
                cy={mainCircleY}
                r={mainCircleRadius}
                fill="#c4c4c4"
                stroke="#c4c4c4"
                strokeWidth="2"
            />
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