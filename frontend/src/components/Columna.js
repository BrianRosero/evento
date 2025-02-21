import React from 'react';

const Columnas = ({ x, y, width, height }) => {
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="#000000"
            stroke="#000000"
            strokeWidth="2"
            transform={`rotate(180, ${x + width / 2}, ${y + height / 2})`}
        />
    );
};

export default Columnas;
