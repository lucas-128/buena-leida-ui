import { CircularProgress, Tab, Tabs } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { SetStateAction, useState } from "react";
import {
  LoginHbox,
  LoginVbox,
  Header,
  StyledTextField,
  StyledButton,
  LogoPart,
  LogoText,
  NavContainer,
} from "./styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Login = () => {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (mail === "" || pass === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (mode === "signup" && pass !== confirmPass) {
      alert("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    let result;
    if (mode === "login") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second
      result = await login(mail, pass);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second
      //result = await signUp(mail, pass);
    }

    // if (result && result.error) {
    //   alert(result.message);
    // }
    setIsLoading(false);
  };

  const divStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    backgroundColor: "rgb(244, 241, 234)",
  };

  return (
    <div style={divStyle}>
      <NavContainer>
        <LogoText>
          <LogoPart>Buena </LogoPart>
          <LogoPart bold>Leida</LogoPart>
        </LogoText>
      </NavContainer>

      <LoginHbox>
        <LoginVbox>
          <Header>
            <AccountCircleIcon style={{ fontSize: 60 }} />
          </Header>

          <Tabs
            value={mode}
            onChange={(_, newValue: "login" | "signup") => setMode(newValue)}
            centered
          >
            <Tab label="Iniciar Sesión" value="login" />
            <Tab label="Crear Cuenta" value="signup" />
          </Tabs>

          {isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <StyledTextField
                label="Mail"
                variant="outlined"
                required
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMail(e.target.value)
                }
              />
              <StyledTextField
                label="Contraseña"
                type="password"
                variant="outlined"
                required
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPass(e.target.value)
                }
              />
              {mode === "signup" && (
                <StyledTextField
                  label="Confirmar contraseña"
                  type="password"
                  variant="outlined"
                  required
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setConfirmPass(e.target.value)}
                />
              )}
              <StyledButton variant="contained" onClick={handleSubmit}>
                {mode === "login" ? "Iniciar Sesion" : "Crear cuenta"}
              </StyledButton>
            </>
          )}
        </LoginVbox>
      </LoginHbox>
    </div>
  );
};
