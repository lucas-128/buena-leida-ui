import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: gray;
  }
`;

export const LogoText = styled.h1`
  font-size: 24px;
  margin: 0;
`;

export const NavTab = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
  margin: 0 20px;

  &:hover {
    color: gray;
  }
`;

export const SearchInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const UserIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin: 0 20px;
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #ff4d4d;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
  }
`;
