import AddCompteur from "../views/AddCompteur";
import AddSociete from "../views/AddSociete";
import ListSociete from "../views/ListSociete";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

export const authRoutes = [
  { path: "/login", Component: <Login /> },
  { path: "/register", Component: <SignUp /> },
];
export const routes = [
  { path: "/", Component: <ListSociete /> },
  { path: "/add-compteur", Component: <AddCompteur /> },
  { path: "/add-societe", Component: <AddSociete /> },
];
