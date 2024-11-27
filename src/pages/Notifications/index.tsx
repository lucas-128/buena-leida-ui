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

// TODO: Los nombres de los campos tienen que ser los mismos que devuelve el back
interface Notification {
  id: number;
  name: string;
  username: string;
  profileImage: string;
}

const API_URL = "https://buena-leida-back-kamk.onrender.com";

export const Notifications: React.FC = () => {
  const { state } = useGlobalState();
  const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
      const fetchNotifications = async () => {
          try {
            const response = await axios.get(`${API_URL}/friend-requests/${state.id}`); // Reemplaza con tu endpoint real
            setNotifications(response.data); // Asume que el backend devuelve una lista de notificaciones
          } catch (error) {
            console.error("Error fetching notifications:", error);
          }
      };
  
      fetchNotifications();
    }, [state.id]);
  
    // Función para aceptar la notificación
    const handleAccept = async (id: number) => {
      try {
        // Realizamos un POST para aceptar la notificación
        await axios.post(`${API_URL}/friend-requests/${id}}/accept`);
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      } catch (error) {
        console.error("Error accepting notification:", error);
      }
    };
  
    // Función para rechazar la notificación
    const handleReject = async (id: number) => {
      try {
        // Realizamos un POST para rechazar la notificación
        await axios.post(`${API_URL}/friend-requests/${id}}`);
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      } catch (error) {
        console.error("Error rejecting notification:", error);
      }
    };

  return (
    <Container>
      <Title>Notificaciones</Title>
      <NotificationsContainer>
        {notifications.length > 0 ? (
          <CardContainer>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                name={notification.name}
                username={notification.username}
                profileImage={notification.profileImage}
                onAccept={() => handleAccept(notification.id)}
                onReject={() => handleReject(notification.id)}
              />
            ))}
          </CardContainer>
        ) : (
          <Typography sx={{ fontSize: "16px" }}>
            No tienes notificaciones en este momento.
          </Typography>
        )}
      </NotificationsContainer>
    </Container>
  );
};

export default Notifications;
