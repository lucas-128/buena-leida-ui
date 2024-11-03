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
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const DEFAULT_COVER_IMAGE = "https://picsum.photos/seed/book/200/300";

export default function Bookshelves() {
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
  const [open, setOpen] = useState(false); // delete dialog
  const [openAddShelf, setOpenAddShelf] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState("");

  const handleShelfClick = (shelf: string) => {
    console.log(`Clicked on shelf: ${shelf}`);
  };

  const handleBookClick = (bookId: number) => {
    console.log(`Clicked on book with id: ${bookId}`);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting shelf: ${selectedShelf}`);
    setOpen(false);
    setSelectedShelf("");
  };

  const handleAddShelfButton = () => {
    setOpenAddShelf(true);
  };

  const handleAddShelf = () => {
    console.log(`Adding shelf: ${selectedShelf}`);
    setOpen(false);
    setOpenAddShelf(false);
    setSelectedShelf("");
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddShelf(false);
    setSelectedShelf("");
  };

  return (
    <Container>
      <LeftColumn>
        <Title>Mis Libros</Title>
        <Subtitle>Bibliotecas</Subtitle>
        {shelves.map((shelf) => (
          <MenuItem key={shelf} onClick={() => handleShelfClick(shelf)}>
            {shelf}
          </MenuItem>
        ))}
        <Separator />
        {myShelves.map((shelf) => (
          <MenuItem key={shelf}>
            <span onClick={() => handleShelfClick(shelf)}>{shelf}</span>
          </MenuItem>
        ))}
        <Button onClick={handleAddShelfButton}>Add shelf</Button>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Shelf</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete "{selectedShelf}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddShelf} onClose={handleClose}>
        <DialogTitle>Añadir Biblioteca</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Biblioteca"
            type="text"
            fullWidth
            value={shelfName}
            onChange={(e) => setShelfName(e.target.value)}
            InputProps={{ inputProps: { maxLength: 20 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddShelf} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
