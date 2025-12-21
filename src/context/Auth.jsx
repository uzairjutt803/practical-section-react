import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext();

const initialState = {
  isAuth: false,
  user: null,
};

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const readProfile = useCallback(() => {
    try {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        setState({
          isAuth: true,
          user: JSON.parse(currentUser),
        });
      } else {
        setState(initialState);
      }
    } catch (error) {
      console.error(error);
      setState(initialState);
    } finally {
      setTimeout(() => {
        setIsAppLoading(false);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    readProfile();
  }, [readProfile]);

  const loginUser = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setState({
      isAuth: true,
      user: userData,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setState(initialState);
    window.notify("Logout successful", "success");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        handleLogout,
        isAppLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
