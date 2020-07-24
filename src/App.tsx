import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';
import { randomCategory } from './utils';
//Types
import { QuestionState, Difficulty } from './API';
//Stypes
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [firstGame, setFirstGame] = useState(true);

  console.log(questions);
  
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    setFirstGame(false);

    var newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      randomCategory(),
      Difficulty.EASY
    );

    switch(Math.floor(Math.random() * 3)) {
      case 0:
        newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          randomCategory(),
          Difficulty.EASY
        );
        break;
      case 1:
        newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          randomCategory(),
          Difficulty.MEDIUM
        );
        break;
      default:
        newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          randomCategory(),
          Difficulty.HARD
        );
    }

  
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //User answer
      const answer = e.currentTarget.value;

      //Compare user answer to correct answer
      const correct = questions[number].correct_answer === answer;

      //Increment score if answer is correct
      if (correct) setScore(prev => prev + 1);

      //Apend answer into user answer array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // Move only if not on last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>CaptCheck</h1>

      {gameOver && !firstGame ? ( <p className="score">Score: {score}</p>) : null}

      {gameOver ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
       ) : null}

      {!gameOver && !loading ? <p className="score">Score: {score}</p> : null}

      {loading && <p>Loading Questions...</p>}

      {!loading && !gameOver && (
        <QuestionCard 
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS ? (
        <button className="next" onClick={nextQuestion}>
          Continue
        </button>
      ) : null}
    </Wrapper>
    </>
  );
}
export default App;
