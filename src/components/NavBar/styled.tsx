import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center; 
  background-color: rgb(244, 241, 234);
  color: #333;
  height: 65px; 
  flex-wrap: wrap;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const LogoText = styled.h1`
  font-size: 24px;
  margin-right: 20px;
  display: flex; 
`;

export const LogoPart = styled.span<{ bold?: boolean }>` 
  font-weight: ${(props) => (props.bold ? "bold" : "normal")}; 
`;

export const NavTab = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 18px;
  padding: 0 20px; 
  display: flex;
  align-items: center;
  height: 100%; 
  background-color: transparent;

  &:hover {
    background-color: rgb(53,33,16); 
    color: white; 
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
  width: 14%;
`;

export const StyledSearchInput = styled.input`
  padding: 10px;
  padding-right: 40px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; 
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px; 
  color: #aaa;
  pointer-events: none; 
`;


export const IconContainer = styled.div`
  display: flex;
  align-items: center; 
`;

export const IconBox = styled.div`
  height: 65px; 
  display: flex; 
  align-items: center; 

  &:hover {
    background-color: rgb(53,33,16); 
  }
  
`;

export const Icon = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(110, 89, 66);
  color: white;

  &.profile {
    background-color: rgb(239, 238, 224); 
    border: 1px solid lightgray; 
  }
`;

