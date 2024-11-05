import { useState } from "react";
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
} from "./styled";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";

const DEFAULT_COVER_IMAGE = "https://picsum.photos/seed/book/200/300";

export default function Bookshelves() {
  const { enqueueSnackbar } = useSnackbar();

  const shelves = ["Leídos", "Leyendo", "Quiero leer"];
  const myShelves = ["test shelf", "shelf 1", "shelf 2"];
  const books = [
    { id: 1, title: "Book 1", cover: DEFAULT_COVER_IMAGE },
    { id: 2, title: "Book 2", cover: DEFAULT_COVER_IMAGE },
    { id: 3, title: "Book 3", cover: DEFAULT_COVER_IMAGE },
    { id: 4, title: "Book 4", cover: DEFAULT_COVER_IMAGE },
    { id: 5, title: "Book 5", cover: DEFAULT_COVER_IMAGE },
    { id: 6, title: "Book 6", cover: DEFAULT_COVER_IMAGE },
    { id: 7, title: "Book 7", cover: DEFAULT_COVER_IMAGE },
    { id: 8, title: "Book 8", cover: DEFAULT_COVER_IMAGE },
  ];

  const [shelfName, setShelfName] = useState<string>("");
  const [openAddShelf, setOpenAddShelf] = useState(false);

  const handleShelfClick = (shelf: string) => {
    console.log(`Clicked on shelf: ${shelf}`);
  };

  const handleBookClick = (bookId: number) => {
    console.log(`Clicked on book with id: ${bookId}`);
  };

  const handleAddShelfButton = () => {
    setOpenAddShelf(true);
  };

  const handleAddShelf = () => {
    console.log(`Adding shelf: ${shelfName}`);

    if (shelfName.length == 0) {
      enqueueSnackbar("El nombre de la biblioteca no puede estar vacío.", {
        variant: "error",
      });
      return;
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
          <MenuItem key={shelf} onClick={() => handleShelfClick(shelf)}>
            {shelf}
          </MenuItem>
        ))}
        <Separator />
        <Subtitle>Bibliotecas</Subtitle>

        {myShelves.map((shelf) => (
          <MenuItem key={shelf}>
            <span onClick={() => handleShelfClick(shelf)}>{shelf}</span>
          </MenuItem>
        ))}
        <Button onClick={handleAddShelfButton}>Crear</Button>
      </LeftColumn>
      <MainContent>
        <BookList>
          {books.map((book) => (
            <BookItem key={book.id} onClick={() => handleBookClick(book.id)}>
              <BookImage
                src={book.cover}
                alt={`Cover of ${book.title}`}
                width={150}
                height={200}
              />
              <BookTitle>{book.title}</BookTitle>
            </BookItem>
          ))}
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
