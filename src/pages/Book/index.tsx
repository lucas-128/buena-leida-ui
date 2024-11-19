import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useSnackbar } from "notistack";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

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
  user: UserData;
  calification: number;
  texto: string;
  likes: number;
  liked: boolean;
}

export const Book: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Dialog borrar resena
  const [openDeleteReviewDialog, setOpenDeleteReviewDialog] = useState(false);

  // Dialog estado lectura
  const [openReadingStatusDialog, setOpenReadingStatusDialog] = useState(false);
  const handleClose = () => {
    setOpenReadingStatusDialog(false);
    setopenAddToShelfDialog(false);
    setOpenDeleteReviewDialog(false);
  };

  const handleUpdateStatusButton = () => {
    setOpenReadingStatusDialog(true);
  };

  const handleDeleteStatus = () => {
    axios
      .delete(`${API_URL}/readingstate/remove`, {
        data: {
          bookId: bookId,
          userId: state.id,
        },
      })
      .then((response) => {
        console.log("Status Code:", response.status);
        console.log("Response Data:", response.data);

        setReadingStatus("Estado de lectura");
        enqueueSnackbar("Estado de lectura eliminado.", {
          variant: "success",
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error Status Code:", error.response.status);
          console.log("Error Response Data:", error.response.data);
        } else {
          console.error("Error deleting reading status:", error);
        }
        enqueueSnackbar("Este libro no tiene estado de lectura.", {
          variant: "warning",
        });
      })
      .finally(() => {
        handleClose();
      });
  };

  const fetchPreSelectedStatus = async (): Promise<string> => {
    try {
      const response = await axios.get(
        `${API_URL}/readingstate/${state.id}/${bookId}`
      );

      if (response.status === 200) {
        return response.data.status;
      } else {
        return "Estado de lectura";
      }
    } catch (error) {
      console.error("Error fetching reading status:", error);
      return "Estado de lectura";
    }
  };

  const [readingStatus, setReadingStatus] = useState("");

  useEffect(() => {
    const updateReadingStatus = async () => {
      const preSelectedStatus = await fetchPreSelectedStatus();
      setReadingStatus(preSelectedStatus);
      console.log("Estado de lectura preseleccionado:", preSelectedStatus);
    };

    updateReadingStatus();
  }, [openReadingStatusDialog]);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setReadingStatus(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/readingstate`, {
        bookId: bookId,
        userId: state.id,
        status: readingStatus,
      });

      console.log("Estado de lectura actualizado a:", readingStatus);
      enqueueSnackbar("Estado de lectura actualizado correctamente.", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error al actualizar el estado de lectura:", error);
      enqueueSnackbar("Hubo un error al actualizar el estado de lectura.", {
        variant: "error",
      });
    } finally {
      handleClose();
    }
  };

  //////// Dialog biblioteca checkbox /////////////////////////////////////////////////////////
  const [openAddToShelfDialog, setopenAddToShelfDialog] = useState(false);
  const [selectedShelves, setSelectedShelves] = useState<number[]>([]);
  const [bookshelves, setBookshelves] = useState<
    { id: number; title: string }[]
  >([]);

  const handleAddShelfButton = () => {
    setopenAddToShelfDialog(true);
  };

  const handleToggle = (value: number) => {
    setSelectedShelves((prev: number[]) => {
      const currentIndex = prev.indexOf(value);
      const newSelected = [...prev];

      if (currentIndex === -1) {
        newSelected.push(value);
      } else {
        newSelected.splice(currentIndex, 1);
      }

      return newSelected;
    });
  };

  useEffect(() => {
    const fetchBookShelves = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/bookshelf/${state.id}/saw_bookshelves`,
          { params: { bookId } }
        );

        const currentBookshelves = response.data.map(
          (shelf: { id: number }) => shelf.id
        );

        setSelectedShelves(currentBookshelves);
        console.log("Current bookshelves:", currentBookshelves);
      } catch (error) {
        console.error("Error fetching book shelves for the book", error);
      }
    };

    fetchBookShelves();
  }, []); // Make sure to re-run effect if bookId or state.id changes

  const handleSubmitBookshelf = async () => {
    try {
      // Send the PATCH request to update the bookshelves
      await axios.patch(`${API_URL}/bookshelf/update_bookshelf/${bookId}`, {
        bookshelfIds: selectedShelves,
        userId: state.id,
      });

      // Show success message
      enqueueSnackbar("Bibliotecas actualizadas correctamente.", {
        variant: "success",
      });

      // Close the dialog
      handleClose();
    } catch (error) {
      // Handle error case
      console.error("Error updating bookshelf", error);
      enqueueSnackbar("Error al actualizar bibliotecas.", {
        variant: "error",
      });
    }
  };

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
        try {
          const response = await axios.get(
            `${API_URL}/reviews/${bookId}?iduser=${state.id}`
          );
          setReviews(response.data);
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
      enqueueSnackbar(
        "Error calificando el libro. Por favor, intenta de nuevo.",
        {
          variant: "error",
        }
      );
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
      enqueueSnackbar("Tienes que calificar el libro primero.", {
        variant: "error",
      });

      return;
    }

    // Check the length of the review text
    if (newReviewText.length === 0) {
      enqueueSnackbar("El texto de la reseña no puede estar vacío.", {
        variant: "error",
      });
      return;
    }
    if (newReviewText.length > 400) {
      enqueueSnackbar(
        "El texto de la reseña no puede exceder los 400 caracteres.",
        {
          variant: "error",
        }
      );
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

  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookshelf/${state.id}`);
        const bookshelfData = response.data.map(
          (shelf: { id: number; title: string }) => ({
            id: shelf.id,
            title: shelf.title,
          })
        );
        setBookshelves(bookshelfData);
      } catch (error) {
        console.error("Error fetching bookshelves", error);
      }
    };

    fetchBookshelves();
  }, [state.id]);

  const handleDeleteReview = async () => {
    handleClose();
    const iduser = state.id;
    console.log(`${API_URL}/reviews/${bookId}/${iduser}`);

    try {
      const response = await axios.delete(
        `${API_URL}/reviews/${bookId}/${iduser}`
      );

      if (response.status === 204) {
        setUserReview(null);
        setUserRating(null);
        console.log("User deleted their review and rating");
        setNewReviewText("");
        enqueueSnackbar("Reseña eliminada correctamente.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(
          "Error actualizando la reseña. Por favor, intenta de nuevo.",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      enqueueSnackbar(
        "Error eliminando la reseña. Por favor, intenta de nuevo.",
        {
          variant: "error",
        }
      );
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
        <ColumnButton onClick={handleUpdateStatusButton}>
          {readingStatus.replace(/_/g, " ").charAt(0).toUpperCase() +
            readingStatus.replace(/_/g, " ").slice(1)}{" "}
          ✏️
        </ColumnButton>

        <ColumnButton onClick={handleAddShelfButton}>
          Agregar a Biblioteca 📚
        </ColumnButton>

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
                <Button onClick={() => setOpenDeleteReviewDialog(true)}>
                  Eliminar reseña
                </Button>
              </ReviewContent>
            </ReviewCard>
          ) : isWritingReview ? (
            <div>
              <ReviewInput
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Escribe tu reseña aquí..."
                //helperText={`${newReviewText.length}/15`}
                // slotProps={{
                //   htmlInput: { maxLength: 15 },
                // }}
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

        <Dialog open={openReadingStatusDialog} onClose={handleClose}>
          <DialogTitle>Actualizar estado de lectura</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <RadioGroup value={readingStatus} onChange={handleChange}>
                <FormControlLabel
                  value="leyendo"
                  control={<Radio />}
                  label="Leyendo"
                />
                <FormControlLabel
                  value="quiero_leer"
                  control={<Radio />}
                  label="Quiero leer"
                />
                <FormControlLabel
                  value="leido"
                  control={<Radio />}
                  label="Leido"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteStatus}>Eliminar</Button>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" onClick={handleSubmit} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openAddToShelfDialog} onClose={handleClose}>
          <DialogTitle>Añadir a la/s biblioteca/s</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              {bookshelves.length === 0 ? (
                <Typography>
                  Actualmente no tienes ninguna biblioteca,{" "}
                  <span
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/bookshelves")}
                  >
                    créalas aquí
                  </span>
                  .
                </Typography>
              ) : (
                bookshelves.map((shelf) => (
                  <FormControlLabel
                    key={shelf.id}
                    control={
                      <Checkbox
                        checked={selectedShelves.indexOf(shelf.id) !== -1}
                        onChange={() => handleToggle(shelf.id)}
                        color="primary"
                      />
                    }
                    label={shelf.title}
                  />
                ))
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            {bookshelves.length > 0 && (
              <Button onClick={handleSubmitBookshelf} color="primary">
                Guardar
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <Dialog open={openDeleteReviewDialog} onClose={handleClose}>
          <DialogTitle>Eliminar reseña</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que quieres eliminar tu reseña de este libro?
            </Typography>
            <Typography>Esta accion no se puede deshacer.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteReview}>Eliminar</Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </MainContent>
    </Container>
  );
};

export default Book;
