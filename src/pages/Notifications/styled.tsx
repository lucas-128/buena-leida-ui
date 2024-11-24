import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 25px;
`;

export const NotificationsContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Username = styled.span`
  color: #666;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button<{ variant: "accept" | "reject" }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: ${(props) =>
    props.variant === "accept" ? "var(--d-color)" : "var(--a-color)"};

  &:hover {
    opacity: 0.9;
  }
`;

export const NoNotifications = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
`;
