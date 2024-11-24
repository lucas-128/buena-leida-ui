import { Title } from "../SearchBar/styled";
import {
  CardContainer,
  Container,
  CreateButton,
  DiscussionContainer,
  DiscussionsContainer,
  GroupDescription,
  GroupImage,
  GroupInfoContainer,
  GroupProfile,
  InfoContainer,
  InteractButton,
  LeftSection,
  Name,
  OwnerDeleteImageButton,
  ProfilePicture,
  RightSection,
  Subtitle,
  Username,
} from "./styled";

import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FavoriteGenders, GenderTag } from "../OtherProfile/styled";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import axios from "axios";
import { useGlobalState } from "../../context/GlobalStateContext";
import { StyledDialogContent, StyledFormControl } from "../GroupSearch/styled";

export const defaultPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=100a1fe2-fd46-4fc5-9d11-e7b78ed946f5";

interface Discussion {
  discussionId: number;
  name: string;
  creatorUser: {
    username: string;
    name: string;
    profilePhoto: string;
  };
}

interface Group {
  groupId: number;
  name: string;
  photo: string;
  creatorId: number;
  bio: string;
  genre: string[];
}

interface UserData {
  id: number;
  name: string;
  username: string;
  bio: string;
  profilePhoto: string;
  favouritegenders: string[];
}

//const API_URL = "http://localhost:3000";

