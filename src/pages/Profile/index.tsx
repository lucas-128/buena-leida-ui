import React, { useEffect, useState } from "react";
import { ProfileContainer } from "./styled";
import { storage } from "../../../firebaseConfig";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export const Profile = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 50,
    x: 0,
    y: 0,
    height: 50,
  });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const username = "test";

  useEffect(() => {
    const fetchImage = () => {
      const imageRef = ref(storage, `profiles/${username}/photo.jpg`);
      getDownloadURL(imageRef)
        .then((url) => setImageUrl(url))
        .catch(() => setImageUrl(""));
    };

    fetchImage();
  }, [username]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setCroppedImage(reader.result as string);
    }
  };

  const handleUpload = async () => {
    if (selectedImage && croppedImage) {
      const imageRef = ref(storage, `profiles/${username}/photo.jpg`);
      setUploading(true);

      const response = await fetch(croppedImage);
      const blob = await response.blob();

      uploadBytes(imageRef, blob).then(() => {
        setUploading(false);
        setImageUrl(croppedImage);
      });
    }
  };

  const handleDelete = () => {
    setImageUrl(null);
  };

  const saveChanges = async () => {
    if (imageUrl === null) {
      const imageRef = ref(storage, `profiles/${username}/photo.jpg`);
      await deleteObject(imageRef).catch((error) =>
        console.error("Error deleting file:", error)
      );

      const defaultImageRef = ref(storage, `profiles/default.jpg`);
      const url = await getDownloadURL(defaultImageRef);
      setImageUrl(url);
    }
  };

  return (
    <ProfileContainer>
      <p>Perfil</p>
      {imageUrl ? <img src={imageUrl} alt="Profile" /> : <p>Loading...</p>}

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {croppedImage && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(newCrop: PixelCrop) => setCrop(newCrop)}
            aspect={1}
          >
            <img src={croppedImage} alt="Crop preview" />
          </ReactCrop>
        </div>
      )}

      <button onClick={handleUpload} disabled={uploading}>
        Upload Image
      </button>
      <button onClick={handleDelete}>Delete Image</button>
      <button onClick={saveChanges}>Save Changes</button>
    </ProfileContainer>
  );
};
