import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import  styled  from "@emotion/styled"; // Importamos styled de @emotion/styled

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Plano1 from './components/Plano1';
import Plano2 from './components/Plano2';

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
      <Container>
        <Navbar>
          <h1 style={{color: '#ffffff'}}>PROM BERCHMANS 2025</h1>
          {currentUser ? (
              <UserMenu>
                <ProfileLink to={"/Plano1"}>{currentUser.username}</ProfileLink>
                <LogoutLink to={"/login"} onClick={logOut}>Cerrar Sesión</LogoutLink>
              </UserMenu>
          ) : (
              <AuthMenu>
                <NavLink to={"/login"}>Iniciar Sesión</NavLink>
              </AuthMenu>
          )}
        </Navbar>

        <Content>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            {currentUser && (
                <>
                  <Route path="/Plano1" element={<Plano1 />} />
                </>
            )}
          </Routes>
        </Content>
      </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 1rem;
`;

const BrandLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const UserMenu = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProfileLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const LogoutLink = styled(Link)`
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

const AuthMenu = styled.div`
  display: flex;
  gap: 1rem;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
`;
