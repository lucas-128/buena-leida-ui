import { useLocation } from "react-router-dom";
import { Feed, Container } from "./styled";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const Discussion = () => {
  const location = useLocation();
  const discussionId = location.state?.query || "";
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Feed>Discussion {discussionId}</Feed>
      <Button onClick={handleGoBack}>Go Back</Button>
    </Container>
  );
};

export default Discussion;
