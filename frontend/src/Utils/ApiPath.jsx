export const LoginApi = "login";
export const RegisterApi = "createCompte";
//Societe
export const getSocieteByCompte = "getSocieteByCompte";
export const ajouterSociete = "ajouterSociete";
export const getSocieteBySiret = "getSocieteBySiret";
//Compteur
export const ajouterCompteurToSociete = "ajouterCompteurToSociete";
export const getListCompteurBySociete = "getListCompteurBySociete";
export const getCompteurBySociete = "getCompteurBySociete";
//Calcul
export const effectuerUnCalcule = "effectuerUnCalcule";
export const getHistoriqueDeCalculeParCompte =
  "getHistoriqueDeCalculeParCompte";
export const getHistoriqueDeCalculeParSociete =
  "getHistoriqueDeCalculeParSociete";

// admin/
// api/ createCompte [name='register']
// api/ login [name='login']
// api/ ajouterSociete [name='Add Societe']
// api/ getSocieteByCompte [name='get Societe By Compte']
// api/ getSocieteBySiret/<str:siret> [name='get Societe By Siret']
// api/ ajouterCompteurToSociete [name='Add Compteur To Societe']
// api/ getListCompteurBySociete/<str:siret> [name='get Compteurs By Siret']
// api/ getCompteurBySociete/<str:siret>/<str:numCompteur> [name='get Compteur By Societe']
// api/ effectuerUnCalcule [name='Price Calculation']
// api/ getHistoriqueDeCalculeParCompte [name='get Calcul history by Compte User']
// api/ getHistoriqueDeCalculeParSociete/<str:siret> [name='get Calcul history by Societe']
