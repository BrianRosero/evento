import React from 'react';

const Gradas = ({ x, y, width, height }) => {
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="#ffffff"
            stroke="#bdbdbd"
            strokeWidth="2"
            transform={`rotate(-25, ${x + width / 2}, ${y + height / 2})`}
        />
    );
};

export default Gradas;
