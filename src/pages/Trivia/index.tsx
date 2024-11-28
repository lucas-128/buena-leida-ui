import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { Feed, Container } from "./styled";
import { questions } from "./BookData";
import { QuizQuestion } from "./QuizQuestion";
import styled from "styled-components";

const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  text-align: center;
`;

const StartButton = styled(Button)`
  && {
    margin-top: 30px;
  }
`;

const ScoreText = styled(Typography)`
  && {
    margin-top: 20px;
    font-weight: bold;
  }
`;

export const Trivia: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <Feed>
      <CenteredContainer>
        {!quizStarted ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              ¡Demostrá cuánto sabés de literatura!
            </Typography>
            <StartButton
              variant="contained"
              color="secondary"
              onClick={handleStartQuiz}
            >
              Comenzar
            </StartButton>
          </>
        ) : currentQuestionIndex < questions.length ? (
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              ¡Trivia completada!
            </Typography>
            <ScoreText variant="h5">
              Resultado final: {score} de {questions.length} respuestas
              correctas
            </ScoreText>
            <StartButton
              variant="contained"
              color="primary"
              onClick={resetQuiz}
            >
              Reintentar
            </StartButton>
          </>
        )}
      </CenteredContainer>
    </Feed>
  );
};

export default Trivia;
