import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
`;

export const LeftColumn = styled.div`
  width: 200px;
  padding-right: 20px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
  padding-left: 20px;
  overflow-y: auto;
  margin-top: 30px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

export const BookItem = styled.div`
  cursor: pointer;
  text-align: center;
`;

export const BookImage = styled.img`
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const BookTitle = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

export const Separator = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
`;

export const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;

  &:hover {
    background-color: #357ae8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5);
  }
`;
