import { useState } from "react";
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
  UsersCount,
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

export const defaultPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=100a1fe2-fd46-4fc5-9d11-e7b78ed946f5";

// Dummy data
const groupData: GroupData[] = [
  {
    id: 1,
    name: "Tech Enthusiasts",
    description:
      "A group for people passionate about technology and innovation.",
    photo: defaultPhotoUrl,
    usersCount: 150,
  },
  {
    id: 2,
    name: "Book Lovers",
    description: "A community for sharing and discussing great reads.",
    photo: defaultPhotoUrl,
    usersCount: 75,
  },
  {
    id: 3,
    name: "Fitness Freaks",
    description:
      "Join us to share tips and motivation for a healthy lifestyle.",
    photo: defaultPhotoUrl,
    usersCount: 200,
  },
  {
    id: 4,
    name: "Travel Addicts",
    description: "For those who can't stop exploring the world.",
    photo: defaultPhotoUrl,
    usersCount: 120,
  },
  {
    id: 5,
    name: "Gaming Legends",
    description: "A group for gamers to connect and compete.",
    photo: defaultPhotoUrl,
    usersCount: 300,
  },
];

interface GroupData {
  id: number;
  name: string;
  description: string;
  photo: string;
  usersCount: number;
}

// TODO fetch de API
const existingGroupCategories = [
  "Deportes",
  "Música",
  "Arte",
  "Tecnología",
  "Viajes",
];

// TODO fetch de API
const availableCategories = [
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
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [rankingMode, setRankingMode] = useState("Default");
  const [showCreateGroupModal, setshowCreateGroupModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    console.log("Search:", query);
  };

  const handleCreateGroup = () => {
    console.log("Crear grupo clicked");
    setshowCreateGroupModal(true);
  };

  const handleClose = () => {
    setshowCreateGroupModal(false);
  };

  const handleGroupClick = (groupId: number) => {
    navigate("/group", { state: { query: groupId } });
  };

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
            <p>No groups found for the specified parameters.</p>
          ) : (
            groupData.map((group) => (
              <GroupCard key={group.id}>
                <GroupImage
                  src={group.photo}
                  onClick={() => handleGroupClick(group.id)}
                />
                <GroupInfo>
                  <GroupName onClick={() => handleGroupClick(group.id)}>
                    {group.name}
                  </GroupName>
                  <GroupDescription>
                    {group.description.length > 100
                      ? `${group.description.slice(0, 100)}...`
                      : group.description}
                  </GroupDescription>
                  <UsersCount>Usuarios: {group.usersCount}</UsersCount>
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
            <CategoryItem key={index}>{category}</CategoryItem>
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
      <Dialog open={showCreateGroupModal} onClose={handleClose}>
        <DialogTitle>Crear Grupo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Group name"
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
            <Button color="primary">Guardar</Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GroupSearch;
