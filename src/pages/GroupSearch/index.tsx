import { useState } from "react";
import {
  SearchButton,
  SearchForm,
  SearchInput,
  Title,
} from "../SearchBar/styled";
import {
  Container,
  RightSection,
  CategoryGrid,
  CategoryItem,
  SectionTitle,
  CreateGroupButton,
} from "./styled";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

const categories = [
  "Deportes",
  "Música",
  "Arte",
  "Tecnología",
  "Cocina",
  "Viajes",
  "Lectura",
  "Fotografía",
];

export const GroupSearch = () => {
  const [query, setQuery] = useState("");
  const [rankingMode, setRankingMode] = useState("Default");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", query);
  };

  const handleCreateGroup = () => {
    console.log("Crear grupo clicked");
  };

  return (
    <Container>
      <div style={{ minWidth: "500px" }}>
        <Title>Grupos</Title>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
          />
          <SearchButton type="submit">Buscar</SearchButton>
        </SearchForm>

        <FormControl
          variant="standard"
          sx={{
            minWidth: 120,
            marginBottom: "5px",
            marginTop: "5px",
            borderRadius: "5px",
          }}
        >
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Ordenar
          </InputLabel>
          <NativeSelect
            value={rankingMode}
            onChange={(event) => setRankingMode(event.target.value)}
          >
            <option value={"rankings"}>Popularidad</option>
            <option value={"Default"}>Default</option>
          </NativeSelect>
        </FormControl>
      </div>

      <RightSection>
        <SectionTitle>Grupos por categoria</SectionTitle>
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryItem key={index}>{category}</CategoryItem>
          ))}
        </CategoryGrid>
        <SectionTitle>Más Grupos</SectionTitle>
        <CreateGroupButton onClick={handleCreateGroup}>
          Crear grupo
        </CreateGroupButton>
      </RightSection>
    </Container>
  );
};

export default GroupSearch;
