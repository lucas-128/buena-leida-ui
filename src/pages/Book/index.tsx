import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Star, ThumbsUp } from "lucide-react";
import {
  Container,
  LeftColumn,
  BookImage,
  RatingContainer,
  StarContainer,
  MainContent,
  BookCard,
  Title,
  Author,
  Synopsis,
  GenreList,
  PublicationDate,
  Section,
  SectionTitle,
  Button,
  ReviewInput,
  RatingBreakdown,
  RatingRow,
  ReviewCard,
  ReviewerInfo,
  ProfilePicture,
  ReviewContent,
  LikeButton,
  RatingBar,
  RatingCount,
  ColumnButton,
} from "./styled";
import { defaultPhotoUrl } from "../Profile";
import axios from "axios";
import { useGlobalState } from "../../context/GlobalStateContext";

export const DEFAULT_COVER_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/books%2Fportada_default.png?alt=media&token=cbf8f597-a3bd-469d-b390-7719ec843a8d";

const initialBook: BookDetails = {
  id: "1",
  title: "",
  author: "",
  coverimage: DEFAULT_COVER_IMAGE,
  averagerating: 0,
  numberreviews: 0,
  summary: "",
  genre: "",
  publication_date: "",
  oneStarCount: 0,
  twoStarCount: 0,
  threeStarCount: 0,
  fourStarCount: 0,
  fiveStarCount: 0,
};

const API_URL = "http://localhost:3000";

interface UserData {
  username: string;
  profilePhoto: string;
}

interface MyReview {
  id: string; // review id
  iduser: string; // user id
  isbn: string; // book id
  texto: string; // review text
  likes: number; // number of likes in my review
  calification: number; // star rating of my review
}

interface BookDetails {
  id: string;
  title: string;
  author: string;
  coverimage: string;
  averagerating: number;
  numberreviews: number;
  genre: string;
  summary: string;
  publication_date: string;
  oneStarCount: number;
  twoStarCount: number;
  threeStarCount: number;
  fourStarCount: number;
  fiveStarCount: number;
}
interface Review {
  id: string;
  iduser: number;
  user: UserData; // user data
  calification: number;
  texto: string;
  likes: number;
  liked: boolean;
}

