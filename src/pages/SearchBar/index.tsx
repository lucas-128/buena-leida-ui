import { Feed, Container } from "./styled";
import { useLocation } from "react-router-dom";

export const SearchBar = () => {
  const location = useLocation();
  const query = location.state?.query || "No search query";

  return (
    <Container>
      <Feed>Buscado...</Feed>
      <p>received text: {query}</p>
    </Container>
  );
};

export default SearchBar;
