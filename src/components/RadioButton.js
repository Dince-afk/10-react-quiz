function RadioButton({ children, difficultyLevel, dispatch }) {
  const isSelected = children.toLowerCase() === difficultyLevel.toLowerCase();

  return (
    <button
      className={`btn ${isSelected ? "selected" : ""}`}
      value={"easy"}
      onClick={() =>
        dispatch({
          type: "difficultySelected",
          payload: children.toLowerCase(),
        })
      }
    >
      {children}
    </button>
  );
}

export default RadioButton;
