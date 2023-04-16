import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ListSociete from "../views/Societe/ListSociete";
import AddSociete from "../views/Societe/AddSociete";
import ViewSociete from "../views/Societe/ViewSociete";
import ListCompteur from "../views/Societe/ListCompteur";
import AddCompteur from "../views/Societe/AddCompteur";
import ViewCompteur from "../views/Societe/ViewCompteur";
import HistoriqueCalcul from "../views/Historique/HistoriqueCalcul";

export const authRoutes = [
  { path: "/login", Component: <Login /> },
  { path: "/register", Component: <SignUp /> },
];
export const routes = [
  { path: "/", Component: <ListSociete /> },
  { path: "/add-societe", Component: <AddSociete /> },
  { path: "/view-societe/:id", Component: <ViewSociete /> },
  { path: "/list-compteur/:id", Component: <ListCompteur /> },
  { path: "/add-compteur/:id", Component: <AddCompteur /> },
  { path: "/view-compteur/:siret/:id", Component: <ViewCompteur /> },
  { path: "/historique-calcul", Component: <HistoriqueCalcul /> },
];
