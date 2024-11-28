export interface Book {
  title: string;
  author: string;
  bio: string;
  coverImage: string;
  releaseDate: string;
}

export interface Question {
  type: "author" | "bio" | "releaseDate";
  bookIndex: number;
  options: string[];
  correctAnswer: string;
}

export const books: Book[] = [
  {
    title: "El Marciano",
    author: "Andy Weir",
    bio: "La historia de Mark Watney, un astronauta que queda atrapado en Marte y usa su ingenio y conocimientos cientÃ­ficos para sobrevivir en el planeta rojo.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/Trivia%2Fel-marciano.jpg?alt=media&token=4e6a14cb-dfa8-42fe-a796-c71137c0d8f5",
    releaseDate: "2011",
  },
  {
    title: "1984",
    author: "George Orwell",
    bio: "Una novela distópica ambientada en una sociedad totalitaria que explora temas de vigilancia masiva y control.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/Trivia%2Fimages.jpg?alt=media&token=459cbd15-fb13-49cc-ad1f-5872d14b4e0c",
    releaseDate: "1949",
  },
  {
    title: "Orgullo y Prejuicio",
    author: "Jane Austen",
    bio: "Una novela romántica de modales ambientada en la Inglaterra georgiana, que se centra en la familia Bennet.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/Trivia%2Forgullo-y-prejuicio.jpg?alt=media&token=6231edd7-9566-4617-9a61-2be181b5b8d9",
    releaseDate: "1813",
  },
  {
    title: "El Gran Gatsby",
    author: "F. Scott Fitzgerald",
    bio: "Una novela que retrata el estilo de vida lujoso de los estadounidenses adinerados durante los años veinte.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/Trivia%2Fb2834bc4ea71357c8b549dfccdd16d611c6586ea.jpg?alt=media&token=509541e1-4f61-4545-b6ef-df1ad177268a",
    releaseDate: "1925",
  },
  {
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    bio: "El inicio de la saga de Harry Potter, donde un joven mago descubre su verdadero destino y asiste a Hogwarts.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/books%2Fharry_potter.png?alt=media&token=12345",
    releaseDate: "1997",
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    bio: "Una obra maestra del realismo mágico que narra la historia de la familia Buendía en Macondo.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/books%2Fcien_anos.png?alt=media&token=67890",
    releaseDate: "1967",
  },
  {
    title: "Don Segundo Sombra",
    author: "Ricardo Güiraldes",
    bio: "Un clásico de la literatura argentina que describe la vida rural y el espíritu gaucho.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/books%2Fdon_segundo_sombra.png?alt=media&token=11223",
    releaseDate: "1926",
  },
  {
    title: "Rayuela",
    author: "Julio Cortázar",
    bio: "Una novela experimental argentina que permite ser leída de diversas formas, explorando el amor y la existencia.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/Trivia%2Frayuela1-70d4301f60dc01384c16171187155984-640-0.png?alt=media&token=eed864df-332e-4598-a186-9679bb049a9b",
    releaseDate: "1963",
  },
  {
    title: "El túnel",
    author: "Ernesto Sabato",
    bio: "Una novela psicológica argentina que narra la obsesión de un pintor por una mujer.",
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/books%2Fel_tunel.png?alt=media&token=55667",
    releaseDate: "1948",
  },
];

export const questions: Question[] = [
  {
    type: "author",
    bookIndex: 0,
    options: ["Harper Lee", "George Orwell", "Jane Austen", "Andy Weir"],
    correctAnswer: "Andy Weir",
  },
  {
    type: "bio",
    bookIndex: 1,
    options: ["Orgullo y Prejuicio", "1984", "El Gran Gatsby", "El Marciano"],
    correctAnswer: "1984",
  },
  {
    type: "releaseDate",
    bookIndex: 2,
    options: ["1813", "1925", "1949", "1960"],
    correctAnswer: "1813",
  },
  {
    type: "author",
    bookIndex: 3,
    options: [
      "Harper Lee",
      "George Orwell",
      "Jane Austen",
      "F. Scott Fitzgerald",
    ],
    correctAnswer: "F. Scott Fitzgerald",
  },
  {
    type: "bio",
    bookIndex: 6,
    options: [
      "Harry Potter y la piedra filosofal",
      "Rayuela",
      "Cien años de soledad",
      "Don Segundo Sombra",
    ],
    correctAnswer: "Don Segundo Sombra",
  },
  {
    type: "releaseDate",
    bookIndex: 1,
    options: ["1813", "1925", "1949", "1984"],
    correctAnswer: "1949",
  },
  {
    type: "author",
    bookIndex: 7,
    options: [
      "Julio Cortázar",
      "Ernesto Sabato",
      "Gabriel García Márquez",
      "Ricardo Güiraldes",
    ],
    correctAnswer: "Julio Cortázar",
  },
  {
    type: "releaseDate",
    bookIndex: 3,
    options: ["1813", "1925", "1949", "1960"],
    correctAnswer: "1925",
  },
];
