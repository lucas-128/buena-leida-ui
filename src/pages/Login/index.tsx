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
import { useSnackbar } from "notistack";

const NOT_FOUND = 404;
const INVALID_PASSWORD = 401;
const USERNAME_TAKEN = 409;
const EMAIL_TAKEN = 400;

export const Login = () => {
  const { login, checkExistance } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    return usernameRegex.test(username);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (
      mode === "signup" &&
      (mail === "" ||
        pass === "" ||
        username === "" ||
        confirmPass === "" ||
        name === "" ||
        username === "")
    ) {
      enqueueSnackbar("Completa todos los campos!", {
        variant: "error",
      });

      setIsLoading(false);
      return;
    }

    if (mode === "login" && (mail === "" || pass === "")) {
      enqueueSnackbar("Completa todos los campos!", {
        variant: "error",
      });

      setIsLoading(false);

      return;
    }

    if (mode === "signup" && (name.length < 1 || name.length > 30)) {
      enqueueSnackbar(
        "El campo nombre y apellido debe tener entre 1 y 30 caracteres",
        {
          variant: "error",
        }
      );
      setIsLoading(false);

      return;
    }

    if (mode === "signup" && (username.length < 1 || username.length > 30)) {
      enqueueSnackbar(
        "El nombre de usuario debe tener entre 1 y 30 caracteres",
        {
          variant: "error",
        }
      );
      setIsLoading(false);

      return;
    }

    if (!validateEmail(mail)) {
      enqueueSnackbar("Dirección de correo inválida", {
        variant: "error",
      });

      setIsLoading(false);

      return;
    }

    if (mode === "signup" && (pass.length < 6 || pass.length > 20)) {
      enqueueSnackbar("La contraseña debe tener entre 6 y 20 caracteres", {
        variant: "error",
      });

      setIsLoading(false);

      return;
    }

    if (mode === "signup" && pass !== confirmPass) {
      enqueueSnackbar("Las contraseñas no coinciden", {
        variant: "error",
      });
      setIsLoading(false);

      return;
    }

    if (mode === "signup" && !validateUsername(username)) {
      enqueueSnackbar(
        "El nombre de usuario no puede contener espacios o caracteres especiales",
        {
          variant: "error",
        }
      );
      setIsLoading(false);
      return;
    }

    if (mode === "signup" && !validateName(name)) {
      enqueueSnackbar(
        "El nombre y apellido no puede contener números o caracteres especiales",
        {
          variant: "error",
        }
      );
      setIsLoading(false);

      return;
    }

    if (mode === "login") {
      const resultCode = await login(mail, pass);

      if (resultCode === INVALID_PASSWORD) {
        setIsLoading(false);

        enqueueSnackbar("Contraseña incorrecta", {
          variant: "error",
        });
        setPass("");
        return;
      } else if (resultCode === NOT_FOUND) {
        setIsLoading(false);

        enqueueSnackbar(
          `El correo ${mail} no está registrado. Crea una cuenta`,
          {
            variant: "error",
          }
        );
        setMode("signup");
        setPass("");
        setName("");
        setConfirmPass("");
        return;
      } else {
        return;
      }
    } else {
      const resultCode = await checkExistance(mail, username);
      //console.log(resultCode);

      if (resultCode === USERNAME_TAKEN) {
        setIsLoading(false);

        enqueueSnackbar(`El nombre de usuario ${username} ya está tomado`, {
          variant: "error",
        });

        setUsername("");
      } else if (resultCode === EMAIL_TAKEN) {
        setIsLoading(false);

        enqueueSnackbar(`El correo ${mail} ya está registrado. Inicia sesion`, {
          variant: "error",
        });

        setMode("login");
        setPass("");
        setName("");
        setConfirmPass("");
      } else {
        setIsLoading(false);
        navigate("/create-account", { state: { mail, pass, name, username } });
      }
    }
  };

  const divStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    backgroundColor: "rgb(239,239,239)",
  };

  return (
    <div style={divStyle}>
      <NavContainer>
        <img src="/logo.png" alt="Logo" style={{ width: "65px" }} />

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
                    (i) La contraseña debe contener entre 6 y 20 caracteres.
                  </Typography>

                  <StyledTextField
                    label="Nombre y apellido"
                    variant="outlined"
                    value={name}
                    required
                    helperText={`${name.length}/30 | Solo letras y espacios.`}
                    slotProps={{
                      htmlInput: { maxLength: 30 },
                    }}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setName(e.target.value)}
                  />
                  <StyledTextField
                    label="Nombre de usuario"
                    variant="outlined"
                    value={username}
                    required
                    helperText={`${username.length}/30 | Solo letras y numeros.`}
                    slotProps={{
                      htmlInput: { maxLength: 30 },
                    }}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setUsername(e.target.value)}
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
