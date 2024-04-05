import { useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";
import RadioButton from "./RadioButton";
import styles from "./Start.module.css";

function Start() {
  const { difficultyLevel, selectedNumOfQuestions, highscore, dispatch } =
    useQuizContext();

  return (
    <div className={styles.start}>
      <h2>Welcome to The React Quiz!</h2>
      <h4>Your highscore: {highscore}</h4>
      <h4>Choose difficulty level:</h4>
      <div className={styles.radioButtons}>
        {["Easy", "Medium", "Hard", "All"].map((option) => (
          <RadioButton
            difficultyLevel={difficultyLevel}
            dispatch={dispatch}
            key={option}
          >
            {option}
          </RadioButton>
        ))}
      </div>
      <h4>Choose the number of questions to test your React mastery:</h4>
      <input
        className={`btn ${styles.numQuestionsInput}`}
        type="number"
        value={selectedNumOfQuestions}
        onChange={(e) =>
          dispatch({ type: "numOfQuestionsChanged", payload: e.target.value })
        }
      />
      <button className="btn" onClick={() => dispatch({ type: "quizStarted" })}>
        Let's start
      </button>
    </div>
  );
}

export default Start;
