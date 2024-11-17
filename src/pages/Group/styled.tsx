import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  display: flex;
`;

export const RightSection = styled.div`
  width: 40%;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  background-color: white;
  margin-top: 20px;
  padding: 5px;
  border-radius: 10px;
  padding-left: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.4em;
  margin-bottom: 20px;
  margin-top: 70px;
`;

export const CreateGroupButton = styled.button`
  background-color: var(--c-color);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--d-color);
  }
`;

export const GroupCard = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
`;

export const GroupImage = styled.img`
  width: 250px;
  margin-top: 20px;
`;

export const GroupInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GroupDescription = styled.div`
  flex-direction: column;
  width: 500px;
  padding: 10px;
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
`;

export const GroupProfile = styled.div`
  display: flex;
  gap: 10px;
  height: 318px;
`;

export const LeftSection = styled.div`
  flex-direction: column;
`;

export const InteractButton = styled.button`
  background-color: var(--c-color);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  width: 250px;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--d-color);
  }
`;

export const GroupTitle = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;
