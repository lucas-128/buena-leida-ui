import styled from "styled-components";
import { Button, TextField, Typography } from "@mui/material";

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginHbox = styled.div`
  display: flex;
  height: 75%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  min-height: 20vh;
`;

export const LoginVbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  min-height: 30%;
  min-width: 400px;
  gap: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 5px;
`;

export const Title = styled(Typography)`
  color: black;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
`;

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
