import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  align-items: center;
  font-size: 2rem;
`;

export const ProfileBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50%;
  min-width: 50%;
  border: 1px solid #ddd;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 300px;
  background-color: white;
`;

export const ProfilePhoto = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const Username = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: "black";
`;

export const Bio = styled.p`
  font-size: 1.2rem;
  margin: 0;
  color: "black";
`;

export const RealName = styled.p`
  font-size: 1.2rem;
  color: "black";
`;

export const EditButton = styled.span`
  font-size: 16px;
  color: #888;
  margin-left: 2px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

export const ReviewCard = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;
