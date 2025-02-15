import React, {Component} from 'react';
import Mesas from './Mesas';
import Columnas from "./Columna";
import Gradas from "./Grada";

class Plano2 extends Component {
    constructor(props) {
        super(props);
        // Estado inicial con todas las mesas activas
        this.state = {
            mesasActivas: {},
        };
    }

    // Función para manejar el clic en una mesa
    handleMesaClick = (mesaNumber) => {
        console.log('Clic en la mesa', mesaNumber); // Verificar si el controlador de clic se está activando
        this.setState(prevState => ({
            mesasActivas: {
                ...prevState.mesasActivas,
                [mesaNumber]: !prevState.mesasActivas[mesaNumber] // Cambiar el estado de activo a inactivo o viceversa
            }
        }));
    }

    render() {
        const planoWidth = 2000;
        const planoHeight = 1000;
        const tarimaWidth = 620;
        const tarimaHeight = 200;
        const tarimaX = (planoWidth - tarimaWidth) / 2 - 800;
        const tarimaY = (planoHeight - tarimaHeight) / 2 - 40;
        const salonWidth = 200;
        const salonHeight = 340;
        const salonX = (planoWidth - salonWidth) / 2 + 10;
        const salonY = (planoHeight - salonHeight) / 2 - 250;
        const jardinWidth = 570;
        const jardinHeight = 1300;
        const jardinX = (planoWidth - jardinWidth) / 2 -280;
        const jardinY = (planoHeight - jardinHeight) / 2 - 270 ;
        const banoWidth = 210;
        const banoHeight = 110;
        const banoX = (planoWidth - banoWidth) / 2 + 246;
        const banoY = (planoHeight - banoHeight) / 2 - 233;
        const cajaWidth = 160;
        const cajaHeight = 120;
        const cajaX = (planoWidth - cajaWidth) / 2 - 420;
        const cajaY = (planoHeight - cajaHeight) / 2 + 320;
        const materaWidth = 850;
        const materaHeight = 50;
        const materaX = (planoWidth - materaWidth) / 2 - 540;
        const materaY = (planoHeight - materaHeight) / 2 - 180;
        const mainCircleRadius = 37;
        const mainCircleX = tarimaX + tarimaWidth - 140;
        const mainCircleY = tarimaY + tarimaHeight / 2 - 260;

        // Función para seleccionar un elemento aleatorio de una lista
        function getRandomElement(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

// Generar el patrón de césped con tonos de verde aleatorios para cada píxel
        const grassPatternId = "grassPattern";
        const grassPatternSize = 8; // Tamaño de cada cuadro de césped

        return (

            <div>
                <svg width={planoWidth} height={planoHeight}>
                    <defs>
                        <pattern
                            id={grassPatternId}
                            width={grassPatternSize}
                            height={grassPatternSize}
                            patternUnits="userSpaceOnUse"
                        >
                            {[...Array(grassPatternSize)].map((_, rowIndex) =>
                                [...Array(grassPatternSize)].map((_, colIndex) => (
                                    <rect
                                        key={`${rowIndex}-${colIndex}`}
                                        x={colIndex}
                                        y={rowIndex}
                                        width={1}
                                        height={1}
                                        fill="#cdcdcd"
                                        stroke="#bdbdbd"
                                    />
                                ))
                            )}
                        </pattern>
                    </defs>
                    <polygon
                        points={`${jardinX},${jardinY} ${jardinX},${jardinY + jardinHeight} ${jardinX + jardinWidth},${jardinY + jardinHeight}`} // Coordenadas de los vértices del triángulo rectángulo (esquina inferior izquierda, esquina superior izquierda, esquina inferior derecha)
                        fill={`url(#${grassPatternId})`} // Relleno con el patrón de césped
                        stroke="#bdbdbd" // Color del borde
                        strokeWidth="2" // Ancho del borde
                        transform={`rotate(90, ${jardinX + jardinWidth / 2}, ${jardinY + jardinHeight / 2})`} // Rotación de 90 grados alrededor del centro del triángulo
                    />
                    {/* Texto para la jardin */}
                    <text
                        x={jardinX + jardinWidth / 50}
                        y={jardinY + jardinHeight / 2.4}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="black"
                        fontSize="14"
                        fontWeight="bold"
                        transform={`rotate(0, ${jardinX + jardinWidth / 2}, ${jardinY + jardinHeight / 2})`}
                    >
                        Espacio libre  (Salon)
                    </text>
                    {/* Rectángulo para la caja */}
                    <rect
                        x={cajaX}
                        y={cajaY}
                        width={cajaWidth}
                        height={cajaHeight}
                        fill="#9d191f"
                        stroke="#712c25"
                        strokeWidth="2"
                        transform={`rotate(65, ${cajaX + cajaWidth / 2}, ${cajaY + cajaHeight / 2})`}
                    />
                    <rect
                        x={salonX}
                        y={salonY}
                        width={salonWidth}
                        height={salonHeight}
                        fill="#f6f4f5"
                        stroke="#b6b5b3"
                        strokeWidth="2"
                        transform={`rotate(-25, ${salonX + salonWidth / 2}, ${salonY + salonHeight / 2})`}
                    />
                    <rect
                        x={materaX}
                        y={materaY}
                        width={materaWidth}
                        height={materaHeight}
                        fill="#2f6a07"
                        stroke="#35571a"
                        strokeWidth="2"
                        transform={`rotate(-24, ${materaX + materaWidth / 2}, ${materaY + materaHeight / 2})`}
                    />
                    {/* Rectángulo para el baño */}
                    <rect
                        x={banoX}
                        y={banoY}
                        width={banoWidth}
                        height={banoHeight}
                        fill="#c88687"
                        stroke="#6e4c50"
                        strokeWidth="2"
                        transform={`rotate(-25, ${banoX + banoWidth / 2}, ${banoY + banoHeight / 2})`}
                    />

                    {/* Mesa */}
                    <Mesas mainCircleX={mainCircleX - 170} mainCircleY={mainCircleY + 320} mesaNumber={51}/>
                    <Mesas mainCircleX={mainCircleX - 120} mainCircleY={mainCircleY + 430} mesaNumber={52}/>
                    <Mesas mainCircleX={mainCircleX - 70} mainCircleY={mainCircleY + 280} mesaNumber={53}/>
                    <Mesas mainCircleX={mainCircleX - 20} mainCircleY={mainCircleY + 390} mesaNumber={54}/>
                    <Mesas mainCircleX={mainCircleX + 50} mainCircleY={mainCircleY + 240} mesaNumber={55}/>
                    <Mesas mainCircleX={mainCircleX + 100} mainCircleY={mainCircleY + 350} mesaNumber={56}/>
                    <Mesas mainCircleX={mainCircleX + 150} mainCircleY={mainCircleY + 200} mesaNumber={57}/>
                    <Mesas mainCircleX={mainCircleX + 200} mainCircleY={mainCircleY + 305} mesaNumber={58}/>
                    <Mesas mainCircleX={mainCircleX + 250} mainCircleY={mainCircleY + 155} mesaNumber={59}/>
                    <Mesas mainCircleX={mainCircleX + 300} mainCircleY={mainCircleY + 260} mesaNumber={60}/>
                    <Mesas mainCircleX={mainCircleX + 350} mainCircleY={mainCircleY + 120} mesaNumber={61}/>
                    <Mesas mainCircleX={mainCircleX + 400} mainCircleY={mainCircleY + 210} mesaNumber={62}/>
                    <Mesas mainCircleX={mainCircleX + 450} mainCircleY={mainCircleY + 80} mesaNumber={63}/>
                    <Mesas mainCircleX={mainCircleX + 500} mainCircleY={mainCircleY + 160} mesaNumber={64}/>

                    <Mesas mainCircleX={mainCircleX + 280} mainCircleY={mainCircleY + 440} mesaNumber={65}/>
                    <Mesas mainCircleX={mainCircleX + 320} mainCircleY={mainCircleY + 550} mesaNumber={66}/>
                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY + 420} mesaNumber={67}/>
                    <Mesas mainCircleX={mainCircleX + 430} mainCircleY={mainCircleY + 530} mesaNumber={68}/>
                    <Mesas mainCircleX={mainCircleX + 480} mainCircleY={mainCircleY + 380} mesaNumber={69}/>
                    <Mesas mainCircleX={mainCircleX + 530} mainCircleY={mainCircleY + 490} mesaNumber={70}/>
                    <Mesas mainCircleX={mainCircleX + 580} mainCircleY={mainCircleY + 340} mesaNumber={71}/>
                    <Mesas mainCircleX={mainCircleX + 620} mainCircleY={mainCircleY + 440} mesaNumber={72}/>

                    <Gradas x={mainCircleX + 85} y={mainCircleY + 420} width={45} height={320}/>
                    <Gradas x={mainCircleX + 45} y={mainCircleY + 430} width={45} height={130}/>
                    <Gradas x={mainCircleX + 550} y={mainCircleY + 50} width={230} height={170}/>
                    <Gradas x={mainCircleX + 560} y={mainCircleY + 140} width={240} height={80}/>

                    <Gradas x={mainCircleX + 535} y={mainCircleY + 40} width={200} height={1}/>
                    <Gradas x={mainCircleX + 530} y={mainCircleY + 30} width={200} height={1}/>
                    <Gradas x={mainCircleX + 525} y={mainCircleY + 20} width={200} height={1}/>
                    <Gradas x={mainCircleX + 520} y={mainCircleY + 10} width={200} height={1}/>
                    <Gradas x={mainCircleX + 515} y={mainCircleY} width={200} height={1}/>
                    <Gradas x={mainCircleX + 512} y={mainCircleY - 10} width={200} height={1}/>
                    <Gradas x={mainCircleX + 508} y={mainCircleY - 20} width={200} height={1}/>
                    <Gradas x={mainCircleX + 503} y={mainCircleY - 30} width={200} height={1}/>
                    <Gradas x={mainCircleX + 498} y={mainCircleY - 40} width={200} height={1}/>
                    <Gradas x={mainCircleX + 493} y={mainCircleY - 50} width={200} height={1}/>
                    <Gradas x={mainCircleX + 488} y={mainCircleY - 60} width={200} height={1}/>
                    <Gradas x={mainCircleX + 483} y={mainCircleY - 70} width={200} height={1}/>
                    <Gradas x={mainCircleX + 478} y={mainCircleY - 80} width={200} height={1}/>
                    <Gradas x={mainCircleX + 474} y={mainCircleY - 90} width={200} height={1}/>
                    <Gradas x={mainCircleX + 470} y={mainCircleY - 100} width={200} height={1}/>

                    <Gradas x={mainCircleX + 570} y={mainCircleY + 200} width={240} height={1}/>
                    <Gradas x={mainCircleX + 540} y={mainCircleY + 115} width={230} height={1}/>
                    <Gradas x={mainCircleX - 150} y={mainCircleY + 360} width={700} height={1}/>

                    <Gradas x={mainCircleX + 200} y={mainCircleY + 315} width={200} height={10}/>
                    <Gradas x={mainCircleX + 205} y={mainCircleY + 325} width={200} height={10}/>
                    <Gradas x={mainCircleX + 360} y={mainCircleY + 250} width={30} height={50}/>
                </svg>
            </div>
        );
    }
}

export default Plano2;
