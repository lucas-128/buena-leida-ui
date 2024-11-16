import { useLocation } from "react-router-dom";
import { Feed, Container } from "./styled";

export const Group = () => {
  const location = useLocation();
  const groupId = location.state?.query || "";

  return (
    <Container>
      <Feed>Group Search {groupId}</Feed>
    </Container>
  );
};

export default Group;
