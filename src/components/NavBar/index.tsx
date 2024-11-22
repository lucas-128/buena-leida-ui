import React, { useState } from "react";
import {
  NavContainer,
  LogoText,
  NavTab,
  IconBox,
  StyledLink,
  IconContainer,
  Icon,
  LogoPart,
  SearchWrapper,
  StyledSearchInput,
  SearchIcon,
} from "./styled";
//import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import ForumIcon from "@mui/icons-material/Forum";
// import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import { FcReading } from "react-icons/fc";
import { Divider, Menu, MenuItem, Typography } from "@mui/material";
import { To, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalStateContext";
import { useAuth } from "../../context/AuthContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGlobalState();
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // state to hold search input

  const handleLogout = () => {
    setAnchorEl(null);
    setMenuIndex(null);
    logout();
    navigate("/");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleClose = (path?: To) => {
    setAnchorEl(null);
    setMenuIndex(null);
    if (path) navigate(path);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    setSearchQuery("");
    event.preventDefault();
    if (searchQuery.trim()) {
      //window.location.reload();
      navigate("/search", { state: { query: searchQuery } });
    }
  };

  return (
    <NavContainer>
      <img src="/logo.png" alt="Logo" style={{ width: "65px" }} />
      <StyledLink to="/">
        <LogoText>
          <LogoPart>Buena </LogoPart>
          <LogoPart bold>Leida</LogoPart>
        </LogoText>
      </StyledLink>

      <NavTab to="/">Inicio</NavTab>
      <NavTab to="/bookshelves">Bibliotecas</NavTab>
      <NavTab to="/groupsearch">Grupos</NavTab>
      <NavTab to="/trivia">Trivia</NavTab>

      {/* <NavTab
        to="#"
        style={{ display: "flex", alignItems: "center" }}
        onClick={(e) => handleClick(e, 0)}
      >
        Buscar
        <ArrowDropDownRoundedIcon />
      </NavTab>
      <Menu
        anchorEl={anchorEl}
        open={menuIndex === 0}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose("/recommendations")}>
          Recomendaciones
        </MenuItem>
        <MenuItem onClick={() => handleClose("/lists")}>Listas</MenuItem>
      </Menu>

      <NavTab
        to="#"
        style={{ display: "flex", alignItems: "center" }}
        onClick={(e) => handleClick(e, 1)}
      >
        Comunidad
        <ArrowDropDownRoundedIcon />
      </NavTab>
      <Menu
        anchorEl={anchorEl}
        open={menuIndex === 1}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose("/groups")}>Grupos</MenuItem>
        <MenuItem onClick={() => handleClose("/quotes")}>Citas</MenuItem>
      </Menu> */}

      {/* Search Bar */}
      <SearchWrapper onSubmit={handleSearchSubmit}>
        <StyledSearchInput
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchSubmit(e);
          }}
        />
        <SearchIcon />
      </SearchWrapper>
      <IconContainer>
        <IconBox>
          <Icon
            onClick={() => navigate("/notifications")}
            title="Notificaciones"
          >
            <NotificationsIcon />
          </Icon>
        </IconBox>
        {/* <IconBox>
          <Icon title="Discusiones de grupo">
            <ForumIcon />
          </Icon>
        </IconBox>
        <IconBox>
          <Icon title="Mensajes">
            <EmailIcon />
          </Icon>
        </IconBox> */}
        <IconBox>
          <Icon onClick={() => navigate("/friends")} title="Amigos">
            <PeopleIcon />
          </Icon>
        </IconBox>

        {/* Profile Menu */}
        <IconBox>
          <Icon title="Perfil" onClick={(e) => handleClick(e, 2)}>
            <FcReading />
          </Icon>
        </IconBox>
        <Menu
          anchorEl={anchorEl}
          open={menuIndex === 2}
          onClose={() => handleClose()}
          disableScrollLock
        >
          <Typography sx={{ padding: "8px 16px", fontWeight: "bold" }}>
            {state.username}
          </Typography>
          <MenuItem onClick={() => handleClose("/profile")}>Perfil</MenuItem>
          <MenuItem onClick={() => handleClose("/myreviews")}>Reseñas</MenuItem>
          {/* <MenuItem onClick={() => handleClose("/bookshelves")}>
            Bibliotecas
          </MenuItem> */}
          <Divider />
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
      </IconContainer>
    </NavContainer>
  );
};

export default NavBar;
