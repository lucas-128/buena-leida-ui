import React from "react";
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

const popularBooks = [
  {
    id: 1,
    cover: "https://picsum.photos/200/300?random=1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: 2,
    cover: "https://picsum.photos/200/300?random=2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    id: 3,
    cover: "https://picsum.photos/200/300?random=3",
    title: "1984",
    author: "George Orwell",
  },
  {
    id: 4,
    cover: "https://picsum.photos/200/300?random=4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
  },
  {
    id: 5,
    cover: "https://picsum.photos/200/300?random=5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
  },
];

const users = [
  {
    id: 1,
    avatar: "https://picsum.photos/100/100?random=1",
    name: "John Doe",
    username: "@johndoe",
  },
  {
    id: 2,
    avatar: "https://picsum.photos/100/100?random=2",
    name: "Jane Smith",
    username: "@janesmith",
  },
  {
    id: 3,
    avatar: "https://picsum.photos/100/100?random=3",
    name: "Alice Johnson",
    username: "@alicej",
  },
  {
    id: 4,
    avatar: "https://picsum.photos/100/100?random=4",
    name: "Bob Williams",
    username: "@bobw",
  },
  {
    id: 5,
    avatar: "https://picsum.photos/100/100?random=5",
    name: "Emma Brown",
    username: "@emmab",
  },
];

const groups = [
  {
    id: "1",
    name: "Science Fiction Enthusiasts",
    coverImage: "https://via.placeholder.com/150?text=Sci-Fi",
  },
  {
    id: "2",
    name: "History Buffs",
    coverImage: "https://via.placeholder.com/150?text=History",
  },
  {
    id: "3",
    name: "Fantasy Fanatics",
    coverImage: "https://via.placeholder.com/150?text=Fantasy",
  },
  {
    id: "4",
    name: "Classic Literature Lovers",
    coverImage: "https://via.placeholder.com/150?text=Classics",
  },
  {
    id: "5",
    name: "Mystery & Thriller",
    coverImage: "https://via.placeholder.com/150?text=Mystery",
  },
  {
    id: "6",
    name: "Romance Reads",
    coverImage: "https://via.placeholder.com/150?text=Romance",
  },
  {
    id: "7",
    name: "Non-Fiction Nerds",
    coverImage: "https://via.placeholder.com/150?text=Non-Fiction",
  },
  {
    id: "8",
    name: "Young Adult Adventures",
    coverImage: "https://via.placeholder.com/150?text=YA",
  },
];

export const Home: React.FC = () => {
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
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
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
            <BookCover src={book.cover} alt={book.title} />
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
            <UserAvatar src={user.avatar} alt={user.name} />
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
            <GroupCover src={group.coverImage} alt={group.name} />
            <GroupName>{group.name}</GroupName>
          </GroupCard>
        ))}
      </Carousel>
    </HomeContainer>
  );
};

export default Home;
