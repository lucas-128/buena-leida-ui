import { useLocation } from "react-router-dom";
import { Feed, Container } from "./styled";

export const Book = () => {
  const location = useLocation();
  const bookId = location.state?.query || "";

  return (
    <Container>
      <Feed>Detalle libro</Feed>
      <p>BookID: {bookId}</p>
    </Container>
  );
};

export default Book;
