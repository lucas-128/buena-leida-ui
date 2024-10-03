import React from "react";
import {
  NavContainer,
  LogoText,
  NavTab,
  //LogoutButton,
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

      <NavTab to="/">Home</NavTab>
      <NavTab to="/">My Books</NavTab>
      <NavTab to="/" style={{ display: "flex", alignItems: "center" }}>
        Browse
        <ArrowDropDownRoundedIcon />
      </NavTab>

      <NavTab to="/" style={{ display: "flex", alignItems: "center" }}>
        Community
        <ArrowDropDownRoundedIcon />
      </NavTab>

      <SearchWrapper>
        <StyledSearchInput placeholder="Buscar libros" />
        <SearchIcon />
      </SearchWrapper>

      <IconContainer>
        <Icon title="Notifications">
          <NotificationsIcon />
        </Icon>
        <Icon title="Group Discussions">
          <ForumIcon />
        </Icon>
        <Icon title="Messages">
          <EmailIcon />
        </Icon>
        <Icon title="Friends">
          <PeopleIcon />
        </Icon>
        <StyledLink to="/profile" title="Profile">
          <Icon className="profile">
            <FcReading />
          </Icon>
        </StyledLink>
      </IconContainer>
    </NavContainer>
  );
};

export default NavBar;
