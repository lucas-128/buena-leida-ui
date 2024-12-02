import axios from "axios";
import { useEffect, useState } from "react";
//import { useGlobalState } from "../../context/GlobalStateContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CoverImage,
  ContentContainer,
  BookTitle,
  Author,
  StarsContainer,
  ReviewContent,
  LikesContainer,
  Bio,
  FavoriteGenders,
  GenderTag,
  Grid,
  Name,
  ProfileContainer,
  ProfileHeader,
  ProfileInfo,
  ProfilePhoto,
  Username,
} from "./styled";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@mui/material";
import { useGlobalState } from "../../context/GlobalStateContext";
import { enqueueSnackbar } from "notistack";

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} fill="#f59e0b" color="#f59e0b" size={16} />);
    } else if (i - 0.5 <= rating) {
      stars.push(<StarHalf key={i} fill="#f59e0b" color="#f59e0b" size={16} />);
    } else {
      stars.push(<Star key={i} color="#d1d5db" size={16} />);
    }
  }
  return stars;
};

interface UserProfileData {
  id: number;
  name: string;
  username: string;
  bio: string;
  profilePhoto: string;
  favouritegenders: string[];
}

interface Review {
  reviewId: number;
  content: string;
  likes: number;
  calification: number;
  book: Book;
}

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
}
const API_URL = "https://buena-leida-back-kamk.onrender.com";
export default function Component() {
  const location = useLocation();
  const userId = location.state?.query || "";
  const { state } = useGlobalState();

  const navigate = useNavigate();

  const handleBookClick = (bookId: number) => {
    navigate("/book", { state: { query: bookId } });
  };

  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [pendingRequest, setPendingRequest] = useState<boolean>(false);
  const [pendingReceivedRequest, setReceivedRequest] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews/user/${userId}`);
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}/profile`);
        const data = response.data;
        setUserData(data);
      } catch (err) {
        console.log("error fetching user data");
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isFriend = await axios.get(
          `${API_URL}/friendships/friends/${state.id}/${userId}`
        );

        if(isFriend){
          setIsFriend(true);
        } else {
          
          const requested = await axios.post(`${API_URL}/friend-requests/request`, {
            senderid: state.id,
            receiverid: userId,
          });

          if(requested) {
            setPendingRequest(true);
          }

          const received = await axios.post(`${API_URL}/friend-requests/request`, {
            receiverid: state.id,
            senderid: userId,
          });

          if(received) {
            setReceivedRequest(true);
          }
        }
        
      } catch (err) {
        setIsFriend(false);
        console.log(err);
      }
    };

    fetchData();
  }, [userId]);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  const handleAddFriend = async () => {
    try {
      await axios.post(`${API_URL}/friend-requests/request`, {
        senderid: state.id,
        receiverid: userId,
      });
      setPendingRequest(true);
      enqueueSnackbar("Solicitud de amistad enviada", { variant: "success" });
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };
  console.log(state.id);
  console.log(userId);

  const handleRemoveFriend = async () => {
    console.log("Eliminando amigo...");
    try {
      await axios.delete(`${API_URL}/friendships/friends`, {
        data: {
          userid: state.id,
          friendid: userId,
        },
      });
      setIsFriend(false);
    } catch (error) {
      console.error("Error eliminando amigo:", error);
    }
  };

  return (
    <div>
      <ProfileContainer>
        <ProfileHeader>
          <ProfilePhoto src={userData.profilePhoto} alt={`${userData.name}`} />

          <ProfileInfo>
            <Name>{userData.name}</Name>
            <Username>@{userData.username}</Username>
          </ProfileInfo>
          <Button
            variant="contained"
            disabled={pendingRequest}
            color="secondary"
            style={{
              backgroundColor: pendingRequest ? "lightgray" : undefined,
              marginBottom: "160px",
            }}
            onClick={
              pendingRequest
                ? undefined
                : isFriend
                ? handleRemoveFriend
                : handleAddFriend
            }
          >
            {pendingRequest
              ? "Solicitud pendiente"
              : isFriend
              ? "Eliminar amigo"
              : "Añadir amigo"}
          </Button>
        </ProfileHeader>
        <Bio>{userData.bio}</Bio>
        <FavoriteGenders>
          <h3>Géneros favoritos:</h3>
          {userData.favouritegenders.map((gender, index) => (
            <GenderTag key={index}>{gender}</GenderTag>
          ))}
        </FavoriteGenders>
      </ProfileContainer>
      <ProfileContainer>
        <h1>Reseñas</h1>
        <Grid>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.reviewId}>
                <CardContent>
                  <CoverImage
                    onClick={() => handleBookClick(review.book.id)}
                    src={review.book.coverImage}
                    alt={`Cover of ${review.book.title}`}
                  />
                  <ContentContainer>
                    <BookTitle onClick={() => handleBookClick(review.book.id)}>
                      {review.book.title}
                    </BookTitle>
                    <Author>{review.book.author}</Author>
                    <StarsContainer>
                      {renderStars(review.calification)}
                    </StarsContainer>
                    <ReviewContent>{review.content}</ReviewContent>
                    <LikesContainer>{review.likes} likes</LikesContainer>
                  </ContentContainer>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>Este usuario no ha hecho reseñas.</p>
          )}
        </Grid>
      </ProfileContainer>
    </div>
  );
}
