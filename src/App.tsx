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
  const [passed, setPassed] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [firstGame, setFirstGame] = useState(true);
  let level = 0;

  console.log(questions);
  
  const startEasy = () => {
    level = 0;
    console.log("startEasy ran, level= " + level);
    startQuiz();
  };

  const startMedium = () => {
    level = 1;
    console.log("startMedium ran, level= " + level);
    startQuiz();
  };

  const startHard = () => {
    level = 2;
    console.log("startHard ran, level= " + level);
    startQuiz();
  };

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    setFirstGame(false);
    setPassed(false);

    var newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      randomCategory(),
      Difficulty.EASY
    );

    switch(level) {
      case 2:
        newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          randomCategory(),
          Difficulty.HARD
        );
        break;
      case 1:
        newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          randomCategory(),
          Difficulty.MEDIUM
        );
        break;
      case 0:
        newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          randomCategory(),
          Difficulty.EASY
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
      if(score > 7) {
        setPassed(true);
      } else {
        setPassed(false);
      }
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

      {gameOver && !firstGame && !passed ? ( <p className="end-message">Aim for a higher score</p>) : null}

      {gameOver && !firstGame && passed ? ( <p className="end-message">You passed, nice</p>) : null}

      {gameOver && (
        <div className="start-wrapper">
          <button className="start" onClick={startEasy}>
            Easy
          </button>

          <button className="start" onClick={startMedium}>
            Medium
          </button>

          <button className="start" onClick={startHard}>
            Hard
          </button>
        </div>
       )}

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
