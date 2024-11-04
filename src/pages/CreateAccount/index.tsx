import { useState } from "react";
import {
  Checkbox,
  Container,
  GenreGrid,
  GenreItem,
  LogoPart,
  LogoText,
  NavContainer,
} from "./styled";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

const genres = [
  "Ficción",
  "No-Ficción",
  "Fantasía",
  "Ciencia Ficción",
  "Romance",
  "Suspenso",
  "Historia",
  "Biografía",
  "Misterio",
  "Ciencia",
  "Aventura",
  "Terror",
  "Clásicos",
  "Juvenil",
  "Autobiografía",
  "Poesía",
  "Drama",
  "Ensayo",
  "Cuento",
  "Novela Gráfica",
  "Crónica",
  "Humor",
  "Realismo Mágico",
  "Distopía",
  "Western",
  "Policíaco",
  "Mitología",
  "Fábula",
  "Deportes",
  "Literatura Infantil",
  "Paranormal",
  "Viajes",
  "Epistolar",
  "Teatro",
  "Satira",
  "Utopía",
];

const INVALID_DATA = 400;

export const CreateAccount = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const navigate = useNavigate();
  const { register } = useAuth();
  const location = useLocation();
  const { mail, pass, name, username } = location.state || {};

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    const resultCode = await register(
      mail,
      name,
      username,
      pass,
      selectedGenres
    );

    if (resultCode === INVALID_DATA) {
      enqueueSnackbar("Error registrando usuario, por favor intenta de nuevo", {
        variant: "error",
      });
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const isButtonDisabled = selectedGenres.length === 0;

  const handleGenreChange = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
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

        <LogoPart>Creación de cuenta</LogoPart>
      </NavContainer>
      <Container>
        <Typography
          sx={{
            fontSize: "40px",
            padding: "8px 16px",
            marginTop: "30px",
            fontWeight: "bold",
          }}
        >
          Casi listo, selecciona tus géneros favoritos
        </Typography>

        <Typography
          sx={{
            fontSize: "18px",
            marginTop: "20px",
            marginBlockEnd: "20px",
          }}
        >
          Usamos tus géneros favoritos para hacer mejores recomendaciones de
          libros y personalizar lo que ves en la página.
        </Typography>

        <GenreGrid>
          {genres.map((genre) => (
            <GenreItem key={genre} onClick={() => handleGenreChange(genre)}>
              <label>
                <Checkbox
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            </GenreItem>
          ))}
        </GenreGrid>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          style={{ marginTop: "25px", minHeight: "40px" }}
        >
          {isButtonDisabled
            ? "Selecciona al menos un género para continuar"
            : "Continuar"}
        </Button>
      </Container>
    </div>
  );
};
