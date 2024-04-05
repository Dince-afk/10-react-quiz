import { useQuizContext } from "../contexts/QuizContext";
import styles from "./Progress.module.css";

function Progress() {
  const { index, selectedNumOfQuestions, currentPoints, selectedQuestions } =
    useQuizContext();
  const totalPoints = selectedQuestions.reduce(
    (sum, question) => (sum += question.points),
    0
  );

  return (
    <header className={`progress ${styles.progress}`}>
      <progress value={index} max={selectedNumOfQuestions}></progress>

      <p>
        Questions <strong>{index + 1}</strong> / {selectedNumOfQuestions}
      </p>
      <p>
        {currentPoints} / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
