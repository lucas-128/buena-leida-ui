import React, { useState } from "react";
import { Question, books } from "./BookData";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

const UNKOWN_BOOK_COVER =
  "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/Trivia%2Fbook-question-mark-isolated-blue.png?alt=media&token=46f75c3d-5009-4331-9695-95e9553f4e58";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  margin-top: 20px;
  padding: 0 20px;
  min-width: 900px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const QuestionText = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

const BookCover = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
`;

const OptionButton = styled(Button)<{
  $isCorrect?: boolean;
  $isWrong?: boolean;
  $showCorrect?: boolean;
}>`
  && {
    background-color: ${(props) =>
      props.$isCorrect
        ? "green"
        : props.$isWrong
        ? "red"
        : props.$showCorrect
        ? "green"
        : "var(--c-color)"};

    color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: ${(props) =>
        props.$isCorrect
          ? "darkgreen"
          : props.$isWrong
          ? "darkred"
          : props.$showCorrect
          ? "darkgreen"
          : "var(--d-color)"};
    }
  }
`;

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctAnswer;
    if (!isCorrect) {
      setShowCorrectAnswer(true);
    }
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
    }, 2000);
  };

  const getQuestionText = () => {
    const book = books[question.bookIndex];
    switch (question.type) {
      case "author":
        return [`¿Quién escribió?`, `"${book.title}"`];
      case "bio":
        return [`¿De qué libro se trata?`, `"${book.bio}"`];
      case "releaseDate":
        return [`¿En qué año se publicó?`, ` "${book.title}"`];
    }
  };

  return (
    <QuestionContainer>
      {question.type !== "bio" ? (
        <BookCover
          src={books[question.bookIndex].coverImage}
          alt={books[question.bookIndex].title}
        />
      ) : (
        <BookCover src={UNKOWN_BOOK_COVER} />
      )}

      <QuestionText variant="h5" gutterBottom>
        {getQuestionText()[0]}
      </QuestionText>
      <QuestionText variant="h6" gutterBottom>
        {getQuestionText()[1]}
      </QuestionText>

      <OptionsContainer>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            $isCorrect={
              selectedAnswer === option && option === question.correctAnswer
            }
            $isWrong={
              selectedAnswer === option && option !== question.correctAnswer
            }
            $showCorrect={
              showCorrectAnswer && option === question.correctAnswer
            }
          >
            {option}
          </OptionButton>
        ))}
      </OptionsContainer>
    </QuestionContainer>
  );
};
