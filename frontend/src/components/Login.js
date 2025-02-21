import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";

import { login } from "../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo es requerido!
            </div>
        );
    }
};

const Login = () => {
    const navigate = useNavigate();
    const form = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(login(username, password))
            .then(() => {
                navigate("/Plano1");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin(e);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/Plano1" />;
    }

    return (
        <Container>
            <LoginForm onSubmit={handleLogin} ref={form}>
                <Logo src="/evento.png" alt="logo" />
                <Title>Inicia Sesión</Title>
                <StyledTextField
                    type="text"
                    label="Nombre de Usuario"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <StyledTextField
                    type="password"
                    label="Contraseña"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    onKeyPress={handleKeyPress}
                />
                <StyledButton
                    variant="contained"
                    disabled={loading}
                    onClick={handleLogin}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar Sesión"}
                </StyledButton>
                {message && <ErrorMessage>{message}</ErrorMessage>}
            </LoginForm>
        </Container>
    );
};

export default Login;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoginForm = styled.form`
    background-color: #ffffff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Logo = styled.img`
    width: 100px;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    color: #333333;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
`;

const ErrorMessage = styled.div`
    color: red;
    margin-top: 10px;
`;
