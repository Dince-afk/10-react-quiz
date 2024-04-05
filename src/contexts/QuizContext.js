import { createContext, useContext, useReducer } from "react";
import { quizReducer, initialState } from "../reducer/quizReducer";

const QuizContext = createContext();

export function QuizContextProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  function fetchData() {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataLoaded", payload: data }))
      .catch((err) => dispatch({ type: "errorLoading", payload: err.message }));
  }

  return (
    <QuizContext.Provider
      value={{
        ...state,
        dispatch,
        fetchData,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("This component is not a child to the QuizContext.");
  return context;
}
