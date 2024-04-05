import { useState } from "react";
import { useQuizContext } from "../contexts/QuizContext";

export default function AnswerButton({
  option,
  i,
  correctOption,
  points,
  showAnswer,
  setShowAnswer,
}) {
  const { dispatch } = useQuizContext();

  // 1. show if this option is selected
  const [isSelected, setIsSelected] = useState(false);

  // 2. show true and false answers
  const isCorrectAnswer = i === correctOption;

  // 3. set index up one

  function handleAnswer() {
    setIsSelected(true);
    setShowAnswer(true);
    if (isCorrectAnswer) dispatch({ type: "updatePoints", payload: points });
  }

  return showAnswer ? (
    <button
      className={`btn btn-option ${isSelected ? "answer" : ""} ${
        isCorrectAnswer ? "correct" : "wrong"
      }`}
      disabled={true}
    >
      {option}
    </button>
  ) : (
    <button className={`btn btn-option`} onClick={handleAnswer}>
      {option}
    </button>
  );
}
