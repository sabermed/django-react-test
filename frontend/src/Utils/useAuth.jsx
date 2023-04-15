import { useContext } from "react";
import AuthProvider from "../Context/Auth";

const useAuth = () => {
  return useContext(AuthProvider);
};

export default useAuth;