export const Book: React.FC = () => {
  // bookID for details
  const location = useLocation();
  const bookId = location.state?.query || "";

  const [book, setBook] = useState<BookDetails>(initialBook);
  const [myReview, setMyReview] = useState<MyReview | null>(null);

  const { state } = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      if (bookId) {
        try {
          const response = await axios.get(
            `${API_URL}/reviews/${bookId}/myreview?iduser=${state.id}`
          );

          setMyReview(response.data[0]);
          setUserRating(response.data[0].calification);
          setUserReview(response.data[0].texto);
        } catch (err) {
        } finally {
        }
      }
    };

    fetchData();
  }, [bookId]);

  // My rating
  const [userRating, setUserRating] = useState<number | null>(
    myReview && myReview.calification ? myReview.calification : null
  );

  // My review
  const [userReview, setUserReview] = useState<string | null>(
    myReview && myReview.texto ? myReview.texto : null
  );

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (bookId) {
        // Todas las reviews del libro
        try {
          const response = await axios.get(
            `${API_URL}/reviews/${bookId}?iduser=${state.id}`
          );
          setReviews(response.data);
          console.log("Reviews:", response.data);
        } catch (err) {
        } finally {
        }
      }
    };

    fetchData();
  }, [bookId]);

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");

  const handleRating = async (rating: number) => {
    setUserRating(rating);
    console.log(`User rated the book: ${rating} stars`);

    const requestBody = {
      isbn: bookId,
      calification: rating,
      iduser: state.id,
    };

    try {
      const response = await axios.post(`${API_URL}/reviews/rate`, requestBody);
      console.log("Rating submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleWriteReview = () => {
    setIsWritingReview(true);
  };

  const handleCancelReview = () => {
    setIsWritingReview(false);
    setNewReviewText("");
  };

  const handleSubmitReview = async () => {
    // Check if userRating is null
    if (userRating === null) {
      alert("Tienes que calificar el libro primero.");
      return;
    }

    // Check the length of the review text
    if (newReviewText.length === 0) {
      alert("El texto de la reseña no puede estar vacío.");
      return;
    }
    if (newReviewText.length > 400) {
      alert("El texto de la reseña no puede exceder los 400 caracteres.");
      return;
    }

    const reviewData = {
      isbn: bookId,
      texto: newReviewText,
      iduser: state.id,
      calification: userRating,
    };

    console.log(reviewData);

    try {
      await axios.post(`${API_URL}/reviews/review`, reviewData);

      setUserReview(newReviewText);
      setIsWritingReview(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleDeleteReview = async () => {
    const iduser = state.id;
    console.log(`${API_URL}/reviews/${bookId}/${iduser}`);

    try {
      const response = await axios.delete(
        `http://localhost:3000/reviews/${bookId}/${iduser}`
      );

      if (response.status === 204) {
        setUserReview(null);
        setUserRating(null);
        console.log("User deleted their review and rating");
      } else {
        alert("There was an error deleting your review. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("There was an error deleting your review. Please try again.");
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={24}
          fill={i < Math.floor(rating) ? "#FFD700" : "none"}
          stroke={i < Math.floor(rating) ? "#FFD700" : "#000000"}
          onClick={interactive ? () => handleRating(i + 1) : undefined}
          style={interactive ? { cursor: "pointer" } : undefined}
        />
      ));
  };

  const renderRatingBreakdown = (book: BookDetails) => {
    const totalReviews = book.numberreviews;

    // Calculate counts from the book details
    const counts = [
      { stars: 5, count: book.fiveStarCount },
      { stars: 4, count: book.fourStarCount },
      { stars: 3, count: book.threeStarCount },
      { stars: 2, count: book.twoStarCount },
      { stars: 1, count: book.oneStarCount },
    ];

    return counts.map(({ stars, count }) => {
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return (
        <RatingRow key={stars}>
          <span>{stars} estrellas:</span>
          <RatingBar percentage={percentage} />
          <RatingCount>
            {count} ({percentage.toFixed(1)}%)
          </RatingCount>
        </RatingRow>
      );
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (bookId) {
        try {
          const response = await axios.get(`${API_URL}/books/${bookId}`);
          setBook(response.data);
        } catch (err) {
        } finally {
        }
      }
    };

    fetchData();
  }, [bookId]);

  const handleLikeReview = async (reviewId: string) => {
    try {
      const userId = state.id;
      const reviewToUpdate = reviews.find((review) => review.id === reviewId);
      if (!reviewToUpdate) return;

      // Determine the new liked state before making the API call
      const newLikedState = !reviewToUpdate.liked;

      const response = await axios.post(
        `${API_URL}/reviews/${reviewId}/${userId}/like`
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) => {
            if (review.id === reviewId) {
              console.log(
                `User ${newLikedState ? "liked" : "unliked"} review ${reviewId}`
              );
              return {
                ...review,
                likes: newLikedState ? review.likes + 1 : review.likes - 1,
                liked: newLikedState, // Update the liked state
              };
            }
            return review;
          })
        );
      }
    } catch (error) {
      console.error("Error liking the review:", error);
    }
  };

  return (
    <Container>
      <LeftColumn>
        <BookImage src={book.coverimage} alt={book.title} />
        {/*Muestra el estado actual de lectura (fetch de api) 
        Si no hay estado actual --> muestra algo que indica "Estado lectura" y un lapiz
        On click -> spawn modal donde puede borrar estado o cambiar o elegir*/}
        <ColumnButton>Estado de Lectura</ColumnButton>

        {/*Muestra "Agregar a bibloteca" y un lapiz
        Si se cliquea, se abre el modal que muestra la checkbox (las bibliotecas actuales ya marcadas)
        Si el usuario no tiene bibliotecas, se muestra mensaje "Crea tus bibliotecas aqui" y lleva a pagina*/}
        <ColumnButton>Agregar a Biblioteca</ColumnButton>

        <RatingContainer>
          <StarContainer>{renderStars(userRating || 0, true)}</StarContainer>
          <span>{userRating ? "Tu calificación" : "Califica este libro"}</span>
        </RatingContainer>
      </LeftColumn>
      <MainContent>
        <BookCard>
          <Title>{book.title}</Title>
          <Author>{book.author}</Author>
          <StarContainer>
            {renderStars(book.averagerating)}
            <span>
              {book.averagerating.toFixed(1)} ({book.numberreviews}{" "}
              calificaciones)
            </span>
          </StarContainer>
          <Synopsis>{book.summary}</Synopsis>
          <GenreList>Género: {book.genre}</GenreList>
          <PublicationDate>
            Publicado:{" "}
            {new Date(book.publication_date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </PublicationDate>
        </BookCard>

        <Section>
          <SectionTitle>Mi Reseña</SectionTitle>
          {userReview ? (
            <ReviewCard>
              <ReviewContent>
                <StarContainer>{renderStars(userRating || 0)}</StarContainer>
                <p>{userReview}</p>
                <Button onClick={handleDeleteReview}>Eliminar reseña</Button>
              </ReviewContent>
            </ReviewCard>
          ) : isWritingReview ? (
            <div>
              <ReviewInput
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Escribe tu reseña aquí..."
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <Button onClick={handleSubmitReview}>Enviar</Button>
                <Button onClick={handleCancelReview}>Cancelar</Button>
              </div>
            </div>
          ) : (
            <Button onClick={handleWriteReview}>Escribe una reseña</Button>
          )}
        </Section>

        <Section>
          <SectionTitle>Reseñas de la comunidad</SectionTitle>
          <StarContainer>
            {renderStars(book.averagerating)}
            <span>{book.averagerating.toFixed(1)} promedio</span>
          </StarContainer>
          <RatingBreakdown>{renderRatingBreakdown(book)}</RatingBreakdown>
          {reviews.length === 0 ||
          reviews.every(
            (review) => review.iduser === state.id || !review.texto
          ) ? (
            <p>Aún no hay reseñas de la comunidad para esta publicación</p>
          ) : (
            reviews.map((review) => {
              if (review.iduser === state.id || !review.texto) {
                return null;
              }

              return (
                <ReviewCard key={review.id}>
                  <ReviewerInfo>
                    <ProfilePicture
                      src={review.user.profilePhoto}
                      alt={defaultPhotoUrl}
                    />
                    <span>{review.user.username}</span>
                  </ReviewerInfo>
                  <ReviewContent>
                    <StarContainer>
                      {renderStars(review.calification)}
                    </StarContainer>
                    <p>{review.texto}</p>
                    <LikeButton
                      onClick={() => handleLikeReview(review.id)}
                      liked={review.liked}
                    >
                      <ThumbsUp size={16} />
                      {review.liked ? "Te gustó" : "Me gusta"} • {review.likes}
                    </LikeButton>
                  </ReviewContent>
                </ReviewCard>
              );
            })
          )}
        </Section>
      </MainContent>
    </Container>
  );
};

export default Book;
