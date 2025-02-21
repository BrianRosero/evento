import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Button,
    TextField,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Card,
ListItemText, ListItem, List, Grid
} from "@mui/material";


const API_URL = "http://localhost:8080/api";

const EventManager = ({onSelectEvent}) => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [newGuest, setNewGuest] = useState({nombreInvitado: "", cedulaInvitado: ""});
    const [showAll, setShowAll] = useState(false);
    const [mesa, setMesa] = useState(""); // Estado para la mesa
    const [nuevoNumeroMesa, setNuevoNumeroMesa] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_URL}/events`);
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    };

    const handleSearch = () => {
        const filtered = events.filter(event =>
            (event.nombreEstudiante && event.nombreEstudiante.toLowerCase().includes(search.toLowerCase())) ||
            (event.grupo && event.grupo.toLowerCase().includes(search.toLowerCase()))
        );
        setFilteredEvents(filtered);
    };


    const updateMesa = async (mesa) => {
        if (!selectedEvent) return;

        console.log("Valor recibido para mesa:", mesa, typeof mesa);

        // Asegurar que sea un número válido
        const mesaNumero = Number(mesa);
        if (isNaN(mesaNumero) || mesaNumero <= 0) {
            console.error("Error: El valor de mesa no es un número válido.");
            return;
        }

        try {
            const response = await axios.put(`${API_URL}/eventos/${selectedEvent.id}`, { mesa: mesaNumero });
            alert("Mesa actualizada correctamente");
            console.log(response.data);
        } catch (error) {
            console.error("Error al actualizar la mesa:", error.response ? error.response.data : error.message);
        }
    };



    const addGuest = async () => {
        if (!selectedEvent) return;

        if (invitedUsers.length >= selectedEvent.totalInvitadosPermitidos) {
            alert(`No se pueden agregar más invitados. Límite: ${selectedEvent.totalInvitadosPermitidos}`);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/events/${selectedEvent.id}/guests`, newGuest);
            setInvitedUsers([...invitedUsers, response.data]);
            setNewGuest({nombreInvitado: "", cedulaInvitado: ""});
        } catch (error) {
            console.error("Error al agregar invitado:", error);
        }
    };

    const toggleAsignado = async (guestId, asignadoActual) => {
        try {
            await axios.put(`${API_URL}/invitados/${guestId}`, {asignado: !asignadoActual});

            setInvitedUsers(invitedUsers.map(guest =>
                guest.id === guestId ? {...guest, asignado: !asignadoActual} : guest
            ));
        } catch (error) {
            console.error("Error al actualizar estado del invitado:", error);
        }
    };

    const Mesas = ({mainCircleX, mainCircleY, mesaNumber, reservas}) => {
        const mainCircleRadius = 31;
        const smallCircleRadius = 11;
        const smallCircleCount = 10;

        const [sillasActivas, setSillasActivas] = useState(() => {
            const savedState = localStorage.getItem(`mesa${mesaNumber}`);
            return savedState ? JSON.parse(savedState) : Array.from({length: smallCircleCount}, () => ({
                activa: false,
                seleccionada: false
            }));
        });

        const handleSillaClick = (index) => {
            if (sillasActivas[index].activa) {
                const confirmar = window.confirm("¿Estás seguro de cambiar el estado de esta silla?");
                if (!confirmar) return;
            }

            setSillasActivas(prevState => {
                const newState = [...prevState];
                newState[index] = {...newState[index], activa: !newState[index].activa, seleccionada: true};
                localStorage.setItem(`mesa${mesaNumber}`, JSON.stringify(newState));
                return newState;
            });
        };

        const estaReservado = (sillaNumber) => {
            return reservas ? reservas.some(reserva => reserva.mesa === mesaNumber && reserva.silla === sillaNumber) : false;
        };

        const sillas = Array.from({length: smallCircleCount}, (_, index) => {
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
            <g key="table" style={{cursor: 'pointer'}}>
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

    const planoWidth = 2500;
    const planoHeight = 1500;
    const offsetX = -150; // Mueve todo 150px a la izquierda

    const tarimaWidth = 360;
    const tarimaHeight = 160;
    const tarimaX = (planoWidth - tarimaWidth) / 2 - 850 + offsetX;
    const tarimaY = (planoHeight - tarimaHeight) / 2 - 100;

    const salonWidth = 1250;
    const salonHeight = 150;
    const salonX = (planoWidth - salonWidth) / 2 - 70 + offsetX;
    const salonY = (planoHeight - salonHeight) / 2 - 100;

    const jardinWidth = 800;
    const jardinHeight = 100;
    const jardinX = (planoWidth - jardinWidth) / 2 - 380 + offsetX;
    const jardinY = (planoHeight - jardinHeight) / 2 + 450;

    const jardin2Width = 800;
    const jardin2Height = 100;
    const jardin2X = (planoWidth - jardin2Width) / 2 - 380 + offsetX;
    const jardin2Y = (planoHeight - jardin2Height) / 2 - 650;

    const banoWidth = 1800;
    const banoHeight = 1000;
    const banoX = (planoWidth - banoWidth) / 2 - 150 + offsetX;
    const banoY = (planoHeight - banoHeight) / 2 - 100;

    const mainCircleX = tarimaX + tarimaWidth - 140;
    const mainCircleY = tarimaY + tarimaHeight / 2 - 320;

    return (
        <div style={{display: 'flex', width: '100%', height: 'auto', overflow: 'hidden'}}>

            <svg viewBox={`0 0 ${planoWidth} ${planoHeight}`} width="100%" height="auto">
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

            <Card sx={{width: 400, p: 3, boxShadow: 3}} style={{
                width: '25%',
                height: 'auto',
                padding: '10px',
                backgroundColor: '#f9f9f9',
                marginLeft: '-25%'
            }}>
                <Typography variant="h6" sx={{mb: 2}}>
                    Lista de Estudiantes
                </Typography>
                <TextField
                    label="Buscar por nombre o grupo"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{mb: 2}}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSearch} sx={{mb: 2}}>
                    Buscar
                </Button>
                <List sx={{maxHeight: 150, overflowY: "auto"}}>
                    {filteredEvents.slice(0, showAll ? filteredEvents.length : 2).map((event) => (
                        <ListItem
                            button
                            key={event.id}
                            onClick={() => {
                                setSelectedEvent(event);
                                setMesa(event.mesa || ""); // Cargar la mesa del evento
                                setInvitedUsers(event.invitados || []);
                            }}
                            sx={{borderBottom: "1px solid #ddd"}}
                        >
                            <ListItemText primary={event.nombreEstudiante}
                                          secondary={`Grupo: ${event.grupo} - Mesa: ${event.mesa || "Sin asignar"}`}
                            />
                        </ListItem>
                    ))}
                </List>

                {selectedEvent && (

                    <div>
                        <div>
                            <Typography variant="h6" sx={{mt: 2}}>
                                Modificar Mesa
                            </Typography>
                            <TextField
                                label="Número de Mesa"
                                variant="outlined"
                                fullWidth
                                value={nuevoNumeroMesa}
                                onChange={(e) => setNuevoNumeroMesa(Number(e.target.value))} // Convertir a número
                                sx={{mb: 2}}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => updateMesa(nuevoNumeroMesa)}>Actualizar Mesa</Button>

                        </div>
                        <Typography variant="h6" sx={{mb: 2}}>
                            Invitados
                            para {selectedEvent.nombreEstudiante} ({invitedUsers.length}/{selectedEvent.totalInvitadosPermitidos})
                        </Typography>
                        <Grid container spacing={2} sx={{mb: 2}}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Nombre Invitado"
                                    value={newGuest.nombreInvitado}
                                    onChange={(e) => setNewGuest({...newGuest, nombreInvitado: e.target.value})}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Cédula Invitado"
                                    value={newGuest.cedulaInvitado}
                                    onChange={(e) => setNewGuest({...newGuest, cedulaInvitado: e.target.value})}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addGuest}
                            disabled={invitedUsers.length >= selectedEvent.totalInvitadosPermitidos}
                            fullWidth
                        >
                            Agregar Invitado
                        </Button>

                        <TableContainer>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Cédula</TableCell>
                                    <TableCell>Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invitedUsers.map((guest) => (
                                    <TableRow
                                        key={guest.id}
                                        style={{backgroundColor: guest.asignado ? "#c8e6c9" : "white"}} // Fondo verde si está asignado
                                    >
                                        <TableCell>{guest.nombreInvitado}</TableCell>
                                        <TableCell>{guest.cedulaInvitado}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color={guest.asignado ? "secondary" : "success"}
                                                onClick={() => toggleAsignado(guest.id, guest.asignado)}
                                            >
                                                {guest.asignado ? "Desasignar" : "Asignar"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableContainer>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default EventManager;