export const Group = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.query || "";

  const [newBio, setNewBio] = useState("");

  const emptyGroup: Group = {
    groupId: 0,
    name: "",
    photo: defaultPhotoUrl,
    creatorId: -1,
    bio: "",
    genre: [],
  };

  const [showEditBioModal, setShowEditBioModal] = useState(false);
  const [showEditGenresModal, setShowGenresBioModal] = useState(false);

  const [imOwner, setImOwner] = useState(false);
  const [groupDetails, setgroupDetails] = useState<Group>(emptyGroup);
  const [members, setMembers] = useState<UserData[]>([]);
  const [creatorData, setCreatorData] = useState<UserData>();

  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const fetchAvailableGenres = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/genres`);
        setAvailableCategories(response.data);
      } catch (error) {
        console.log("Error fetching genres: ", error);
      }
    };

    fetchAvailableGenres();
  }, []);

  const [showCreateDiscussionModal, setShowCreateDiscussionModal] =
    useState(false);

  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  const handleDeleteGroup = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/groups/${groupId}/remove-group`,
        {
          data: {
            creatorId: state.id,
          },
        }
      );
      enqueueSnackbar("Grupo eliminado con éxito.", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log("error deleting group: ", error);
      enqueueSnackbar("Error al eliminar grupo", { variant: "error" });
    }
  };

  const handleSaveNewBio = async () => {
    if (newBio.length === 0) {
      enqueueSnackbar("La descripción no puede estar vacía.", {
        variant: "error",
      });
      handleClose();
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/groups/${groupId}/update-bio`, {
        bio: newBio,
        creatorId: state.id,
      });

      setNewBio("");
      window.location.reload();
    } catch (error) {
      console.log("Error updating group bio: ", error);
    }
  };

  const handleUpdateGenres = async () => {
    if (selectedCategories.length === 0) {
      enqueueSnackbar("Debes seleccionar al menos un género.", {
        variant: "error",
      });
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3000/groups/${groupId}/update-genre`,
        {
          genre: selectedCategories,
          creatorId: state.id,
        }
      );

      window.location.reload();
    } catch (error) {
      console.log("Error updating group genres: ", error);
    }
  };

  const handleDeleteImage = async () => {
    if (!state.username) return;
    const storageRef = ref(storage, `groups/${groupDetails.name}/photo.jpg`);
    try {
      await getMetadata(storageRef);
      await deleteObject(storageRef);

      // pegada axios para actualizar bdd
      try {
        await axios.patch(
          `http://localhost:3000/groups/${groupId}/update-photo`,
          {
            groupPhoto: defaultPhotoUrl,
            creatorId: state.id,
          }
        );

        window.location.reload();
      } catch (e) {
        console.log("Error updating pic: ", e);
        enqueueSnackbar("Error actualizando imagen.", {
          variant: "error",
        });
      }
    } catch (error) {
      // La imagen ya esta borrada
    }
  };

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      const image = await readImageFile(file);
      const croppedImageBlob = await cropImage(image);
      const storageRef = ref(storage, `groups/${groupDetails.name}/photo.jpg`);
      await uploadBytes(storageRef, croppedImageBlob);
      // Subir imagen a firebase
      const imageUrl = await getDownloadURL(storageRef);

      try {
        await axios.patch(
          `http://localhost:3000/groups/${groupId}/update-photo`,
          {
            groupPhoto: imageUrl,
            creatorId: state.id,
          }
        );

        window.location.reload();
      } catch (e) {
        console.log("Error updating group pic: ", e);
        enqueueSnackbar("Error actualizando imagen.", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log("Error actualizando image: ", error);
      enqueueSnackbar("Error actualizando imagen.", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/groups/${groupId}/info`
        );
        setgroupDetails(response.data.group);
      } catch (error) {
        console.log("Error fetching group data: ", error);
      }
    };

    fetchGroupData();
  }, []);

  const handleUserClick = (userId: number) => {
    navigate("/otherprofile", { state: { query: userId } });
  };

  const { state } = useGlobalState();

  const [newDiscussionName, setNewDiscussionName] = useState("");
  const [isGroupMember, setIsGroupMember] = useState(false);
  const handleClose = () => {
    setShowCreateDiscussionModal(false);
    setShowEditBioModal(false);
    setShowGenresBioModal(false);
    setShowDeleteGroupModal(false);
  };

  const handleCreateNewDiscussion = async () => {
    if (newDiscussionName.length === 0) {
      enqueueSnackbar("El nombre de la discusión no puede estar vacío.", {
        variant: "error",
      });
      handleClose();
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/discussions/${groupId}/create-discussion/`,
        {
          name: newDiscussionName,
          creatorId: state.id,
        }
      );
      enqueueSnackbar("Discusión creada con éxito.", { variant: "success" });
    } catch (error) {
      console.log("Error creando discusión: ", error);
    }

    handleClose();
    setNewDiscussionName("");
  };

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (groupDetails.creatorId != -1) {
        try {
          const response = await axios.get(
            `http://localhost:3000/users/${groupDetails.creatorId}/profile`
          );
          const data = response.data;
          setCreatorData(data);
        } catch (err) {
          console.log("error fetching user data");
        }
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/groups/${groupId}/members`
        );
        setMembers(response.data);
      } catch (error) {
        console.log("Error fetching group members: ", error);
      }
    };

    const fetchDiscussions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/discussions/${groupId}`
        );
        setDiscussions(response.data);
      } catch (error) {
        console.log("Error fetching Discussions: ", error);
      }
    };

    fetchCreatorData();
    fetchMembers();
    fetchDiscussions();

    if (groupDetails.creatorId == state.id) {
      setImOwner(true);
    }

    if (imOwner || members.find((member) => member.id === state.id)) {
      setIsGroupMember(true);
    }
  }, [groupDetails]);

  const handleJoinGroup = async () => {
    try {
      await axios.post(`http://localhost:3000/groups/enterGroup`, {
        groupId: groupId,
        userId: state.id,
      });
      window.location.reload();
    } catch (error) {
      console.log("error joining group: ", error);
      enqueueSnackbar("Error al unirse al grupo", { variant: "error" });
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await axios.delete(`http://localhost:3000/groups/leaveGroup`, {
        data: {
          groupId: groupId,
          userId: state.id,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log("error leaving group: ", error);
      enqueueSnackbar("Error al salir del grupo", { variant: "error" });
    }
  };

  useEffect(() => {
    if (groupDetails.creatorId == state.id) {
      setImOwner(true);
    }

    if (imOwner || members.find((member) => member.id === state.id)) {
      setIsGroupMember(true);
    }
  }, [state.id, groupDetails]);

  return (
    <Container>
      <LeftSection>
        <GroupProfile>
          <GroupInfoContainer>
            <GroupImage
              src={groupDetails ? groupDetails.photo : defaultPhotoUrl}
            />
            {imOwner ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  size="small"
                  variant="contained"
                  component="label"
                  style={{
                    backgroundColor: "var(--d-color)",
                    color: "white",
                    textAlign: "center",
                    padding: "9px",
                    textDecoration: "none",
                    fontSize: "13px",
                    margin: "4px 2px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    width: "122.5px",
                    marginTop: "15px",
                    height: "35px",
                    transition: "background-color 0.3s",
                  }}
                >
                  Subir Imagen
                  <input type="file" hidden onChange={handleImageUpload} />
                </Button>
                {/* <OwnerButton onClick={() => handleImageUpload}>
                  Subir Imagen
                  <input type="file" hidden onChange={handleImageUpload} />
                </OwnerButton> */}

                <OwnerDeleteImageButton onClick={handleDeleteImage}>
                  BORRAR IMAGEN
                </OwnerDeleteImageButton>
              </div>
            ) : isGroupMember ? (
              <div>
                <InteractButton onClick={handleLeaveGroup}>
                  Salir
                </InteractButton>
              </div>
            ) : (
              <div>
                <InteractButton onClick={handleJoinGroup}>
                  Unirse
                </InteractButton>
              </div>
            )}
          </GroupInfoContainer>
          <GroupDescription>
            {imOwner ? (
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "32px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setShowDeleteGroupModal(true)}
              >
                {groupDetails.name} 🗑️
              </Typography>
            ) : (
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "32px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                {groupDetails.name}
              </Typography>
            )}

            {imOwner ? (
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "3px",
                  cursor: "pointer",
                }}
                onClick={() => setShowEditBioModal(true)}
              >
                Descripción ✏️:
              </Typography>
            ) : (
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "3px",
                }}
              >
                Descripción:
              </Typography>
            )}

            <Typography>{groupDetails.bio}</Typography>
            <FavoriteGenders>
              {imOwner ? (
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowGenresBioModal(true)}
                >
                  Géneros ✏️:
                </Typography>
              ) : (
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  Géneros:
                </Typography>
              )}

              {groupDetails.genre.map((g, index) => (
                <GenderTag key={index}>{g}</GenderTag>
              ))}
            </FavoriteGenders>
          </GroupDescription>
          <Divider />
        </GroupProfile>
        <Divider style={{ marginTop: "90px" }}></Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Subtitle>Discusiones</Subtitle>
          {isGroupMember && (
            <CreateButton onClick={() => setShowCreateDiscussionModal(true)}>
              Crear discusión
            </CreateButton>
          )}
        </div>

        <DiscussionsContainer>
          {discussions.map((discussion, index) => (
            <DiscussionContainer
              key={index}
              onClick={() => {
                navigate("/discussion", {
                  state: { query: discussion.discussionId },
                });
              }}
            >
              <InfoContainer>
                <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {discussion.name}
                </Typography>
                <Typography style={{ fontSize: "14px", color: "gray" }}>
                  Iniciada por: {discussion.creatorUser.name}
                </Typography>
                {/* <Typography style={{ fontSize: "14px" }}>
                  {discussion.content.length > 100
                    ? discussion.content.substring(0, 97) + "..."
                    : discussion.content}
                </Typography> */}
              </InfoContainer>
            </DiscussionContainer>
          ))}
        </DiscussionsContainer>
      </LeftSection>
      <RightSection>
        <Title>Creador:</Title>
        <CardContainer onClick={() => handleUserClick(groupDetails.creatorId)}>
          <ProfilePicture src={creatorData?.profilePhoto} />
          <InfoContainer>
            <Name>{creatorData?.name}</Name>
            <Username>@{creatorData?.username}</Username>
          </InfoContainer>
        </CardContainer>
        <Title>Miembros:</Title>
        {members.length === 0 ? (
          <p>Este grupo no tiene miembros</p>
        ) : (
          members.map((member, index) => (
            <CardContainer
              onClick={() => handleUserClick(member.id)}
              key={index}
            >
              <ProfilePicture src={member.profilePhoto} />
              <InfoContainer>
                <Name>{member.name}</Name>
                <Username>@{member.username}</Username>
              </InfoContainer>
            </CardContainer>
          ))
        )}
      </RightSection>

      <Dialog open={showCreateDiscussionModal} onClose={handleClose}>
        <DialogTitle>Nueva discusión</DialogTitle>
        <DialogContent sx={{ minWidth: "400px" }}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Titulo de la discusión..."
              value={newDiscussionName}
              onChange={(e) =>
                setNewDiscussionName(e.target.value.slice(0, 50))
              }
              helperText={`${newDiscussionName.length}/50`}
              slotProps={{
                htmlInput: { maxLength: 50 },
              }}
              variant="outlined"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCreateNewDiscussion} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showEditBioModal} onClose={handleClose}>
        <DialogTitle>Editar descripción:</DialogTitle>
        <DialogContent sx={{ minWidth: "400px" }}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Nueva descripción..."
              value={newBio}
              onChange={(e) => setNewBio(e.target.value.slice(0, 200))}
              helperText={`${newBio.length}/200`}
              slotProps={{
                htmlInput: { maxLength: 200 },
              }}
              variant="outlined"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSaveNewBio} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditGenresModal}
        onClose={handleClose}
        disableScrollLock
      >
        <DialogTitle>Editar géneros:</DialogTitle>
        <DialogContent>
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

          <Button color="primary" onClick={handleUpdateGenres}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showDeleteGroupModal}
        onClose={handleClose}
        disableScrollLock
      >
        <DialogTitle>Eliminar Grupo</DialogTitle>
        <DialogContent>
          <Typography>Esta accion es irreversible.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          <Button color="primary" onClick={handleDeleteGroup}>
            Borrar Grupo
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Group;
// Helper function to crop the image
const cropImage = (image: HTMLImageElement): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const size = Math.min(image.width, image.height);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    ctx.drawImage(
      image,
      (image.width - size) / 2,
      (image.height - size) / 2,
      size,
      size,
      0,
      0,
      size,
      size
    );

    canvas.toBlob(
      (blob: Blob | null) => {
        if (blob) {
          resolve(blob);
        }
      },
      "image/jpeg",
      1
    );
  });
};
// Helper function to read the image file
const readImageFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => resolve(img);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
