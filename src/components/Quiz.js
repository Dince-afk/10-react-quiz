import { useQuizContext } from "../contexts/QuizContext";
import Progress from "./Progress";
import AnswerButton from "./AnswerButton";
import { useState } from "react";
import Timer from "./Timer";

function Quiz() {
  const { selectedQuestions, selectedNumOfQuestions, index, dispatch } =
    useQuizContext();
  const [showAnswer, setShowAnswer] = useState(false);

  const question = selectedQuestions[index];

  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
    setShowAnswer(false);
  }

  return (
    <main className="main">
      <Progress />
      <div>
        <h3>{question.question}</h3>
        <div className="options">
          {question.options.map((option, i) => (
            <AnswerButton
              option={option}
              i={i}
              correctOption={question.correctOption}
              key={i + option}
              showAnswer={showAnswer}
              setShowAnswer={setShowAnswer}
              points={question.points}
            />
          ))}
        </div>
        <div>
          <Timer />
          {showAnswer && (
            <button className="btn" onClick={handleNextQuestion}>
              {index !== selectedNumOfQuestions - 1 ? "Next" : "Finish"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default Quiz;
