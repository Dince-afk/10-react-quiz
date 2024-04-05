import { useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";

export default function Loader() {
  const { fetchData } = useQuizContext();

  useEffect(fetchData, []);

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading questions...</p>
    </div>
  );
}
