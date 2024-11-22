import React from "react";
import {
  Card,
  UserInfo,
  ProfileImage,
  UserDetails,
  Name,
  Username,
  ButtonGroup,
  Button,
} from "./styled";

interface NotificationCardProps {
  name: string;
  username: string;
  profileImage: string;
  onAccept: () => void;
  onReject: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  name,
  username,
  profileImage,
  onAccept,
  onReject,
}) => {
  return (
    <Card>
      <UserInfo>
        <ProfileImage src={profileImage} alt={`${name}'s profile`} />
        <UserDetails>
          <Name>{name}</Name>
          <Username>@{username}</Username>
        </UserDetails>
      </UserInfo>
      <ButtonGroup>
        <Button variant="accept" onClick={onAccept}>
          Aceptar
        </Button>
        <Button variant="reject" onClick={onReject}>
          Rechazar
        </Button>
      </ButtonGroup>
    </Card>
  );
};
