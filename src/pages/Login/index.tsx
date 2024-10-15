import { CircularProgress, Tab, Tabs, Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async () => {
    if (mode === "login" && (mail === "" || pass === "")) {
      alert("Error: complete todos los campos");
      return;
    }

    if (mode === "signup" && (name.length < 1 || name.length > 30)) {
      alert("Error: El nombre debe tener entre 1 y 30 caracteres");
      return;
    }

    if (!validateEmail(mail)) {
      alert("Error: Dirección de correo inválida");
      return;
    }

    if (mode === "signup" && (pass.length < 6 || pass.length > 13)) {
      alert("Error: La contraseña debe tener entre 6 y 13 caracteres");
      return;
    }

    if (mode === "signup" && pass !== confirmPass) {
      alert("Error: Las contraseñas no coinciden");
      return;
    }

    if (mode === "signup" && !validateName(name)) {
      alert(
        "Error: El nombre no puede contener números o caracteres especiales"
      );
      return;
    }

    setIsLoading(true);
    let result;

    if (mode === "login") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second

      // Pegada api login. Si no existe el mail, cambiar a modo signup con mensaje de error.
      const isNotRegistered = false; // testing

      if (isNotRegistered) {
        alert(`Error: El correo ${mail} no está registrado. Crea una cuenta`);
        setMode("signup");
        setPass("");
        setName("");
        setConfirmPass("");
      } else {
        result = await login(mail, pass);
        console.log(result);
      }
    } else {
      // Modo === Signup

      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Pegada api para ver que mail no este registado. Si no esta en uso -> pasar a siguiente pagina.
      // Si esta en uso, cambiar a modo login con mensaje de error.

      const isRegistered = false; // testing

      if (isRegistered) {
        alert(`Error: El correo ${mail} ya está registrado. Inicia sesion`);
        setMode("login");
        setPass("");
        setName("");
        setConfirmPass("");
      } else {
        navigate("/create-account", { state: { mail, pass, name } });
      }
    }

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
            onChange={(_, newValue: "login" | "signup") => {
              setMode(newValue);
              setMail("");
              setPass("");
              setName("");
              setConfirmPass("");
            }}
            centered
          >
            <Tab label="Iniciar Sesión" value="login" />
            <Tab label="Crear Cuenta" value="signup" />
          </Tabs>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                marginTop: "70px",
              }}
            >
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              <StyledTextField
                label="Mail"
                variant="outlined"
                required={mode !== "login"}
                value={mail}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMail(e.target.value)
                }
              />
              <StyledTextField
                label="Contraseña"
                type="password"
                variant="outlined"
                value={pass}
                required={mode !== "login"}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPass(e.target.value)
                }
              />
              {mode === "signup" && (
                <>
                  <StyledTextField
                    label="Confirmar contraseña"
                    type="password"
                    variant="outlined"
                    value={confirmPass}
                    required
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setConfirmPass(e.target.value)}
                  />
                  <Typography
                    variant="caption"
                    style={{ color: "#888", marginTop: "4px" }}
                  >
                    (i) La contraseña debe contener entre 6 y 13 caracteres.
                  </Typography>

                  <StyledTextField
                    label="Nombre y apellido"
                    variant="outlined"
                    value={name}
                    required
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setName(e.target.value)}
                  />
                </>
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
