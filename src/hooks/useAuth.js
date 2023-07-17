import { useContext,useEffect } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    let context = useContext(AuthContext);
    if (!context) {
        throw new Error("useThemeContext used outside ThemeContext provider");
      }
      useEffect(() => {
          document.body.classList.value = "transition-colors ease-in-out duration-200";
          document.body.classList.add(`theme-${context.theme}`);
      }, [context.theme]);
      return context
}

export default useAuth;