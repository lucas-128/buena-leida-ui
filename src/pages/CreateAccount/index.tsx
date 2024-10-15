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
];

export const CreateAccount = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleSubmit = () => {
    console.log("crear cuenta con datos y generros: ", selectedGenres);
    // create account, set logged in, update globalState, navigate home
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
          style={{ marginTop: "20px", minHeight: "40px" }}
        >
          {isButtonDisabled
            ? "Selecciona al menos un género para continuar"
            : "Continuar"}
        </Button>
      </Container>
    </div>
  );
};
