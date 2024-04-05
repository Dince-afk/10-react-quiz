function Error({ children }) {
  return (
    <p className="error">
      <span>💥</span> {children}
    </p>
  );
}

export default Error;
