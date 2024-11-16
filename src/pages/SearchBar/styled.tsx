import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const SearchForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: var(--c-color);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;

  &:hover {
    background-color: var(--d-color);
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ResultCard = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  gap: 20px;
  background-color: var(--im-white);
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const BookImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid #ccc;
`;

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid #ccc;
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const BookTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 10px 0;
  cursor: pointer;
`;

export const BookAuthor = styled.p`
  font-size: 14px;
  margin: 0 0 10px 0;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
`;

export const Synopsis = styled.p`
  font-size: 14px;
  margin: 0 0 10px 0;
`;

export const GenreList = styled.p`
  font-size: 14px;
  margin: 0 0 10px 0;
`;

export const PublicationDate = styled.p`
  font-size: 14px;
  margin: 0;
`;
