import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalState } from "../../context/GlobalStateContext";
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
import axios from "axios";

// TODO: Los nombres de los campos tienen que ser los mismos que devuelve el back

interface FriendData {
  id: number;
  name: string;
  username: string;
  profileImage: string;
  bio: string;
}

export const Friends: React.FC = () => {
  const { state } = useGlobalState();
  // Esto inicialmente es un array vacio.
  // usar useEffect para fetchear los amigos del usuario
  const [friends, setFriends] = React.useState<FriendData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`https://buena-leida-back-kamk.onrender.com/friends/${state.id}`); // Example API call, use actual user ID
        const friendsData = response.data.map((friend: any) => ({
          id: friend.friendId, // Assuming `friendId` in the response
          name: friend.name,
          username: friend.username,
          profileImage: friend.profileImage,
          bio: friend.bio,
        }));
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [state.id]);

  // Delete friend functionality
  const handleDeleteFriend = async (friendId: number) => {
    try {
      await axios.delete(`https://buena-leida-back-kamk.onrender.com/delete/${friendId}`);
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
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
                <DeleteButton onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating to the friend's profile
                  handleDeleteFriend(friend.id); // Delete the friend
                }}>
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
