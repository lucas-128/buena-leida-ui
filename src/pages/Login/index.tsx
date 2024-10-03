import { Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { SetStateAction, useState } from "react";
import {
  LoginHbox,
  LoginVbox,
  PasswordField,
  StyledTextField,
  Title,
} from "./styled";

export const Login = () => {
  const { login } = useAuth();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (mail === "" || pass === "") {
      alert("Empty input fields");
      return;
    }
    setIsLoading(true);
    const result = await login(mail, pass);

    if (result && result.error) {
      alert(result.message);
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      return;
    }
  };

  return (
    <LoginHbox>
      {isLoading ? (
        <CircularProgress color="primary" />
      ) : (
        <LoginVbox>
          <Title variant="h2">Bunea Leida</Title>
          <StyledTextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setMail(e.target.value)
            }
          />
          <PasswordField
            id="outlined-basic2"
            label="Password"
            type="password"
            variant="outlined"
            required
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setPass(e.target.value)
            }
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </LoginVbox>
      )}
    </LoginHbox>
  );
};
