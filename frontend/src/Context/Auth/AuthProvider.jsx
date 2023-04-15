import { useState } from "react";
import Context from "./index";

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, settoken] = useState(localStorage.getItem("token"));

  function updateUser(user) {
    setuser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function updateAuth(token, user) {
    setuser(user);
    settoken(token);
    if (user == null) {
      localStorage.clear();
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }

  return (
    <Context.Provider
      value={{
        user,
        token,
        updateAuth: updateAuth,
        updateUser: updateUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
