import React from "react";
import {
  NavContainer,
  LogoText,
  NavTab,
  //LogoutButton,
  IconBox,
  StyledLink,
  IconContainer,
  Icon,
  LogoPart,
  SearchWrapper,
  StyledSearchInput,
  SearchIcon,
} from "./styled";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import { FcReading } from "react-icons/fc";

const NavBar: React.FC = () => {
  return (
    <NavContainer>
      <StyledLink to="/">
        <LogoText>
          <LogoPart>Buena </LogoPart>
          <LogoPart bold>Leida</LogoPart>
        </LogoText>
      </StyledLink>

      <NavTab to="/">Inicio</NavTab>
      <NavTab to="/">Mis Libros</NavTab>
      <NavTab to="/" style={{ display: "flex", alignItems: "center" }}>
        Buscar
        <ArrowDropDownRoundedIcon />
      </NavTab>

      <NavTab to="/" style={{ display: "flex", alignItems: "center" }}>
        Comunidad
        <ArrowDropDownRoundedIcon />
      </NavTab>

      <SearchWrapper>
        <StyledSearchInput placeholder="Buscar libros" />
        <SearchIcon />
      </SearchWrapper>

      <IconContainer>
        <IconBox>
          <Icon title="Notificaciones">
            <NotificationsIcon />
          </Icon>
        </IconBox>
        <IconBox>
          <Icon title="Discusiones de grupo">
            <ForumIcon />
          </Icon>
        </IconBox>
        <IconBox>
          <Icon title="Mensajes">
            <EmailIcon />
          </Icon>
        </IconBox>
        <IconBox>
          <Icon title="Amigos">
            <PeopleIcon />
          </Icon>
        </IconBox>
        <StyledLink to="/profile" title="Perfil">
          <IconBox>
            <Icon className="profile">
              <FcReading />
            </Icon>
          </IconBox>
        </StyledLink>
      </IconContainer>
    </NavContainer>
  );
};

export default NavBar;
