import React, { ChangeEvent, useState } from "react";
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
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { useGlobalState } from "../../context/GlobalStateContext";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const defaultPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=100a1fe2-fd46-4fc5-9d11-e7b78ed946f5";

export const Profile = () => {
  const { state } = useGlobalState();
  const { dispatch } = useGlobalState();

  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [isEditingRealName, setIsEditingRealName] = useState<boolean>(false);
  const [bioText, setBioText] = useState<string>(state.bio);
  const [realNameText, setRealNameText] = useState<string>(state.name);
  const [error, setError] = useState<string>("");

  const [originalBioText, setOriginalBioText] = useState<string>(bioText);
  const [originalRealNameText, setOriginalRealNameText] =
    useState<string>(realNameText);

  const MAX_REALNAME_LENGTH = 30;
  const MAX_BIO_LENGTH = 300;

  // fetch with profile data
  const [photoUrl, setPhotoUrl] = useState<string>(state.profilePhoto);

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

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      const image = await readImageFile(file);
      const croppedImageBlob = await cropImage(image);
      const storageRef = ref(storage, `profiles/${state.username}/photo.jpg`);
      await uploadBytes(storageRef, croppedImageBlob);
      // Subir imagen a firebase
      const imageUrl = await getDownloadURL(storageRef);
      setPhotoUrl(imageUrl);

      // pegada axios para actualizar bdd
      try {
        await axios.patch(`${API_URL}/users/${state.id}/profile-photo`, {
          profilePhoto: imageUrl,
        });

        dispatch({ type: "SET_PROFILE_PHOTO", payload: imageUrl });
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const updatedUser = JSON.parse(storedUser);
          updatedUser.profilePhoto = imageUrl;
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (e) {
        console.log("Error updating profile pic: ", e);
        alert("Error actualizando imagen de perfil.");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Error actualizando imagen de perfil");
    }
  };

  const handleDeleteImage = async () => {
    if (!state.username) return;
    const storageRef = ref(storage, `profiles/${state.username}/photo.jpg`);
    try {
      await getMetadata(storageRef);
      await deleteObject(storageRef);

      // pegada axios para actualizar bdd
      try {
        await axios.patch(`${API_URL}/users/${state.id}/profile-photo`, {
          profilePhoto: defaultPhotoUrl,
        });

        dispatch({ type: "SET_PROFILE_PHOTO", payload: defaultPhotoUrl });
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const updatedUser = JSON.parse(storedUser);
          updatedUser.profilePhoto = defaultPhotoUrl;
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (e) {
        console.log("Error updating profile pic: ", e);
        alert("Error actualizando imagen de perfil.");
      }
    } catch (error) {
      // La imagen ya esta borrada
    }

    setPhotoUrl(defaultPhotoUrl);
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

  const saveBioChanges = async () => {
    setIsEditingBio(false);
    setError("");
    try {
      await axios.patch(`${API_URL}/users/${state.id}/bio`, {
        bio: bioText,
      });

      dispatch({ type: "SET_BIO", payload: bioText });

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const updatedUser = JSON.parse(storedUser);
        updatedUser.bio = bioText;
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.log("Error updating bio: ", e);
      alert("Error actualizando biografia.");
    }
  };

  const saveNameChanges = async () => {
    setIsEditingRealName(false);
    setError("");
    try {
      await axios.patch(`${API_URL}/users/${state.id}/name`, {
        name: realNameText,
      });

      dispatch({ type: "SET_NAME", payload: realNameText });
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const updatedUser = JSON.parse(storedUser);
        updatedUser.name = realNameText;
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.log("Error updating real name: ", e);
      alert("Error actualizando nombre.");
    }
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "9.2rem",
          }}
        >
          <ProfilePhoto src={photoUrl} />
          <div
            style={{
              marginLeft: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button
              size="small"
              variant="contained"
              component="label"
              style={{ marginBottom: "0.5rem" }}
            >
              Subir Imagen
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleDeleteImage}
            >
              Eliminar Imagen
            </Button>
          </div>
        </div>

        <Username>@{state.username}</Username>

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
              onClick={saveNameChanges}
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
            <Button size="medium" variant="contained" onClick={saveBioChanges}>
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

// Helper function to read the image file
const readImageFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => resolve(img);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Helper function to crop the image
const cropImage = (image: HTMLImageElement): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const size = Math.min(image.width, image.height);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    ctx.drawImage(
      image,
      (image.width - size) / 2,
      (image.height - size) / 2,
      size,
      size,
      0,
      0,
      size,
      size
    );

    canvas.toBlob(
      (blob: Blob | null) => {
        if (blob) {
          resolve(blob);
        }
      },
      "image/jpeg",
      1
    );
  });
};
