import React, { useEffect } from "react";
import { Typography } from "@mui/material";

//import DeleteIcon from '@mui/icons-material/Delete';
import { useGlobalState } from "../../context/GlobalStateContext";
import {
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
import axios from "axios";

interface FriendData {
  friendship: number; 
  friend: {
    id: number;
    username: string;
    name: string;
    profilePhoto: string;
  };
}

const API_URL = "https://buena-leida-back-kamk.onrender.com";

export const Friends: React.FC = () => {
  const { state } = useGlobalState();

  const [friends, setFriends] = React.useState<FriendData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/friendships/all/${state.id}`
        );

        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [state.id]);

  // Delete friend functionality
  const handleDeleteFriend = async (friendId: number) => {
    try {
      await axios.delete(
        `https://buena-leida-back-kamk.onrender.com/friendships/${state.id}/${friendId}/delete`, 
      );
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.friend.id !== friendId)
      );
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  return (
    <Container>
      <Title>Amigos</Title>
      <NotificationsContainer>
        {friends.length > 0 ? (
          <div>
            {friends.map((friend) => (
              <FriendCard
                onClick={() =>
                  navigate("/otherprofile", {
                    state: { query: friend.friend.id },
                  })
                }
                key={friend.friendship}
              >
                <ProfilePicture
                  src={friend.friend.profilePhoto}
                  alt={`${friend.friend.name}'s profile`}
                />
                <FriendInfo>
                  <Name>{friend.friend.name}</Name>
                  <Username>{friend.friend.username}</Username>
                </FriendInfo>
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigating to the friend's profile
                    handleDeleteFriend(friend.friend.id); // Delete the friend
                  }}
                ></DeleteButton>

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
