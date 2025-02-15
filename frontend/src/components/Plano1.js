import React, {Component} from 'react';
import Mesas from './Mesas';
import Columnas from "./Columna";
import Parlantes from "./Parlantes";

class Plano1 extends Component {
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
        const planoWidth = 2500;
        const planoHeight = 1500;
        const tarimaWidth = 360;
        const tarimaHeight = 160;
        const tarimaX = (planoWidth - tarimaWidth) / 2 - 850;
        const tarimaY = (planoHeight - tarimaHeight) / 2 - 100;
        const salonWidth = 1250;
        const salonHeight = 150;
        const salonX = (planoWidth - salonWidth) / 2 - 70;
        const salonY = (planoHeight - salonHeight) / 2 - 100;

        const jardinWidth = 800;
        const jardinHeight = 100;
        const jardinX = (planoWidth - jardinWidth) / 2 - 380;
        const jardinY = (planoHeight - jardinHeight) / 2 + 450;

        const jardin2Width = 800;
        const jardin2Height = 100;
        const jardin2X = (planoWidth - jardin2Width) / 2 - 380;
        const jardin2Y = (planoHeight - jardin2Height) / 2 - 650;

        const banoWidth = 1800;
        const banoHeight = 1000;
        const banoX = (planoWidth - banoWidth) / 2 - 150;
        const banoY = (planoHeight - banoHeight) / 2 - 100;

        const mainCircleRadius = 37;
        const mainCircleX = tarimaX + tarimaWidth - 140;
        const mainCircleY = tarimaY + tarimaHeight / 2 - 320;

