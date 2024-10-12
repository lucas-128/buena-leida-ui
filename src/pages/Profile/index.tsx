import { LogoutButton, ProfileContainer } from "./styled";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ProfileContainer>
      <p>Perfil</p>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
    </ProfileContainer>
  );
};
