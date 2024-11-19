import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 30px;
  height: calc(100vh - 120px);
  overflow: hidden;
`;

export const LeftColumn = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
`;
export const BookImage = styled.img`
  width: 100%;
  max-height: 450px;
  aspect-ratio: 2/3;
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--im-white);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
`;

export const StarContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  align-items: center;
`;

export const RatingBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 8px;
  background-color: var(--im-white);
  border-radius: 4px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    width: ${(props) => props.percentage}%;
    height: 100%;
    background-color: var(--c-color);
  }
`;

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  height: 100%;
  padding-right: 20px;
`;

export const BookCard = styled.div`
  background-color: var(--im-white);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 28px;
  margin: 0 0 10px 0;
  color: #333;
`;

export const Author = styled.h2`
  font-size: 20px;
  margin: 0 0 10px 0;
  color: #666;
`;

export const Synopsis = styled.p`
  margin: 15px 0;
  line-height: 1.6;
  color: #444;
`;

export const GenreList = styled.p`
  margin: 10px 0;
  color: #666;
`;

export const PublicationDate = styled.p`
  margin: 10px 0;
  color: #666;
`;

export const Section = styled.div`
  margin-bottom: 30px;
  background-color: var(--im-white);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
`;

export const Button = styled.button`
  background-color: var(--d-color);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--c-color);
  }
`;

export const ColumnButton = styled.button`
  margin-bottom: 10px;
  background-color: var(--d-color);
  color: white;
  border: none;
  width: 100%;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--c-color);
  }
`;

export const TextReview = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  color: black;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  white-space: normal;
`;

export const ReviewInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
`;

export const RatingBreakdown = styled.div`
  margin-bottom: 20px;
  background-color: rgb(247, 247, 248);
  padding: 15px;
  border-radius: 8px;
  padding-right: 25px;
`;

export const RatingRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 70px;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--im-black);
`;

export const ReviewCard = styled.div`
  display: flex;
  background-color: rgb(247, 247, 248);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
`;

export const ProfilePicture = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ReviewContent = styled.div`
  flex: 1;
`;

export const LikeButton = styled.button<{ liked: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.liked ? "#007bff" : "#666")};
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

export const RatingCount = styled.span`
  text-align: right;
  white-space: nowrap;
  margin-right: 20px;
`;
