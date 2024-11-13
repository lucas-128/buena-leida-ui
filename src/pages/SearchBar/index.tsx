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
  UserImage,
} from "./styled";
import axios from "axios";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

interface Book {
  id: number;
  title: string;
  author: string;
  averagerating: number;
  numberreviews: number;
  summary: string;
  genre: string;
  publication_date: string;
  coverimage: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  profilePhoto: string;
  bio: string;
}

const SYNOPSIS_MAX_LENGTH = 80;

const API_URL = "http://localhost:3000";

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<Book[]>([]);

  const [usersData, setUsersData] = useState<User[]>([]);

  const initialQuery = location.state?.query || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState("title");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (initialQuery) {
        setIsLoading(true);
        setSearchType("title");
        setQuery(initialQuery);

        let endpoint;
        switch (searchType) {
          case "todo":
            endpoint = `${API_URL}/books/${query}/${query}`;
            break;
          case "author":
            endpoint = `${API_URL}/books/author/${query}`;
            break;
          case "title":
            endpoint = `${API_URL}/books/title/${query}`;
            break;
          case "genre":
            endpoint = `http://localhost:3000/books?genre=${query}`;
            break;
          default:
            endpoint = "";
        }

        try {
          const response = await axios.get(endpoint);
          setData(response.data);
        } catch (err) {
          if ((err as any).response && (err as any).response.status === 404) {
            setData([]);
          } else {
            //console.error(err);
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [initialQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (searchType === "user") {
      try {
        const endpoint = `${API_URL}/users/search-users/${query}`;
        const response = await axios.get(endpoint);
        setUsersData(response.data);
      } catch (error) {
        setUsersData([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const sortRankings = rankingMode === "rankings" ? "?sort=rankings" : "";

        let endpoint;
        switch (searchType) {
          case "todo":
            endpoint = `${API_URL}/books/${query}/${query}${sortRankings}`;
            break;
          case "author":
            endpoint = `${API_URL}/books/author/${query}${sortRankings}`;
            break;
          case "title":
            endpoint = `${API_URL}/books/title/${query}${sortRankings}`;
            break;
          case "genre":
            endpoint = `${API_URL}/books/genre/${query}${sortRankings}`;
            break;
          default:
            endpoint = "";
        }

        const response = await axios.get(endpoint);
        setData(response.data);
      } catch (error) {
        //console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBookClick = (bookId: number) => {
    console.log("Book clicked:", bookId);
    navigate("/book", { state: { query: bookId } });
  };

  const handleUserClick = (userId: number) => {
    console.log("User clicked:", userId);
    navigate("/otherprofile", { state: { query: userId } });
  };

  const [rankingMode, setRankingMode] = useState("Default");

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

  const [showSortMenu, setShowSortMenu] = useState(true);

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
      <RadioGroup style={{ marginTop: "40px", gap: "30px" }}>
        {/* <RadioLabel>
          <input
            type="radio"
            value="todo"
            checked={searchType === "todo"}
            onChange={() => {
              setSearchType("todo");
              setShowSortMenu(true);
            }}
          />
          Todo
        </RadioLabel> */}
        <RadioLabel>
          <input
            type="radio"
            value="title"
            checked={searchType === "title"}
            onChange={() => {
              setSearchType("title");
              setShowSortMenu(true);
            }}
          />
          Título
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            value="author"
            checked={searchType === "author"}
            onChange={() => {
              setSearchType("author");
              setShowSortMenu(true);
            }}
          />
          Autor
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            value="genre"
            checked={searchType === "genre"}
            onChange={() => {
              setSearchType("genre");
              setShowSortMenu(true);
            }}
          />
          Género
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            value="user"
            checked={searchType === "user"}
            onChange={() => {
              setSearchType("user");
              setShowSortMenu(false);
              setRankingMode("Default");
            }}
          />
          Usuario
        </RadioLabel>
      </RadioGroup>
      {showSortMenu && (
        <FormControl
          variant="standard"
          sx={{ minWidth: 120, marginBottom: "5px", marginTop: "5px" }}
        >
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Ordenar
          </InputLabel>
          <NativeSelect
            value={rankingMode}
            onChange={(event) => setRankingMode(event.target.value)}
          >
            <option value={"rankings"}>Ranking</option>
            <option value={"Default"}>Default</option>
          </NativeSelect>
        </FormControl>
      )}
      <ResultsContainer>
        {isLoading ? (
          <Spinner />
        ) : showSortMenu ? (
          data.length === 0 ? (
            <p>No se encontraron libros para los parámetros especificados</p>
          ) : (
            data.map((book) => (
              <ResultCard key={book.id}>
                <BookImage
                  src={book.coverimage}
                  alt={book.title}
                  onClick={() => handleBookClick(book.id)}
                />
                <BookInfo>
                  <BookTitle onClick={() => handleBookClick(book.id)}>
                    {book.title}
                  </BookTitle>
                  <BookAuthor>{book.author}</BookAuthor>
                  <RatingContainer>
                    <StarRating>{renderStars(book.averagerating)}</StarRating>
                    <span>{book.averagerating.toFixed(1)}</span>
                    <span>
                      ({book.numberreviews}{" "}
                      {book.numberreviews === 1
                        ? "calificación"
                        : "calificaciones"}
                      )
                    </span>
                  </RatingContainer>
                  <Synopsis>
                    {book.summary.length > SYNOPSIS_MAX_LENGTH
                      ? `${book.summary.slice(0, SYNOPSIS_MAX_LENGTH - 3)}...`
                      : book.summary}
                  </Synopsis>
                  <GenreList>Genero: {book.genre}</GenreList>
                  <PublicationDate>
                    Publicado:{" "}
                    {new Date(book.publication_date).toLocaleDateString(
                      "es-ES",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </PublicationDate>
                </BookInfo>
              </ResultCard>
            ))
          )
        ) : usersData.length === 0 ? (
          <p>No se encontraron usuarios.</p>
        ) : (
          usersData.map((user) => (
            <ResultCard key={user.id}>
              <UserImage
                onClick={() => handleUserClick(user.id)}
                src={user.profilePhoto}
                alt={user.name}
              />
              <BookInfo>
                <BookTitle onClick={() => handleUserClick(user.id)}>
                  {user.name}
                </BookTitle>
                <BookAuthor>@{user.username}</BookAuthor>
                <p>
                  {user.bio.length > 50
                    ? `${user.bio.slice(0, 47)}...`
                    : user.bio}
                </p>
              </BookInfo>
            </ResultCard>
          ))
        )}
      </ResultsContainer>
    </Container>
  );
};

export default SearchBar;
