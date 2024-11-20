import { useEffect, useState } from "react";
import {
  ResultsContainer,
  SearchButton,
  SearchForm,
  SearchInput,
  Spinner,
  Title,
} from "../SearchBar/styled";
import {
  Container,
  RightSection,
  CategoryGrid,
  CategoryItem,
  SectionTitle,
  CreateGroupButton,
  GroupName,
  GroupImage,
  GroupDescription,
  GroupCard,
  GroupInfo,
  StyledFormControl,
  StyledDialogContent,
} from "./styled";

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useGlobalState } from "../../context/GlobalStateContext";

const API_URL = "http://localhost:3000";

export const defaultPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=100a1fe2-fd46-4fc5-9d11-e7b78ed946f5";

interface GroupData {
  groupId: number;
  name: string;
  bio: string;
  photo: string;
}

export const GroupSearch = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [rankingMode, setRankingMode] = useState("Default");
  const [showCreateGroupModal, setshowCreateGroupModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickCategory = async (category: string) => {
    setIsLoading(true);
    setSearched(true);

    let q;
    if (rankingMode === "rankings") {
      q = `${API_URL}/groups/groups-by-genre/${category}?sort=popularity`;
    } else {
      q = `${API_URL}/groups/groups-by-genre/${category}`;
    }

    try {
      const response = await axios.get(q, {
        params: { query },
      });
      setgroupData(response.data);
    } catch (error) {
      console.error("Error fetching groups by genre: ", error);
      setgroupData([]);
    }

    setIsLoading(false);
  };

  // Para modal crear grupo
  const [availableCategories, setAvailableCategories] = useState([]);
  const [groupData, setgroupData] = useState<GroupData[]>([]);

  const [existingGroupCategories, setExistingGroupCategories] = useState([]);

  // Create group form state //
  const [groupName, setGroupName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  /////////////////////////////

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setIsLoading(true);

    let q;
    if (rankingMode === "rankings") {
      q = `${API_URL}/groups/name/${query}?sort=popularity`;
    } else {
      q = `${API_URL}/groups/name/${query}`;
    }

    try {
      const response = await axios.get(q);
      setgroupData(response.data);
    } catch (error) {
      console.error("Error fetching groups by name: ", error);
      setgroupData([]);
    }

    setIsLoading(false);
  };

  const handleCreateGroup = () => {
    setshowCreateGroupModal(true);
  };

  const handleClose = () => {
    setshowCreateGroupModal(false);
  };

  const { state } = useGlobalState();
  const handleSaveGroup = async () => {
    if (groupName.length === 0) {
      enqueueSnackbar("El nombre no puede estar vacio.", {
        variant: "error",
      });

      return;
    }

    if (selectedCategories.length === 0) {
      enqueueSnackbar("Debes seleccionar al menos 1 genero.", {
        variant: "error",
      });

      return;
    }

    try {
      await axios.post(`${API_URL}/groups/create`, {
        name: groupName,
        genre: selectedCategories,
        creatorId: state.id,
        bio: `Grupo de: ${selectedCategories
          .map((category) => `[${category}]`)
          .join(", ")}`,
      });

      setshowCreateGroupModal(false);
    } catch (error) {
      console.error("Error creating group: ", error);
      enqueueSnackbar("Ya existe un grupo con ese nombre.", {
        variant: "error",
      });
    }

    handleClose();
  };

  const handleGroupClick = (groupId: number) => {
    navigate("/group", { state: { query: groupId } });
  };

  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchGroupGenres = async () => {
      try {
        const response = await axios.get(`${API_URL}/groups/genres`);
        setExistingGroupCategories(response.data);
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };

    const fetchAvailableGenres = async () => {
      try {
        const response = await axios.get(`${API_URL}/books/genres`);
        setAvailableCategories(response.data);
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };

    fetchAvailableGenres();
    fetchGroupGenres();
  }, []);

  return (
    <Container>
      <div style={{ minWidth: "600px" }}>
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
            marginBottom: "15px",
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
        <ResultsContainer>
          {isLoading ? (
            <Spinner />
          ) : groupData.length === 0 ? (
            searched ? (
              <Typography sx={{ fontSize: "18px" }}>
                No se encontraron grupos para los parametros de busqueda.
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "18px" }}>
                Los grupos se van a mostrar aquí.
              </Typography>
            )
          ) : (
            groupData.map((group) => (
              <GroupCard key={group.groupId}>
                <GroupImage
                  src={group.photo}
                  onClick={() => handleGroupClick(group.groupId)}
                />
                <GroupInfo>
                  <GroupName onClick={() => handleGroupClick(group.groupId)}>
                    {group.name}
                  </GroupName>
                  <GroupDescription>
                    {group.bio.length > 75
                      ? `${group.bio.slice(0, 72)}...`
                      : group.bio}
                  </GroupDescription>
                  {/* <UsersCount>
                    Usuarios: {group.usersCount} | Generos:{" "}
                    {group.genres.join(", ").length > 40
                      ? `${group.genres.join(", ").slice(0, 37)}...`
                      : group.genres.join(", ")}
                  </UsersCount> */}
                </GroupInfo>
              </GroupCard>
            ))
          )}
        </ResultsContainer>
      </div>
      <RightSection>
        <SectionTitle>Grupos por categoria</SectionTitle>
        <CategoryGrid>
          {existingGroupCategories.map((category, index) => (
            <CategoryItem
              onClick={() => handleClickCategory(category)}
              key={index}
            >
              {category}
            </CategoryItem>
          ))}
        </CategoryGrid>
        <Divider />
        <SectionTitle>Nuevo Grupo</SectionTitle>
        <Typography>
          Crea tu propio grupo para conectar con otros usuarios!
        </Typography>
        <Typography>
          Comparte y explora ideas en discusiones temáticas diseñadas para tu
          comunidad.
        </Typography>
        <CreateGroupButton onClick={handleCreateGroup}>
          Crear grupo
        </CreateGroupButton>
      </RightSection>
      <Dialog
        open={showCreateGroupModal}
        onClose={handleClose}
        disableScrollLock
      >
        <DialogTitle>Crear Grupo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Nombre del grupo..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value.slice(0, 20))}
              helperText={`${groupName.length}/20`}
              slotProps={{
                htmlInput: { maxLength: 20 },
              }}
              variant="outlined"
            />
          </FormControl>
          <StyledDialogContent>
            {availableCategories.map((category) => (
              <StyledFormControl key={category}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.indexOf(category) !== -1}
                      onChange={() => handleCategoryChange(category)}
                      color="primary"
                    />
                  }
                  label={category}
                />
              </StyledFormControl>
            ))}
          </StyledDialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {availableCategories.length > 0 && (
            <Button color="primary" onClick={handleSaveGroup}>
              Guardar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GroupSearch;
