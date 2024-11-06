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

const DEFAULT_COVER_IMAGE = "https://picsum.photos/seed/book/200/300";
const API_URL = "http://localhost:3000";

export default function Bookshelves() {
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useGlobalState();
  const navigate = useNavigate();

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
  const [bookshelves, setBookshelves] = useState<Bookshelf[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<
    { id: number; title: string; coverImage: string }[]
  >([]); // To hold books for the selected shelf
  const [title, setTitle] = useState("Leídos");

  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookshelf/${state.id}`);
        const transformedData = transformBookshelfData(response.data);
        setBookshelves(transformedData);
      } catch (error) {
        console.error("Error fetching bookshelves:", error);
      }
    };

    fetchBookshelves();
  }, []);

  const [shelfName, setShelfName] = useState<string>("");
  const [openAddShelf, setOpenAddShelf] = useState(false);

  const handleStatusClick = (status: string) => {
    console.log(`Clicked on shelf: ${status}`);
    setTitle(status);
  };

  const handleShelfClick = (shelfId: number) => {
    console.log(`Clicked on shelf with ID: ${shelfId}`);

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
        console.log("falpinha");
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
        console.error("Error adding bookshelf:", error);
        enqueueSnackbar("Error al añadir la biblioteca.", { variant: "error" });
      }
    }

    setOpenAddShelf(false);
    setShelfName("");
  };
  const handleClose = () => {
    setOpenAddShelf(false);
  };

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
        <BookList>
          {selectedBooks.length > 0 ? (
            selectedBooks.map((book) => (
              <BookItem key={book.id} onClick={() => handleBookClick(book.id)}>
                <BookImage
                  src={book.coverImage || DEFAULT_COVER_IMAGE}
                  alt={`Cover of ${book.title}`}
                  width={150}
                  height={200}
                />
                <BookTitle>{book.title}</BookTitle>
              </BookItem>
            ))
          ) : (
            <p>No se encontraron libros en esta biblioteca.</p>
          )}
        </BookList>
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
            onChange={(e) => setShelfName(e.target.value)}
            inputProps={{ maxLength: 15 }}
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
