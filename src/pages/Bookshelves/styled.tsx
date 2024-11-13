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
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
  padding-left: 20px;
  overflow-y: auto;
  margin-top: 40px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
  margin-top: 25px;
`;

export const MainContentTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 20px;
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  padding: 5px 0;
  margin-bottom: 4px;
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
  background-color: rgb(116, 82, 108);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 5px;

  &:hover {
    background-color: #357ae8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5);
  }
`;

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const DialogContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DialogTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;
