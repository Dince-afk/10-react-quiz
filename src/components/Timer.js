import { useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";

function Timer() {
  const { timeRemaining, dispatch } = useQuizContext();

  const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
  const seconds = String(Math.floor(timeRemaining % 60)).padStart(2, "0");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [dispatch]);

  return <div className="timer">{`${minutes}:${seconds}`}</div>;
}

export default Timer;
