import { Title } from "../SearchBar/styled";
import {
  CardContainer,
  Container,
  CreateButton,
  DiscussionContainer,
  DiscussionsContainer,
  GroupCard,
  GroupDescription,
  GroupImage,
  GroupInfoContainer,
  GroupProfile,
  InfoContainer,
  GroupTitle,
  InteractButton,
  LeftSection,
  Name,
  ProfilePicture,
  RightSection,
  Subtitle,
  Username,
  SectionTitle,
} from "./styled";

import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FavoriteGenders, GenderTag } from "../OtherProfile/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LeftColumn } from "../Book/styled";
import { DEFAULT_COVER_IMAGE } from "../Book";
import axios from "axios";
import { useGlobalState } from "../../context/GlobalStateContext";

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

const API_URL = "http://localhost:3000";

export const Group = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.query || "";

  const emptyGroup: Group = {
    groupId: 0,
    name: "",
    photo: defaultPhotoUrl,
    creatorId: -1,
    bio: "",
    genre: [],
  };

  const [imOwner, setImOwner] = useState(false);
  const [groupDetails, setgroupDetails] = useState<Group>(emptyGroup);
  const [members, setMembers] = useState<UserData[]>([]);
  const [creatorData, setCreatorData] = useState<UserData>();

  const [showCreateDiscussionModal, setShowCreateDiscussionModal] =
    useState(false);

  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`${API_URL}/groups/${groupId}/info`);
        setgroupDetails(response.data.group);
      } catch (error) {
        console.error("Error fetching group data: ", error);
      }
    };

    fetchGroupData();
  }, []);

  const handleUserClick = (userId: number) => {
    navigate("/otherprofile", { state: { query: userId } });
  };

  const { state } = useGlobalState();

  const [newDiscussionName, setNewDiscussionName] = useState("");

  const handleClose = () => {
    setShowCreateDiscussionModal(false);
  };

  const handleCreateNewDiscussion = () => {
    if (newDiscussionName.length === 0) {
      enqueueSnackbar("El nombre de la discusión no puede estar vacío.", {
        variant: "error",
      });
      handleClose();
      return;
    }

    try {
      axios.post(`${API_URL}/discussions/${groupId}/create-discussion/`, {
        name: newDiscussionName,
        creatorId: state.id,
      });
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
            `${API_URL}/users/${groupDetails.creatorId}/profile`
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
          `${API_URL}/groups/${groupId}/members`
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching group members: ", error);
      }
    };

    const fetchDiscussions = async () => {
      try {
        const response = await axios.get(`${API_URL}/discussions/${groupId}`);
        setDiscussions(response.data);
      } catch (error) {
        console.error("Error fetching Discussions: ", error);
      }
    };

    fetchCreatorData();
    fetchMembers();
    fetchDiscussions();

    if (groupDetails.creatorId == state.id) {
      setImOwner(true);
    }
  }, [groupDetails]);

  return (
    <Container>
      <LeftSection>
        <GroupProfile>
          <GroupInfoContainer>
            <GroupImage
              src={groupDetails ? groupDetails.photo : defaultPhotoUrl}
            />
            {/* Si soy owner, aca se muestra un boton de destuir. Si no, Join/Salir*/}
            <InteractButton>Unirse</InteractButton>
          </GroupInfoContainer>
          <GroupDescription>
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
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "3px",
              }}
            >
              Descripción:
            </Typography>
            <Typography>{groupDetails.bio}</Typography>
            <FavoriteGenders>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                Géneros:
              </Typography>
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
          <CreateButton onClick={() => setShowCreateDiscussionModal(true)}>
            Crear discusión
          </CreateButton>
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
    </Container>
  );
};

export default Group;
