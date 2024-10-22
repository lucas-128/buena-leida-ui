import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #333;
  height: 65px;
  border-bottom: 1px solid lightgrey;
  padding-left: 17.8%;
`;

export const LogoText = styled.h1`
  font-size: 24px;
  margin-right: 20px;
  display: flex;
`;

export const LogoPart = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "bold",
})<{ bold?: boolean }>`
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1%;
`;

export const GenreGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

export const GenreItem = styled.div`
  background-color: rgb(247, 247, 247);
  border: 1px solid lightgray;
  padding: 10px;
  transition: background-color 0.3s, border-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgb(237, 237, 237);
    border-color: gray;
  }
`;

export const Checkbox = styled.input`
  margin: 5px;
`;
