import styled from "styled-components";
import { IconButton } from "@mui/material";

export const FriendCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
`;

export const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const FriendInfo = styled.div`
  flex-grow: 1;
`;

export const Name = styled.div`
  font-weight: bold;
`;

export const Username = styled.div`
  font-size: 14px;
  color: #666;
`;

export const Bio = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: #444;
`;

export const DeleteButton = styled(IconButton)`
  margin-left: auto;
`;
