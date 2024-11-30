import styled from "styled-components";

export const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 30px;
`;

export const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const BookCard = styled.div`
  width: 200px;
  flex-shrink: 0;

  cursor: pointer;
`;

export const BookCover = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

export const BookTitle = styled.h3`
  font-size: 16px;
  margin: 10px 0 5px;
`;

export const BookAuthor = styled.p`
  font-size: 14px;
  color: #666;
`;

export const LibraryList = styled.ul`
  list-style-type: none;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;

export const LibraryItem = styled.li`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const UserCard = styled.div`
  width: 150px;
  flex-shrink: 0;
  text-align: center;
`;

export const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const UserName = styled.h3`
  font-size: 16px;
  margin: 0;
`;

export const UserUsername = styled.p`
  font-size: 14px;
  color: #666;
`;

export const GroupCard = styled.div`
  width: 200px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

export const GroupCover = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const GroupName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 10px;
  text-align: center;
  color: #333;
`;
