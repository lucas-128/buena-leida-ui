import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #ff4d4d;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
  }
`;
