import React, { useState } from "react";
import {
  ProfileContainer,
  ProfileBox,
  ProfilePhoto,
  Username,
  Bio,
  RealName,
  EditButton,
} from "./styled";
import { StyledTextField } from "../Login/styled";
import { Button } from "@mui/material";

export const Profile = () => {
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [isEditingRealName, setIsEditingRealName] = useState<boolean>(false);
  const [bioText, setBioText] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  );
  const [realNameText, setRealNameText] = useState<string>("Nombre Real");
  const [error, setError] = useState<string>("");

  const [originalBioText, setOriginalBioText] = useState<string>(bioText);
  const [originalRealNameText, setOriginalRealNameText] =
    useState<string>(realNameText);

  const MAX_REALNAME_LENGTH = 30;
  const MAX_BIO_LENGTH = 300;

  const handleBioEdit = () => {
    setIsEditingBio(!isEditingBio);
    setError("");
    if (!isEditingBio) {
      setOriginalBioText(bioText);
    }
  };

  const handleRealNameEdit = () => {
    setIsEditingRealName(!isEditingRealName);
    setError("");
    if (!isEditingRealName) {
      setOriginalRealNameText(realNameText);
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= MAX_BIO_LENGTH) {
      setBioText(inputText);
      setError("");
    } else {
      setError(`La biografía no puede exceder ${MAX_BIO_LENGTH} caracteres.`);
    }
  };

  const handleRealNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    const regex = /^[a-zA-Z\s]*$/;

    if (inputText.length === 0) {
      setError("El nombre no puede estar vacío.");
    } else if (
      regex.test(inputText) &&
      inputText.length <= MAX_REALNAME_LENGTH
    ) {
      setRealNameText(inputText);
      setError("");
    } else if (inputText.length > MAX_REALNAME_LENGTH) {
      setError(`El nombre no puede exceder ${MAX_REALNAME_LENGTH} caracteres.`);
    } else {
      setError("Solo se permiten letras y espacios.");
    }
  };

  const saveChanges = () => {
    setIsEditingBio(false);
    setIsEditingRealName(false);
    setError("");
  };

  const cancelChanges = () => {
    setBioText(originalBioText);
    setRealNameText(originalRealNameText);
    setIsEditingBio(false);
    setIsEditingRealName(false);
    setError("");
  };

  return (
    <ProfileContainer>
      <ProfileBox>
        <ProfilePhoto
          src="https://via.placeholder.com/150"
          alt="Profile Photo"
        />
        <Username>@username</Username>

        {isEditingRealName ? (
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <StyledTextField
              type="text"
              value={realNameText}
              onChange={handleRealNameChange}
              style={{ marginRight: "1rem", minWidth: "400px" }}
            />
            <Button
              size="medium"
              variant="contained"
              onClick={saveChanges}
              disabled={!realNameText} // Disable if empty
            >
              Guardar
            </Button>
            <Button size="medium" variant="contained" onClick={cancelChanges}>
              Cancelar
            </Button>
          </div>
        ) : (
          <RealName
            onClick={handleRealNameEdit}
            style={{
              width: "100%",
              border: "1px solid lightgray",
              padding: "1rem",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Nombre:</span> {realNameText}{" "}
            <EditButton>✏️</EditButton>
          </RealName>
        )}

        {isEditingBio ? (
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <StyledTextField
              value={bioText}
              onChange={handleBioChange}
              style={{ marginRight: "1rem", minWidth: "800px" }}
            />
            <Button size="medium" variant="contained" onClick={saveChanges}>
              Guardar
            </Button>
            <Button size="medium" variant="contained" onClick={cancelChanges}>
              Cancelar
            </Button>
          </div>
        ) : (
          <Bio
            onClick={handleBioEdit}
            style={{
              width: "100%",
              border: "1px solid lightgray",
              padding: "1rem",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Bio:</span> {bioText}{" "}
            <EditButton>✏️</EditButton>
          </Bio>
        )}

        {error && (
          <div
            style={{
              color: "red",
              marginTop: "2rem",
              fontSize: "1.75rem",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}
      </ProfileBox>
    </ProfileContainer>
  );
};

export default Profile;
