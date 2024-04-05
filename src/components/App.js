import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Quiz from "./Quiz";
import Result from "./Result";

import { useQuizContext } from "../contexts/QuizContext";

function App() {
  const { status, message } = useQuizContext();
  return (
    <div className="app">
      <Header />
      {status === "loading" && <Loader />}
      {status === "errorLoading" && <Error>{message}</Error>}
      {status === "dataLoaded" && <Start />}
      {status === "quizReady" && <Quiz />}
      {status === "finished" && <Result />}
    </div>
  );
}

export default App;
