import { useQuizContext } from "../contexts/QuizContext";

function Result() {
  const { currentPoints, highscore, selectedQuestions, dispatch } =
    useQuizContext();

  const totalPoints = selectedQuestions.reduce(
    (acc, curVal) => acc + curVal.points,
    0
  );

  let resultEmoji;

  if (currentPoints === totalPoints) resultEmoji = "🥇";
  else if (currentPoints > totalPoints / 2) resultEmoji = "😌";
  else resultEmoji = "😔";

  return (
    <>
      <div className="result bg-slate-100" style={{ padding: "20px" }}>
        <h3>You Scored</h3>
        <h3>
          {resultEmoji} {currentPoints} out of {totalPoints} points (
          {(currentPoints / totalPoints).toFixed(2) * 100} %)
        </h3>
      </div>
      <h3>(Highscore: {highscore} points)</h3>
      <button className="btn" onClick={() => dispatch({ type: "restart" })}>
        Restart
      </button>
    </>
  );
}

export default Result;
