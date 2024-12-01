import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  CardContainer,
  NotificationsContainer,
} from "./styled";
import { NotificationCard } from "./NotificationsCard";
import { Typography } from "@mui/material";
import { useGlobalState } from "../../context/GlobalStateContext";
import axios from "axios";
import { Spinner } from "../SearchBar/styled";

interface Notification {
  requestid: number;
  createdAt: string;
  sender: {
    id: number;
    name: string;
    username: string;
    profilePhoto: string;
  };
}

const API_URL = "https://buena-leida-back-kamk.onrender.com";

export const Notifications: React.FC = () => {
  const { state } = useGlobalState();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/friend-requests/${state.id}`
        );
        setNotifications(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }

      setIsLoading(false);
    };

    fetchNotifications();
  }, [state.id]);

  const handleAccept = async (id: number) => {
    try {
      await axios.post(`${API_URL}/friend-requests/${id}/accept`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.requestid !== id
        )
      );
    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };

  // Función para rechazar la notificación
  const handleReject = async (id: number) => {
    console.log("reekctomg notification with id:", id);

    console.log(`${API_URL}/friend-requests/${id}/delete`);

    try {
      await axios.post(`${API_URL}/friend-requests/${id}/delete`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.requestid !== id
        )
      );
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          setNotifications((prevNotifications) =>
            prevNotifications.filter(
              (notification) => notification.requestid !== id
            )
          );
        } else {
          console.error(
            "Error rejecting notification:",
            error.response.status,
            error.response.data
          );
        }
      } else {
        // Handle cases where no response is received (e.g., network issues)
        console.error(
          "Error rejecting notification (no response):",
          error.message
        );
      }
    }
  };

  return (
    <Container>
      <Title>Notificaciones</Title>
      <NotificationsContainer>
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <>
            {notifications.length > 0 ? (
              <CardContainer>
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification.requestid}
                    name={notification.sender.name}
                    username={notification.sender.username}
                    profileImage={notification.sender.profilePhoto}
                    onAccept={() => handleAccept(notification.requestid)}
                    onReject={() => handleReject(notification.requestid)}
                  />
                ))}
              </CardContainer>
            ) : (
              <Typography sx={{ fontSize: "16px" }}>
                No tienes notificaciones en este momento.
              </Typography>
            )}
          </>
        )}
      </NotificationsContainer>
    </Container>
  );
};

export default Notifications;
