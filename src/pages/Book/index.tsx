import React, { useState } from "react";
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
} from "./styled";
import { defaultPhotoUrl } from "../Profile";

interface BookDetails {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  synopsis: string;
  genres: string[];
  publicationDate: string;
  userRating: number | null;
  userReview: string | null;
}

interface Review {
  id: string;
  username: string;
  profilePicture: string;
  rating: number;
  text: string;
  likes: number;
  userLiked: boolean;
}

const mockBookDetails: BookDetails = {
  id: "1",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  imageUrl: defaultPhotoUrl,
  rating: 4.3,
  reviewCount: 3872,
  synopsis: "A story of decadence and excess in Jazz Age America.",
  genres: ["Classic", "Fiction"],
  publicationDate: "April 10, 1925",
  userRating: null,
  userReview: null,
};

const mockReviews: Review[] = [
  {
    id: "1",
    username: "BookLover123",
    profilePicture: defaultPhotoUrl,
    rating: 5,
    text: "A timeless classic that never fails to captivate.",
    likes: 42,
    userLiked: false,
  },
  {
    id: "2",
    username: "LiteraryExplorer",
    profilePicture: defaultPhotoUrl,
    rating: 4,
    text: "Beautifully written, but I found the characters hard to relate to.",
    likes: 18,
    userLiked: true,
  },
  {
    id: "2",
    username: "LiteraryExplorer",
    profilePicture: defaultPhotoUrl,
    rating: 4,
    text: "Beautifully written, but I found the characters hard to relate to.",
    likes: 18,
    userLiked: true,
  },
  {
    id: "4",
    username: "LiteraryExplorer",
    profilePicture: defaultPhotoUrl,
    rating: 4,
    text: "Beautifully written, but I found the characters hard to relate to.",
    likes: 18,
    userLiked: true,
  },
  {
    id: "5",
    username: "LiteraryExplorer",
    profilePicture: defaultPhotoUrl,
    rating: 4,
    text: "Beautifully written, but I found the characters hard to relate to.",
    likes: 18,
    userLiked: true,
  },
  {
    id: "6",
    username: "LiteraryExplorer",
    profilePicture: defaultPhotoUrl,
    rating: 4,
    text: "Beautifully written, but I found the characters hard to relate to.",
    likes: 18,
    userLiked: true,
  },
];

export const Book: React.FC = () => {
  const location = useLocation();
  const bookId = location.state?.query || "";
  const [book, setBook] = useState<BookDetails>(mockBookDetails);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [userRating, setUserRating] = useState<number | null>(book.userRating);
  const [userReview, setUserReview] = useState<string | null>(book.userReview);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");

  const handleRating = (rating: number) => {
    setUserRating(rating);
    console.log(`User rated the book: ${rating} stars`);
  };

  const handleWriteReview = () => {
    setIsWritingReview(true);
  };

  const handleCancelReview = () => {
    setIsWritingReview(false);
    setNewReviewText("");
  };

  const handleSubmitReview = () => {
    setUserReview(newReviewText);
    setIsWritingReview(false);
    console.log(`User submitted review: ${newReviewText}`);
  };

  const handleDeleteReview = () => {
    setUserReview(null);
    setUserRating(null);
    console.log("User deleted their review and rating");
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          const newLikedState = !review.userLiked;
          console.log(
            `User ${newLikedState ? "liked" : "unliked"} review ${reviewId}`
          );
          return {
            ...review,
            likes: newLikedState ? review.likes + 1 : review.likes - 1,
            userLiked: newLikedState,
          };
        }
        return review;
      })
    );
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

  const renderRatingBreakdown = () => {
    const totalReviews = book.reviewCount;
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = Math.floor(Math.random() * totalReviews);
      const percentage = (count / totalReviews) * 100;
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

  return (
    <Container>
      <LeftColumn>
        <BookImage src={book.imageUrl} alt={book.title} />
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
            {renderStars(book.rating)}
            <span>
              {book.rating.toFixed(1)} ({book.reviewCount} reseñas)
            </span>
          </StarContainer>
          <Synopsis>{book.synopsis}</Synopsis>
          <GenreList>Géneros: {book.genres.join(", ")}</GenreList>
          <PublicationDate>
            Publicado en: {book.publicationDate}
          </PublicationDate>
        </BookCard>

        <Section>
          <SectionTitle>Mi Reseña</SectionTitle>
          {userReview ? (
            <ReviewCard>
              <ReviewContent>
                <StarContainer>{renderStars(userRating || 0)}</StarContainer>
                <p>{userReview}</p>
                <Button onClick={handleDeleteReview}>Delete Review</Button>
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
            {renderStars(book.rating)}
            <span>{book.rating.toFixed(1)} promedio</span>
          </StarContainer>
          <RatingBreakdown>{renderRatingBreakdown()}</RatingBreakdown>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <ReviewerInfo>
                <ProfilePicture
                  src={review.profilePicture}
                  alt={review.username}
                />
                <span>{review.username}</span>
              </ReviewerInfo>
              <ReviewContent>
                <StarContainer>{renderStars(review.rating)}</StarContainer>
                <p>{review.text}</p>
                <LikeButton
                  onClick={() => handleLikeReview(review.id)}
                  liked={review.userLiked}
                >
                  <ThumbsUp size={16} />
                  {review.userLiked ? "Te gustó" : "Me gusta"} • {review.likes}
                </LikeButton>
              </ReviewContent>
            </ReviewCard>
          ))}
        </Section>
      </MainContent>
    </Container>
  );
};

export default Book;
