import  { useState, useContext } from 'react'; // Importation de React et de useState pour gérer l'état local
import { Context } from "../../main";
import { useNavigate, Link } from 'react-router-dom'; // Importation de useNavigate pour la navigation dans React Router
import axios from 'axios'; // Importation du module axios pour effectuer des requêtes HTTP
import toast from "react-hot-toast"; // Importation du composant toast de la bibliothèque react-hot-toast pour afficher des notifications
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => { // Définition du composant fonctionnel Navbar
    const [show, setShow] = useState(false); // État local pour gérer l'affichage d'un élément dans la barre de navigation
    const { isAuthorized, setIsAuthorized, user } = useContext(Context); // Utilisation du hook useContext pour accéder au contexte de l'application
    const navigateTo = useNavigate(); // Fonction de navigation fournie par React Router pour naviguer vers différentes pages de l'application

    // Fonction pour gérer la déconnexion de l'utilisateur
    const handleLogout = async () => {
        try {
            const response = await axios.get("", { withCredentials: true }); // Requête HTTP GET pour déconnecter l'utilisateur
            toast.success(response.data.message); // Affichage d'un message de succès à l'aide du composant toast lorsque la déconnexion réussit
            setIsAuthorized(false); // Mise à jour de l'état d'autorisation pour indiquer que l'utilisateur n'est pas autorisé
            navigateTo("/login"); // Redirection vers la page de connexion après la déconnexion
        } catch (error) { // Gestion des erreurs en cas d'échec de la déconnexion
            toast.error(error.response.data.message); // Affichage d'un message d'erreur à l'aide du composant toast lorsque la déconnexion échoue
            setIsAuthorized(true); // Mise à jour de l'état d'autorisation pour indiquer que l'utilisateur est toujours autorisé
        }
    };

    return (
        <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
          <div className="container">
            <div className="logo">
              <img src="#" alt="Logo Emploizy" />
            </div>
            <ul className={!show ? "menu" : "show-menu menu"}>
              <li>
                <Link to={"/"} onClick={() => setShow(false)}>
                  ACCUEIL
                </Link>
              </li>
              <li>
                <Link to={"#"} onClick={() => setShow(false)}>
                  TOUS LES EMPLOIS
                </Link>
              </li>
              <li>
                <Link to={"#"} onClick={() => setShow(false)}>
                  {user && user.role === "Employeur"
                    ? "CANDIDATURES DES CANDIDATS"
                    : "MES CANDIDATURES"}
                </Link>
              </li>
              {user && user.role === "Employeur" ? (
                <>
                  <li>
                    <Link to={"#"} onClick={() => setShow(false)}>
                      PUBLIER UN NOUVEL EMPLOI
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} onClick={() => setShow(false)}>
                      VOIR VOS EMPLOIS
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}

              <button onClick={handleLogout}>SE DÉCONNECTER</button>
            </ul>
            <div className="hamburger">
              <GiHamburgerMenu onClick={() => setShow(!show)} />
            </div>
          </div>
        </nav>
    );
}

export default Navbar;
