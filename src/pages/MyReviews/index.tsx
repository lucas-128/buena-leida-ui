import { useState, useEffect } from "react";
import styled from "styled-components";
import { Star, StarHalf } from "lucide-react";
import { useGlobalState } from "../../context/GlobalStateContext";

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
}

interface Review {
  reviewId: number;
  content: string;
  likes: number;
  calification: number;
  book: Book;
}

// TODO: Mover a styled.tsx
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Card = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Author = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const StarsContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const ReviewContent = styled.p`
  font-size: 0.875rem;
  margin-bottom: 1rem;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
`;

export default function MyReviews() {
  const { state } = useGlobalState();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/reviews/user/${state.id}`
        );
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [state.id]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} fill="#f59e0b" color="#f59e0b" size={16} />);
      } else if (i - 0.5 <= rating) {
        stars.push(
          <StarHalf key={i} fill="#f59e0b" color="#f59e0b" size={16} />
        );
      } else {
        stars.push(<Star key={i} color="#d1d5db" size={16} />);
      }
    }
    return stars;
  };

  return (
    <Container>
      <Title>Mis Reseñas</Title>
      <Grid>
        {reviews.map((review) => (
          <Card key={review.reviewId}>
            <CardContent>
              <CoverImage
                src={review.book.coverImage}
                alt={`Cover of ${review.book.title}`}
              />
              <ContentContainer>
                <BookTitle>{review.book.title}</BookTitle>
                <Author>{review.book.author}</Author>
                <StarsContainer>
                  {renderStars(review.calification)}
                </StarsContainer>
                <ReviewContent>{review.content}</ReviewContent>
                <LikesContainer>{review.likes} likes</LikesContainer>
              </ContentContainer>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