        // Función para seleccionar un elemento aleatorio de una lista
        function getRandomElement(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        return (

            <div>
                <svg width={planoWidth} height={planoHeight}>

                    {/* Rectángulo para el baño */}
                    <rect
                        x={banoX}
                        y={banoY}
                        width={banoWidth}
                        height={banoHeight}
                        fill="#d8f4fa"
                        stroke="#6e4c50"
                        strokeWidth="2"
                        transform={`rotate(180, ${banoX + banoWidth / 2}, ${banoY + banoHeight / 2})`}
                    />

                    {/* Rectángulo para la tarima */}
                    <rect
                        x={tarimaX}
                        y={tarimaY}
                        width={tarimaWidth}
                        height={tarimaHeight}
                        fill="#bb3b3e"
                        stroke="#aca498"
                        strokeWidth="2"
                        transform={`rotate(90, ${tarimaX + tarimaWidth / 2}, ${tarimaY + tarimaHeight / 2})`}
                    />
                    {/* Texto para la tarima */}
                    <text
                        x={tarimaX + tarimaWidth / 2}
                        y={tarimaY + tarimaHeight / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="black"
                        fontSize="30"
                        fontWeight="bold"
                        transform={`rotate(0, ${tarimaX + tarimaWidth / 2}, ${tarimaY + tarimaHeight / 2})`}
                    >
                        TARIMA
                    </text>
                    {/* Rectángulo para el salon */}
                    <rect
                        x={salonX}
                        y={salonY}
                        width={salonWidth}
                        height={salonHeight}
                        fill="#eedab2"
                        stroke="#b6b5b3"
                        strokeWidth="2"
                        transform={`rotate(180, ${salonX + salonWidth / 2}, ${salonY + salonHeight / 2})`}
                    />
                    {/* Texto para el salon */}
                    <text
                        x={salonX + salonWidth / 2}
                        y={salonY + salonHeight / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="black"
                        fontSize="30"
                        fontWeight="bold"
                        transform={`rotate(0, ${salonX + salonWidth / 2}, ${salonY + salonHeight / 2})`}
                    >
                        PISTA DE BAILE
                    </text>
                    {/* Rectángulo para el jardin */}

                    <rect
                        x={jardinX}
                        y={jardinY}
                        width={jardinWidth}
                        height={jardinHeight}
                        fill="#f0c582"
                        stroke="#f0c582"
                        strokeWidth="2"
                        transform={`rotate(180, ${jardinX + jardinWidth / 2}, ${jardinY + jardinHeight / 2})`}
                    />

                    <text
                        x={jardinX + jardinWidth / 2}
                        y={jardinY + jardinHeight / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="black"
                        fontSize="30"
                        fontWeight="bold"
                        transform={`rotate(0, ${jardinX + jardinWidth / 2}, ${jardinY + jardinHeight / 2})`}
                    >
                        ZONA BUFET 1
                    </text>

                    <rect
                        x={jardin2X}
                        y={jardin2Y}
                        width={jardin2Width}
                        height={jardin2Height}
                        fill="#f0c582"
                        stroke="#f0c582"
                        strokeWidth="2"
                        transform={`rotate(180, ${jardin2X + jardin2Width / 2}, ${jardin2Y + jardin2Height / 2})`}
                    />

                    <text
                        x={jardin2X + jardin2Width / 2}
                        y={jardin2Y + jardin2Height / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="black"
                        fontSize="30"
                        fontWeight="bold"
                        transform={`rotate(0, ${jardin2X + jardin2Width / 2}, ${jardin2Y + jardin2Height / 2})`}
                    >
                        ZONA BUFET 2
                    </text>

                    {/* Renderizar los parlantes usando el componente Parlantes */}

                    {/* Renderizar las columnas usando el componente Columnas */}

                    {/*<Columnas x={mainCircleX + 1110} y={mainCircleY - 40} width={15} height={40}/>*/}
                    {/* Mesa */}
                    <Mesas mainCircleX={mainCircleX + 290} mainCircleY={mainCircleY - 80} mesaNumber={33}/>
                    <Mesas mainCircleX={mainCircleX + 290} mainCircleY={mainCircleY + 10} mesaNumber={34}/>
                    <Mesas mainCircleX={mainCircleX + 290} mainCircleY={mainCircleY + 100} mesaNumber={35}/>
                    <Mesas mainCircleX={mainCircleX + 290} mainCircleY={mainCircleY + 190} mesaNumber={36}/>

                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY - 80} mesaNumber={40}/>
                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY + 10} mesaNumber={39}/>
                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY + 100} mesaNumber={38}/>
                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY + 190} mesaNumber={37}/>

                    <Mesas mainCircleX={mainCircleX + 470} mainCircleY={mainCircleY - 80} mesaNumber={41}/>
                    <Mesas mainCircleX={mainCircleX + 470} mainCircleY={mainCircleY + 10} mesaNumber={42}/>
                    <Mesas mainCircleX={mainCircleX + 470} mainCircleY={mainCircleY + 100} mesaNumber={43}/>
                    <Mesas mainCircleX={mainCircleX + 470} mainCircleY={mainCircleY + 190} mesaNumber={44}/>

                    <Mesas mainCircleX={mainCircleX + 560} mainCircleY={mainCircleY - 80} mesaNumber={48}/>
                    <Mesas mainCircleX={mainCircleX + 560} mainCircleY={mainCircleY + 10} mesaNumber={47}/>
                    <Mesas mainCircleX={mainCircleX + 560} mainCircleY={mainCircleY + 100} mesaNumber={46}/>
                    <Mesas mainCircleX={mainCircleX + 560} mainCircleY={mainCircleY + 190} mesaNumber={45}/>




                    <Mesas mainCircleX={mainCircleX + 290} mainCircleY={mainCircleY + 450} mesaNumber={1}/>
                    <Mesas mainCircleX={mainCircleX + 290} mainCircleY={mainCircleY + 540} mesaNumber={2}/>
                    <Mesas mainCircleX={mainCircleX + 290} mainCircleY={mainCircleY + 630} mesaNumber={3}/>
                    <Mesas mainCircleX={mainCircleX + 290} mainCircleY={mainCircleY + 720} mesaNumber={4}/>

                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY + 450} mesaNumber={8}/>
                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY + 540} mesaNumber={7}/>
                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY + 630} mesaNumber={6}/>
                    <Mesas mainCircleX={mainCircleX + 380} mainCircleY={mainCircleY + 720} mesaNumber={5}/>

                    <Mesas mainCircleX={mainCircleX + 470} mainCircleY={mainCircleY + 450} mesaNumber={9}/>
                    <Mesas mainCircleX={mainCircleX + 470} mainCircleY={mainCircleY + 540} mesaNumber={10}/>
                    <Mesas mainCircleX={mainCircleX + 470} mainCircleY={mainCircleY + 630} mesaNumber={11}/>
                    <Mesas mainCircleX={mainCircleX + 470} mainCircleY={mainCircleY + 720} mesaNumber={12}/>

                    <Mesas mainCircleX={mainCircleX + 560} mainCircleY={mainCircleY + 450} mesaNumber={16}/>
                    <Mesas mainCircleX={mainCircleX + 560} mainCircleY={mainCircleY + 540} mesaNumber={15}/>
                    <Mesas mainCircleX={mainCircleX + 560} mainCircleY={mainCircleY + 630} mesaNumber={14}/>
                    <Mesas mainCircleX={mainCircleX + 560} mainCircleY={mainCircleY + 720} mesaNumber={13}/>




                    <Mesas mainCircleX={mainCircleX + 890} mainCircleY={mainCircleY - 80} mesaNumber={49}/>
                    <Mesas mainCircleX={mainCircleX + 890} mainCircleY={mainCircleY + 10} mesaNumber={50}/>
                    <Mesas mainCircleX={mainCircleX + 890} mainCircleY={mainCircleY + 100} mesaNumber={51}/>
                    <Mesas mainCircleX={mainCircleX + 890} mainCircleY={mainCircleY + 190} mesaNumber={52}/>

                    <Mesas mainCircleX={mainCircleX + 980} mainCircleY={mainCircleY - 80} mesaNumber={56}/>
                    <Mesas mainCircleX={mainCircleX + 980} mainCircleY={mainCircleY + 10} mesaNumber={55}/>
                    <Mesas mainCircleX={mainCircleX + 980} mainCircleY={mainCircleY + 100} mesaNumber={54}/>
                    <Mesas mainCircleX={mainCircleX + 980} mainCircleY={mainCircleY + 190} mesaNumber={53}/>

                    <Mesas mainCircleX={mainCircleX + 1070} mainCircleY={mainCircleY - 80} mesaNumber={57}/>
                    <Mesas mainCircleX={mainCircleX + 1070} mainCircleY={mainCircleY + 10} mesaNumber={58}/>
                    <Mesas mainCircleX={mainCircleX + 1070} mainCircleY={mainCircleY + 100} mesaNumber={59}/>
                    <Mesas mainCircleX={mainCircleX + 1070} mainCircleY={mainCircleY + 190} mesaNumber={60}/>

                    <Mesas mainCircleX={mainCircleX + 1160} mainCircleY={mainCircleY - 80} mesaNumber={64}/>
                    <Mesas mainCircleX={mainCircleX + 1160} mainCircleY={mainCircleY + 10} mesaNumber={63}/>
                    <Mesas mainCircleX={mainCircleX + 1160} mainCircleY={mainCircleY + 100} mesaNumber={62}/>
                    <Mesas mainCircleX={mainCircleX + 1160} mainCircleY={mainCircleY + 190} mesaNumber={61}/>

                    <Mesas mainCircleX={mainCircleX + 1260} mainCircleY={mainCircleY - 80} mesaNumber={65}/>
                    <Mesas mainCircleX={mainCircleX + 1260} mainCircleY={mainCircleY + 10} mesaNumber={66}/>



                    <Mesas mainCircleX={mainCircleX + 890} mainCircleY={mainCircleY + 450} mesaNumber={17}/>
                    <Mesas mainCircleX={mainCircleX + 890} mainCircleY={mainCircleY + 540} mesaNumber={18}/>
                    <Mesas mainCircleX={mainCircleX + 890} mainCircleY={mainCircleY + 630} mesaNumber={19}/>
                    <Mesas mainCircleX={mainCircleX + 890} mainCircleY={mainCircleY + 720} mesaNumber={20}/>

                    <Mesas mainCircleX={mainCircleX + 980} mainCircleY={mainCircleY + 450} mesaNumber={24}/>
                    <Mesas mainCircleX={mainCircleX + 980} mainCircleY={mainCircleY + 540} mesaNumber={23}/>
                    <Mesas mainCircleX={mainCircleX + 980} mainCircleY={mainCircleY + 630} mesaNumber={22}/>
                    <Mesas mainCircleX={mainCircleX + 980} mainCircleY={mainCircleY + 720} mesaNumber={21}/>

                    <Mesas mainCircleX={mainCircleX + 1070} mainCircleY={mainCircleY + 450} mesaNumber={25}/>
                    <Mesas mainCircleX={mainCircleX + 1070} mainCircleY={mainCircleY + 540} mesaNumber={26}/>
                    <Mesas mainCircleX={mainCircleX + 1070} mainCircleY={mainCircleY + 630} mesaNumber={27}/>
                    <Mesas mainCircleX={mainCircleX + 1070} mainCircleY={mainCircleY + 720} mesaNumber={28}/>

                    <Mesas mainCircleX={mainCircleX + 1160} mainCircleY={mainCircleY + 450} mesaNumber={32}/>
                    <Mesas mainCircleX={mainCircleX + 1160} mainCircleY={mainCircleY + 540} mesaNumber={31}/>
                    <Mesas mainCircleX={mainCircleX + 1160} mainCircleY={mainCircleY + 630} mesaNumber={30}/>
                    <Mesas mainCircleX={mainCircleX + 1160} mainCircleY={mainCircleY + 720} mesaNumber={29}/>



                </svg>
            </div>
        );
    }
}

export default Plano1;
