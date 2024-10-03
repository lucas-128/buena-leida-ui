import styled from "styled-components";
import { Button, TextField, Typography } from "@mui/material";

export const LoginHbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const LoginVbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  gap: 10px;
`;

export const Title = styled(Typography)`
  color: darkblue;
  margin-bottom: 20px;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 15px;
`;

export const PasswordField = styled(TextField)`
  margin-bottom: 25px;
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
`;
