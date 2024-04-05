const SECONDS_PER_QUESTION = 25;

export const initialState = {
  // Overall status
  status: "loading",
  message: "",
  difficultyLevel: "all",

  // Quiz
  questions: [],
  numOfQuestions: null,
  index: 0,
  timeRemaining: 0,

  // Selected questions
  selectedQuestions: [],
  selectedNumOfQuestions: null,

  // Points
  currentPoints: 0,
  highscore: 0,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case "dataLoaded":
      const numOfQuestions = action.payload.length;
      const questionsWithDifficultyLevel = action.payload.map((question) => {
        let difLevel;
        if (question.points === 10) difLevel = "easy";
        if (question.points === 20) difLevel = "medium";
        if (question.points === 30) difLevel = "hard";
        if ([10, 20, 30].includes((num) => num === question.points))
          difLevel = "easy";

        return { ...question, difficulty: difLevel };
      });

      return {
        ...state,
        status: "dataLoaded",
        questions: questionsWithDifficultyLevel,
        selectedQuestions: questionsWithDifficultyLevel,
        numOfQuestions: numOfQuestions,
        selectedNumOfQuestions: numOfQuestions,
      };
    case "errorLoading":
      return { ...state, status: "errorLoading", message: action.payload };
    case "difficultySelected":
      const selectedDiffLevel = action.payload;
      if (selectedDiffLevel === state.difficulty) return;

      const selectedDiffQuestions =
        selectedDiffLevel === "all"
          ? state.questions
          : state.questions.filter((question) => {
              return question.difficulty === selectedDiffLevel;
            });

      return {
        ...state,
        difficultyLevel: selectedDiffLevel,
        selectedNumOfQuestions: selectedDiffQuestions.length,
      };
    case "numOfQuestionsChanged":
      const numOfQuestSelected = Number(action.payload);
      if (numOfQuestSelected < 1) return state;

      const totalNumOfDiffQuestions =
        state.difficultyLevel === "all"
          ? state.questions.length
          : state.questions.filter(
              (question) => question.difficulty === state.difficultyLevel
            ).length;
      if (numOfQuestSelected > totalNumOfDiffQuestions) return state;

      return {
        ...state,
        selectedNumOfQuestions: numOfQuestSelected,
      };
    case "quizStarted":
      // Set the questions based on user difficulty and number of questions selection
      const filteredQuestionsDiff =
        state.difficultyLevel === "all"
          ? state.questions
          : state.questions.filter(
              (question) => question.difficulty === state.difficultyLevel
            );

      const questionsNumSelected = filteredQuestionsDiff.slice(
        0,
        state.selectedNumOfQuestions
      );

      return {
        ...state,
        selectedQuestions: questionsNumSelected,
        timeRemaining: questionsNumSelected.length * SECONDS_PER_QUESTION,
        status: "quizReady",
      };
    case "tick":
      if (state.timeRemaining === 0) return { ...state, status: "finished" };

      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
      };
    case "updatePoints":
      return {
        ...state,
        currentPoints: state.currentPoints + action.payload,
      };
    case "nextQuestion":
      if (state.index === state.selectedNumOfQuestions - 1)
        return { ...state, status: "finished" };
      return {
        ...state,
        index: state.index + 1,
      };
    case "restart":
      const latestHighscore =
        state.currentPoints > state.highscore
          ? state.currentPoints
          : state.highscore;
      return {
        ...initialState,
        highscore: latestHighscore,
        status: "loading",
      };
    default:
      throw new Error("No valid action: " + action.type);
  }
}
