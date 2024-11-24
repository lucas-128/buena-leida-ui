import React from "react";
import {
  Container,
  Title,
  CardContainer,
  NotificationsContainer,
} from "./styled";
import { NotificationCard } from "./NotificationsCard";
import { Typography } from "@mui/material";

// TODO: Los nombres de los campos tienen que ser los mismos que devuelve el back
interface Notification {
  id: number;
  name: string;
  username: string;
  profileImage: string;
}

// TODO: reemplazar esto por un useState que almacena las notificaciones
// y usar UseEffect para fetchear las notificaciones.
const dummyNotifications: Notification[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Bob Johnson",
    username: "bobjohnson",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(dummyNotifications);

  // TODO: Funciones para aceptar y rechazar notificaciones
  // Seguro hay que hacer un post al back y borrar la notificacion de la lista.
  const handleAccept = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // TODO: Funciones para aceptar y rechazar notificaciones
  // Seguro hay que hacer un post al back y borrar la notificacion de la lista.
  const handleReject = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
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
