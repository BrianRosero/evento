import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Card,
    CardContent, ListItemText, ListItem, List, Grid, IconButton
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
            event.nombreEstudiante.toLowerCase().includes(search.toLowerCase()) ||
            event.grupo.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredEvents(filtered);
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
            await axios.put(`${API_URL}/invitados/${guestId}`, { asignado: !asignadoActual });

            setInvitedUsers(invitedUsers.map(guest =>
                guest.id === guestId ? { ...guest, asignado: !asignadoActual } : guest
            ));
        } catch (error) {
            console.error("Error al actualizar estado del invitado:", error);
        }
    };

    return (
        <div style={{display: 'flex', width: '100%', height: 'auto', overflow: 'hidden'}}>

            <Card sx={{ width: 400, p: 3, boxShadow: 3 }} style={{ width: '25%', height: 'auto', padding: '10px', backgroundColor: '#f9f9f9', marginLeft: '-25%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Lista de Estudiantes
                </Typography>
                <TextField
                    label="Buscar por nombre o grupo"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSearch} sx={{ mb: 2 }}>
                    Buscar
                </Button>
                <List sx={{ maxHeight: 150, overflowY: "auto" }}>
                    {filteredEvents.slice(0, showAll ? filteredEvents.length : 2).map((event) => (
                        <ListItem
                            button
                            key={event.id}
                            onClick={() => {
                                setSelectedEvent(event);
                                setInvitedUsers(event.invitados || []);
                            }}
                            sx={{ borderBottom: "1px solid #ddd" }}
                        >
                            <ListItemText primary={event.nombreEstudiante} secondary={`Grupo: ${event.grupo}`} />
                        </ListItem>
                    ))}
                </List>
                {selectedEvent && (
                    <div>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Invitados para {selectedEvent.nombreEstudiante} ({invitedUsers.length}/{selectedEvent.totalInvitadosPermitidos})
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Nombre Invitado"
                                    value={newGuest.nombreInvitado}
                                    onChange={(e) => setNewGuest({ ...newGuest, nombreInvitado: e.target.value })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Cédula Invitado"
                                    value={newGuest.cedulaInvitado}
                                    onChange={(e) => setNewGuest({ ...newGuest, cedulaInvitado: e.target.value })}
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
                                        style={{ backgroundColor: guest.asignado ? "#c8e6c9" : "white" }} // Fondo verde si está asignado
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
