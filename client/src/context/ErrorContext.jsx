import { createContext, useContext, useState, useCallback } from "react";
import ErrorModal from "../components/ErrorModal/ErrorModal";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const showError = useCallback((message) => {
    setErrorMessage(message);
    setIsOpen(true);
  }, []);

  const hideError = useCallback(() => {
    setIsOpen(false);
    setErrorMessage(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <ErrorModal error={errorMessage} onClose={hideError} isOpen={isOpen} />
    </ErrorContext.Provider>
  );
};

export const useGlobalError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useGlobalError must be used within an ErrorProvider");
  }
  return context;
};
