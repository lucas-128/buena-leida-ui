//import { useState } from "react";
import { Title } from "../SearchBar/styled";
import {
  CardContainer,
  Container,
  CreateButton,
  DiscussionContainer,
  DiscussionsContainer,
  //GroupCard,
  GroupDescription,
  GroupImage,
  GroupInfoContainer,
  GroupProfile,
  InfoContainer,
  // GroupTitle,
  InteractButton,
  LeftSection,
  Name,
  ProfilePicture,
  RightSection,
  Subtitle,
  Username,
  //SectionTitle,
} from "./styled";

import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";
import { FavoriteGenders, GenderTag } from "../OtherProfile/styled";
import { Divider, Typography } from "@mui/material";
//import { LeftColumn } from "../Book/styled";

export const defaultPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=100a1fe2-fd46-4fc5-9d11-e7b78ed946f5";

const userData1: UserData = {
  id: 100,
  profilePhotoUrl: defaultPhotoUrl,
  realName: "Creator Name 100",
  username: "creator100",
};

const userData34: UserData = {
  id: 100,
  profilePhotoUrl: defaultPhotoUrl,
  realName: "Creator Name 100",
  username: "creator100",
};

const userData2: UserData = {
  id: 101,
  profilePhotoUrl: defaultPhotoUrl,
  realName: "Member Name 101",
  username: "member101",
};

const userData3: UserData = {
  id: 102,
  profilePhotoUrl: defaultPhotoUrl,
  realName: "Member Name 102",
  username: "member102",
};

const userData4: UserData = {
  id: 103,
  profilePhotoUrl: defaultPhotoUrl,
  realName: "Member Name 103",
  username: "member103",
};

const groupDetails: GroupDetails = {
  name: "La verdad de la milanesa",
  description:
    "Este grupo trata sobre la verdad de la milanesa Este grupo trata sobre la verdad de la milanesa Este grupo trata sobre la verdad de la milanesa Este grupo trata sobre la verdad de la milanesa Este grupo trata sobre la verdad de la milanesa.",
  photoUrl: defaultPhotoUrl,
  genres: ["Rock", "Pop", "Jazz"],
  creator: userData1,
  members: [
    userData2,
    userData3,
    userData4,
    userData34,
    userData34,
    userData34,
  ],
};

interface Discussion {
  id: number;
  title: string;
  authorName: string;
  content: string;
}

const discussions: Discussion[] = [
  {
    id: 1,
    title: "The Future of Technology",
    authorName: "Alice Johnson",
    content:
      "Technology is evolving at a rapid pace, but where will it take us in the next decade?",
  },
  {
    id: 2,
    title: "Climate Change and Its Impact",
    authorName: "Bob Smith",
    content:
      "The effects of climate change are becoming more evident. How can we work together to mitigate its impacts?",
  },
  {
    id: 3,
    title: "Best Practices in Software Development",
    authorName: "Carol Lee",
    content:
      "What are some modern best practices in software development that every developer should know?",
  },
  {
    id: 4,
    title: "The Art of Storytelling",
    authorName: "David Brown",
    content:
      "Storytelling has been a fundamental way of sharing knowledge and culture. What makes a story truly captivating?",
  },
  {
    id: 5,
    title: "Traveling on a Budget",
    authorName: "Emma Davis",
    content:
      "Exploring the world doesn't have to break the bank. What are your tips for budget-friendly travel?",
  },
];
interface GroupDetails {
  name: string;
  description: string;
  photoUrl: string;
  genres: string[];
  creator: UserData; // Group creator
  members: UserData[]; // List of group members
}

interface UserData {
  id: number;
  profilePhotoUrl: string;
  realName: string;
  username: string;
}

export const Group = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  //const location = useLocation();
  //const groupId = location.state?.query || "";

  return (
    <Container>
      <LeftSection>
        <GroupProfile>
          <GroupInfoContainer>
            <GroupImage src={groupDetails.photoUrl} />
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
            <Typography>{groupDetails.description}</Typography>
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
              {groupDetails.genres.map((genres, index) => (
                <GenderTag key={index}>{genres}</GenderTag>
              ))}
            </FavoriteGenders>
          </GroupDescription>
          <Divider />
        </GroupProfile>
        <Divider style={{ marginTop: "20px" }}></Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Subtitle>Discusiones</Subtitle>
          <CreateButton>Crear discusión</CreateButton>
        </div>

        <DiscussionsContainer>
          {discussions.map((discussion, index) => (
            <DiscussionContainer
              key={index}
              onClick={() => {
                navigate("/discussion", { state: { query: discussion.id } });
              }}
            >
              <InfoContainer>
                <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {discussion.title}
                </Typography>
                <Typography style={{ fontSize: "14px" }}>
                  {discussion.content.length > 100
                    ? discussion.content.substring(0, 97) + "..."
                    : discussion.content}
                </Typography>
                <Typography style={{ fontSize: "14px", color: "gray" }}>
                  Iniciada por: {discussion.authorName}
                </Typography>
              </InfoContainer>
            </DiscussionContainer>
          ))}
        </DiscussionsContainer>
      </LeftSection>
      <RightSection>
        <Title>Creador:</Title>
        <CardContainer>
          <ProfilePicture src={userData1.profilePhotoUrl} />
          <InfoContainer>
            <Name>{userData1.realName}</Name>
            <Username>@{userData1.username}</Username>
          </InfoContainer>
        </CardContainer>
        <Title>Miembros:</Title>
        {groupDetails.members.length === 0 ? (
          <p>This group has no members</p>
        ) : (
          groupDetails.members.map((member, index) => (
            <CardContainer key={index}>
              <ProfilePicture src={member.profilePhotoUrl} />
              <InfoContainer>
                <Name>{member.realName}</Name>
                <Username>@{member.username}</Username>
              </InfoContainer>
            </CardContainer>
          ))
        )}
      </RightSection>
    </Container>
  );
};

export default Group;

{
  /* Adapatar a dialogo de crear topico <Dialog open={showCreateGroupModal} onClose={handleClose}>
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
      </Dialog> */
}
