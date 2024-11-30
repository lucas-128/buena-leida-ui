import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 800px;
  min-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const ProfilePhoto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1.5rem;
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const Name = styled.h1`
  font-size: 2rem;
  margin: 0 0 0.5rem;
`;

export const Username = styled.h2`
  font-size: 1.3rem;
  color: #6c757d;
  margin: 0;
`;

export const Bio = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 1rem 0;
`;

export const FavoriteGenders = styled.div`
  margin-top: 1rem;
`;

export const GenderTag = styled.span`
  display: inline-block;
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export const Card = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`;

export const ContentContainer = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: rgb(239, 239, 239);
`;

export const BookTitle = styled.h2`
  &:hover {
    cursor: pointer;
  }
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const Author = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

export const StarsContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const ReviewContent = styled.p`
  font-size: 0.875rem;
  margin-bottom: 1rem;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
`;
