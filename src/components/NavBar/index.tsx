import React from "react";
import {
  NavContainer,
  LogoText,
  NavTab,
  SearchInput,
  LogoutButton,
  StyledLink,
} from "./styled";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <NavContainer>
      <StyledLink to="/">
        <LogoText>Buena Leida</LogoText>
      </StyledLink>

      <NavTab to="/">Home</NavTab>
      <NavTab to="/profile">Profile</NavTab>

      <SearchInput placeholder="Search..." />

      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
    </NavContainer>
  );
};

export default NavBar;
