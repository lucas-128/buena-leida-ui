import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  HomeContainer,
  Carousel,
  BookCard,
  BookCover,
  BookTitle,
  BookAuthor,
  UserCard,
  UserAvatar,
  UserName,
  UserUsername,
  GroupCard,
  GroupCover,
  GroupName,
} from "./styled";
import { Typography } from "@mui/material";

interface UserData {
  id: number;
  name: string;
  username: string;
  avatar: string;
  profilePhoto: string;
}

interface GroupData {
  id: number;
  name: string;
  photo: string;
}

interface BookData {
  id: number;
  name: string;
  title: string;
  author: string
  coverimage: string;
}

const API_URL = "https://buena-leida-back-kamk.onrender.com";

export const Home: React.FC = () => {

  const [users, setTopUsers] = useState<UserData[]>([]);
  const [popularBooks, setTopBooks] = useState<BookData[]>([]);
  const [groups, setTopGroups] = useState<GroupData[]>([]);

  useEffect(() => {
    const fetchTopGroups = async () => {
      try {
        const response = await axios.get(`${API_URL}/home/topgroups`);
        setTopGroups(response.data); 
      } catch (error) {
        console.error("Error fetching top groups: ", error);
      }
    };

    fetchTopGroups();
  }, []);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/home/topbooks`);
        setTopBooks(response.data); 
      } catch (error) {
        console.error("Error fetching top Books: ", error);
      }
    };

    fetchTopBooks();
  }, []);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/home/topusers`);
        setTopUsers(response.data); 
      } catch (error) {
        console.error("Error fetching top users: ", error);
      }
    };

    fetchTopUsers();
  }, []);


  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <HomeContainer>
      <Typography
        style={{
          fontSize: "30px",
          marginBottom: "20px",
          marginTop: "20px",
          fontWeight: "bold",
        }}
      >
        ¡Bienvenido!
      </Typography>
      <Typography
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          fontSize: "18px",
        }}
      >
        Descubre, organiza y comparte tus lecturas favoritas. Encuentra
        inspiración en las reseñas de otros lectores y construye tu propio
        rincón literario. ¡Únete a nuestra comunidad y haz que cada página
        cuente! 📚✨
      </Typography>

      <Typography
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          marginTop: "30px",
          fontWeight: "bold",
        }}
      >
        Tendencias Literarias
      </Typography>
      <Carousel>
        {popularBooks.map((book) => (
          <BookCard key={book.id}>
            <BookCover src={book.coverimage} alt={book.title} />
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author}</BookAuthor>
          </BookCard>
        ))}
      </Carousel>

      <Typography
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          marginTop: "30px",
          fontWeight: "bold",
        }}
      >
        Conecta y Comparte
      </Typography>
      <Carousel>
        {users.map((user) => (
          <UserCard key={user.id}>
            <UserAvatar src={user.profilePhoto} alt={user.name} />
            <UserName>{user.name}</UserName>
            <UserUsername>{user.username}</UserUsername>
          </UserCard>
        ))}
      </Carousel>

      <Typography
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          marginTop: "30px",
          fontWeight: "bold",
        }}
      >
        Descubre Nuevos Grupos
      </Typography>
      <Carousel>
        {groups.map((group) => (
          <GroupCard key={group.id} onClick={() => handleClick()}>
            <GroupCover src={group.photo} alt={group.name} />
            <GroupName>{group.name}</GroupName>
          </GroupCard>
        ))}
      </Carousel>
    </HomeContainer>
  );
};

export default Home;
