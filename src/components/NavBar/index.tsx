import React from 'react';
import { 
  NavContainer, 
  LogoText, 
  NavTab, 
  SearchInput, 
  UserIcon, 
  LogoutButton 
} from './styled';

const NavBar: React.FC = () => {
  return (
    <NavContainer>
      <LogoText>Buena Leida</LogoText>
      
      <NavTab to="/">Home</NavTab>
      
      <SearchInput placeholder="Search..." />
      
      <UserIcon>👤</UserIcon>
      
      <LogoutButton>Log Out</LogoutButton>
    </NavContainer>
  );
};

export default NavBar;
