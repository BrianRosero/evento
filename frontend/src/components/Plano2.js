import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent } from "@mui/material";

const API_URL = "http://localhost:8080/api";

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        nombrePadre: "",
        numeroCelularPadre: "",
        grupo: "A",
        mesa: null,
        nombreEstudiante: "",
        totalInvitadosPermitidos: ""
    });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [newGuest, setNewGuest] = useState({ nombreInvitado: "", cedulaInvitado: "" });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_URL}/events`);
            setEvents(response.data);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    };

    const createEvent = async () => {
        try {
            const response = await axios.post(`${API_URL}/events`, newEvent);
            setEvents([...events, response.data]);
            setNewEvent({
                nombrePadre: "",
                numeroCelularPadre: "",
                grupo: "A",
                mesa: null,
                nombreEstudiante: "",
                totalInvitadosPermitidos: ""
            });
        } catch (error) {
            console.error("Error al crear evento:", error);
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
            setNewGuest({ nombreInvitado: "", cedulaInvitado: "" });
        } catch (error) {
            console.error("Error al agregar invitado:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Typography variant="h4" className="mb-4 text-center">Gestión de Estudiantes</Typography>

            <Card className="mb-6 shadow-lg">
                <CardContent>
                    <Typography variant="h6">Crear Nuevo Estudiante</Typography>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <TextField label="Nombre del Padre" value={newEvent.nombrePadre} onChange={(e) => setNewEvent({ ...newEvent, nombrePadre: e.target.value })} fullWidth />
                        <TextField label="Número Celular del Padre" value={newEvent.numeroCelularPadre} onChange={(e) => setNewEvent({ ...newEvent, numeroCelularPadre: e.target.value })} fullWidth />
                        <Select value={newEvent.grupo} onChange={(e) => setNewEvent({ ...newEvent, grupo: e.target.value })} fullWidth>
                            {["A", "B", "C", "D", "E", "F"].map((grupo) => (
                                <MenuItem key={grupo} value={grupo}>{grupo}</MenuItem>
                            ))}
                        </Select>
                        <TextField label="Nombre del Estudiante" value={newEvent.nombreEstudiante} onChange={(e) => setNewEvent({ ...newEvent, nombreEstudiante: e.target.value })} fullWidth />
                        <TextField label="Total de Invitados Permitidos" type="number" value={newEvent.totalInvitadosPermitidos} onChange={(e) => setNewEvent({ ...newEvent, totalInvitadosPermitidos: e.target.value })} fullWidth />
                    </div>
                    <Button variant="contained" color="primary" onClick={createEvent}>Crear Estudiante</Button>
                </CardContent>
            </Card>

            <Card className="mb-6 shadow-lg">
                <CardContent>
                    <Typography variant="h6">Seleccionar Estudiante</Typography>
                    <Select
                        fullWidth
                        value={selectedEvent?.id || ""}
                        onChange={(e) => {
                            const event = events.find(ev => ev.id === e.target.value);
                            setSelectedEvent(event);
                            setInvitedUsers(event.invitados || []);
                        }}
                        className="mb-4"
                    >
                        {events.map(event => (
                            <MenuItem key={event.id} value={event.id}>
                                {event.nombreEstudiante} (Invitados: {event.invitados.length}/{event.totalInvitadosPermitidos})
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>

            {selectedEvent && (
                <Card className="shadow-lg">
                    <CardContent>
                        <Typography variant="h6">Invitados para {selectedEvent.nombreEstudiante}</Typography>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <TextField
                                label="Nombre Invitado"
                                value={newGuest.nombreInvitado}
                                onChange={(e) => setNewGuest({...newGuest, nombreInvitado: e.target.value})}
                                fullWidth
                            />
                            <TextField
                                label="Cédula Invitado"
                                value={newGuest.cedulaInvitado}
                                onChange={(e) => setNewGuest({...newGuest, cedulaInvitado: e.target.value})}
                                fullWidth
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addGuest}
                            disabled={invitedUsers.length >= selectedEvent.totalInvitadosPermitidos}
                        >
                            Agregar Invitado
                        </Button>

                        <TableContainer component={Paper} className="mt-6">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Cédula</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invitedUsers.map((guest, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{guest.nombreInvitado}</TableCell>
                                            <TableCell>{guest.cedulaInvitado}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default EventManager;
