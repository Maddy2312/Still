import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../services/auth.api.js";
import { setUser } from "../state/auth.slice.js";

const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userData) => {
    try {
      const data = await registerUser(userData);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (userData) => {
    try {
      const data = await loginUser(userData);
      dispatch(setUser(data.user));
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  return {
    handleRegister,
    handleLogin
  };
};

export default useAuth;
