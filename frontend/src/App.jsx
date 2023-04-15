import React from "react";
import Routers from "./Routes";
import { AuthProvider } from "./Context/Auth/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </>
  );
}

export default App;
