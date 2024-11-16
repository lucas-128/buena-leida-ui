import { DialogContent, FormControl } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

export const RightSection = styled.div`
  width: 40%;
  position: sticky;
  top: 20px;
  align-self: flex-start;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  margin-bottom: 15px;
`;

export const CategoryItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.4em;
  margin-bottom: 20px;
  margin-top: 30px;
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
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const GroupInfo = styled.div`
  padding: 16px;
`;

export const GroupName = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #333;
`;

export const GroupDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 8px 0 16px;
`;

export const UsersCount = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const StyledFormControl = styled(FormControl)`
  flex: 1 1 calc(50% - 5px);
  min-width: 60px;
`;
