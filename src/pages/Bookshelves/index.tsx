import { useEffect, useState } from "react";
import {
  Container,
  LeftColumn,
  MainContent,
  Title,
  Subtitle,
  MenuItem,
  Button,
  BookList,
  BookItem,
  BookImage,
  BookTitle,
  Separator,
  MainContentTitle,
} from "./styled";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useGlobalState } from "../../context/GlobalStateContext";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  coverImage: string;
}

interface Bookshelf {
  id: number;
  title: string;
  books: Book[];
}

type NewStatus = "leido" | "leyendo" | "quiero_leer";

const DEFAULT_COVER_IMAGE = "https://picsum.photos/seed/book/200/300";
const API_URL = "https://buena-leida-back-kamk.onrender.com";

export default function Bookshelves() {
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useGlobalState();
  const navigate = useNavigate();
  const [showSelectedBooks, setShowSelectedBooks] = useState(true); // true para customs

  const getNewStatus = (status: string): NewStatus => {
    switch (status) {
      case "Leídos":
        return "leido";
      case "Leyendo":
        return "leyendo";
      case "Quiero leer":
        return "quiero_leer";
      default:
        throw new Error("Unknown status");
    }
  };

  const shelves = ["Leídos", "Leyendo", "Quiero leer"];

  const transformBookshelfData = (bookshelves: any[]) => {
    return bookshelves.map((shelf) => ({
      id: shelf.id,
      title: shelf.title,
      books: (shelf.Books || []).map((book: any) => ({
        id: book.id,
        coverImage: book.coverimage,
        title: book.title,
      })),
    }));
  };

  const transformBookStateData = (books: any[]) => {
    return books.map((book) => ({
      id: book.id,
      coverImage: book.coverimage,
      title: book.title,
    }));
  };

  const [bookshelves, setBookshelves] = useState<Bookshelf[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<
    { id: number; title: string; coverImage: string }[]
  >([]);

  const [selectedBooksStates, setSelectedBooksStates] = useState<
    { id: number; title: string; coverImage: string }[]
  >([]);

  const [title, setTitle] = useState("Leídos");

  useEffect(() => {
    if (state.id) {
      handleStatusClick("Leídos");
    }
  }, [state.id]);

  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookshelf/${state.id}`);
        const transformedData = transformBookshelfData(response.data);
        setBookshelves(transformedData);
      } catch (error) {
        console.log("Error fetching bookshelves:", error);
      }
    };

    fetchBookshelves();
  }, [state.id]);

  const [shelfName, setShelfName] = useState<string>("");
  const [openAddShelf, setOpenAddShelf] = useState(false);

  const handleStatusClick = async (status: string) => {
    console.log(`Clicked on status: ${status}`);
    console.log("aaa");
    setShowSelectedBooks(false);
    setTitle(status);
    const newStatus = getNewStatus(status);
    console.log(newStatus);
    console.log(`${API_URL}/readingstate/${state.id}/state/${newStatus}`);

    try {
      const response = await axios.get(
        `${API_URL}/readingstate/${state.id}/state/${newStatus}`
      );
      setSelectedBooksStates(transformBookStateData(response.data));
    } catch (error) {
      console.log("No books found for reading status");
      setSelectedBooksStates([]);
    }
  };

  const handleShelfClick = (shelfId: number) => {
    console.log(`Clicked on shelf with ID: ${shelfId}`);
    setShowSelectedBooks(true);

    const selectedShelf = bookshelves.find((shelf) => shelf.id === shelfId);
    if (selectedShelf) {
      setTitle(selectedShelf.title);
      setSelectedBooks(selectedShelf.books);
    }
  };

  const handleBookClick = (bookId: number) => {
    navigate("/book", { state: { query: bookId } });
  };

  const handleAddShelfButton = () => {
    setOpenAddShelf(true);
  };

  const handleAddShelf = async () => {
    if (shelfName.length === 0) {
      enqueueSnackbar("El nombre de la biblioteca no puede estar vacío.", {
        variant: "error",
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/bookshelf`, {
        id_usuario: state.id,
        title: shelfName,
      });

      if (response.status >= 200 && response.status < 300) {
        const newShelf = transformBookshelfData([response.data])[0];
        setBookshelves((prevShelves) => [...prevShelves, newShelf]);

        enqueueSnackbar("Nueva biblioteca añadida exitosamente.", {
          variant: "success",
        });
      }
    } catch (error: any) {
      console.log("Full error response:", error.response);

      if (error.response && error.response.status === 409) {
        console.log("Error: The bookshelf name already exists.");
        enqueueSnackbar("El nombre de la biblioteca ya existe.", {
          variant: "error",
        });
      } else {
        console.log("Error adding bookshelf:", error);
        enqueueSnackbar("Error al añadir la biblioteca.", { variant: "error" });
      }
    }

    setOpenAddShelf(false);
    setShelfName("");
  };
  const handleClose = () => {
    setOpenAddShelf(false);
  };

  const booksToDisplay = showSelectedBooks
    ? selectedBooks
    : selectedBooksStates;

  return (
    <Container>
      <LeftColumn>
        <Title>Mis Libros</Title>
        {shelves.map((shelf) => (
          <MenuItem key={shelf} onClick={() => handleStatusClick(shelf)}>
            {shelf}
          </MenuItem>
        ))}
        <Separator />
        <Subtitle>Bibliotecas</Subtitle>

        {bookshelves.map((shelf) => (
          <MenuItem key={shelf.id}>
            <span onClick={() => handleShelfClick(shelf.id)}>
              {shelf.title}
            </span>
          </MenuItem>
        ))}
        <Button onClick={handleAddShelfButton}>Crear</Button>
      </LeftColumn>
      <MainContent>
        <MainContentTitle>{title}</MainContentTitle>

        {booksToDisplay.length === 0 && (
          <p>No se encontraron libros en esta biblioteca.</p>
        )}

        {booksToDisplay.length > 0 && (
          <BookList>
            {booksToDisplay.map((book) => (
              <BookItem key={book.id} onClick={() => handleBookClick(book.id)}>
                <BookImage
                  src={book.coverImage || DEFAULT_COVER_IMAGE}
                  alt={`Cover of ${book.title}`}
                  width={150}
                  height={200}
                />
                <BookTitle>{book.title}</BookTitle>
              </BookItem>
            ))}
          </BookList>
        )}
      </MainContent>

      <Dialog open={openAddShelf} onClose={handleClose}>
        <DialogTitle>Añadir Biblioteca</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Biblioteca"
            type="text"
            fullWidth
            variant="standard"
            value={shelfName}
            onChange={(e) => setShelfName(e.target.value.slice(0, 15))}
            helperText={`${shelfName.length}/15`}
            slotProps={{
              htmlInput: { maxLength: 15 },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" onClick={handleAddShelf} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
