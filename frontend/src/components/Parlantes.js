import React from 'react';

const Parlantes = ({ x, y, width, height }) => {
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="#8c8c8c"
            stroke="#666666"
            strokeWidth="2"
            transform={`rotate(180, ${x + width / 2}, ${y + height / 2})`}
        />
    );
};

export default Parlantes;
