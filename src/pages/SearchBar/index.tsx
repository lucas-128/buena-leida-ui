import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import {
  Container,
  Title,
  SearchForm,
  SearchInput,
  SearchButton,
  RadioGroup,
  RadioLabel,
  ResultsContainer,
  ResultCard,
  BookImage,
  BookInfo,
  BookTitle,
  BookAuthor,
  RatingContainer,
  StarRating,
  Synopsis,
  GenreList,
  PublicationDate,
  Spinner,
} from "./styled";
import { defaultPhotoUrl } from "../Profile";

interface Book {
  id: number;
  title: string;
  authors: string[];
  rating: number;
  reviewCount: number;
  synopsis: string;
  genres: string[];
  publicationDate: string;
  imageUrl: string;
}

const SYNOPSIS_MAX_LENGTH = 80;

// libros de test
const mockBooks: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    authors: ["F. Scott Fitzgerald"],
    rating: 3.9,
    reviewCount: 3872,
    synopsis: "A story of decadence and excess in Jazz Age America .",
    genres: ["Classic", "Fiction"],
    publicationDate: "April 10, 1925",
    imageUrl: defaultPhotoUrl,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    authors: ["Harper Lee"],
    rating: 4.7,
    reviewCount: 5291,
    synopsis:
      "A novel of warmth and humor despite dealing with serious issues of rape and racial inequality.",
    genres: ["Classic", "Fiction"],
    publicationDate: "July 11, 1960",
    imageUrl: defaultPhotoUrl,
  },
];

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuery = location.state?.query || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState("todo");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (initialQuery) {
        setIsLoading(true);
        console.log("busqueda nueva.");
        setSearchType("todo");
        setQuery(initialQuery);

        // sleep to mock api call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
    console.log("Search type:", searchType);
    // Here you would typically call your search API
  };

  const handleBookClick = (bookId: number) => {
    navigate("/book", { state: { query: bookId } });
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < Math.floor(rating) ? "#FFD700" : "none"}
          stroke={i < Math.floor(rating) ? "#FFD700" : "#000000"}
        />
      ));
  };

  return (
    <Container>
      <Title>Buscar</Title>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <SearchButton type="submit">Buscar</SearchButton>
      </SearchForm>
      <RadioGroup>
        <RadioLabel>
          <input
            type="radio"
            value="todo"
            checked={searchType === "todo"}
            onChange={() => setSearchType("todo")}
          />
          Todo
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            value="titulo"
            checked={searchType === "titulo"}
            onChange={() => setSearchType("titulo")}
          />
          Título
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            value="autor"
            checked={searchType === "autor"}
            onChange={() => setSearchType("autor")}
          />
          Autor
        </RadioLabel>
      </RadioGroup>
      <ResultsContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          mockBooks.map((book) => (
            <ResultCard key={book.id}>
              <BookImage
                src={book.imageUrl}
                alt={book.title}
                onClick={() => handleBookClick(book.id)}
              />
              <BookInfo>
                <BookTitle onClick={() => handleBookClick(book.id)}>
                  {book.title}
                </BookTitle>
                <BookAuthor>
                  {book.authors.join(book.authors.length > 1 ? ", " : "")}
                </BookAuthor>

                <RatingContainer>
                  <StarRating>{renderStars(book.rating)}</StarRating>
                  <span>{book.rating.toFixed(1)}</span>
                  <span>({book.reviewCount} reseñas)</span>
                </RatingContainer>
                <Synopsis>
                  {book.synopsis.length > SYNOPSIS_MAX_LENGTH
                    ? `${book.synopsis.slice(0, SYNOPSIS_MAX_LENGTH - 3)}...`
                    : book.synopsis}
                </Synopsis>
                <GenreList>Generos: {book.genres.join(", ")}</GenreList>
                <PublicationDate>
                  Publicado en: {book.publicationDate}
                </PublicationDate>
              </BookInfo>
            </ResultCard>
          ))
        )}
      </ResultsContainer>
    </Container>
  );
};

export default SearchBar;
