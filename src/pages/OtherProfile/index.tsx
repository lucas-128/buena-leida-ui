import { useLocation } from "react-router-dom";
import { Feed, Container } from "./styled";

export const OtherProfile = () => {
  const location = useLocation();
  const userId = location.state?.query || "";
  return (
    <Container>
      <Feed>{userId}</Feed>
    </Container>
  );
};

export default OtherProfile;
