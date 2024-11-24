import React from "react";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Bio,
  DeleteButton,
  FriendCard,
  FriendInfo,
  Name,
  ProfilePicture,
  Username,
} from "./styled";
import {
  Container,
  NotificationsContainer,
  Title,
} from "../Notifications/styled";
import { useNavigate } from "react-router-dom";

// TODO: Los nombres de los campos tienen que ser los mismos que devuelve el back

interface FriendData {
  id: number;
  name: string;
  username: string;
  profileImage: string;
  bio: string;
}

// TODO: reemplazar esto por un useState... lo mismo que para las notificaciones.
const dummyFriends: FriendData[] = [
  {
    id: 1,
    name: "John Doe",
    username: "@johndoe",
    profileImage: "https://via.placeholder.com/50",
    bio: "Lover of technology and coffee.",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "@janesmith",
    profileImage: "https://via.placeholder.com/50",
    bio: "Exploring the world one step at a time.",
  },
];

export const Friends: React.FC = () => {
  // Esto inicialmente es un array vacio.
  // usar useEffect para fetchear los amigos del usuario
  const [friends, _] = React.useState<FriendData[]>(dummyFriends);
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Amigos</Title>
      <NotificationsContainer>
        {friends.length > 0 ? (
          <div>
            {friends.map((friend) => (
              <FriendCard
                onClick={() =>
                  navigate("/otherprofile", { state: { query: friend.id } })
                }
                key={friend.id}
              >
                <ProfilePicture
                  src={friend.profileImage}
                  alt={`${friend.name}'s profile`}
                />
                <FriendInfo>
                  <Name>{friend.name}</Name>
                  <Username>{friend.username}</Username>
                  <Bio>
                    {friend.bio.length > 75
                      ? `${friend.bio.slice(0, 72)}...`
                      : friend.bio}
                  </Bio>
                </FriendInfo>
                <DeleteButton>
                  {/* Popup confirmar eliminar amigo. Dialog */}
                  <DeleteIcon />
                </DeleteButton>
              </FriendCard>
            ))}
          </div>
        ) : (
          <Typography sx={{ fontSize: "16px" }}>
            No tienes amigos agregados en este momento.
          </Typography>
        )}
      </NotificationsContainer>
    </Container>
  );
};

export default Friends;
