import { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";

const App = () => {
   // Utilisation du contexte pour accéder à l'état global de l'application
   const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

   useEffect(() => {
      // Utilisation de useEffect pour effectuer une action après le rendu initial
      const fetchUser = async () => {
         // Fonction asynchrone pour récupérer les informations de l'utilisateur depuis le serveur
         try {
            // Tentative de récupération des informations de l'utilisateur
            const response = await axios.get(
               "",
               {
                  withCredentials: true, // Utilisation des cookies pour maintenir la session de l'utilisateur
               }
            );
            // Mise à jour des informations de l'utilisateur dans le contexte
            setUser(response.data.user);
            // Indication que l'utilisateur est autorisé
            setIsAuthorized(true);
         } catch (error) {
            // Gestion des erreurs en cas d'échec de récupération des informations de l'utilisateur
            setIsAuthorized(false); // Indication que l'utilisateur n'est pas autorisé
         }
      };
      fetchUser(); // Appel de la fonction fetchUser pour récupérer les informations de l'utilisateur lors du montage du composant
   }, [isAuthorized, setIsAuthorized, setUser]); // Include missing dependencies 'setIsAuthorized' and 'setUser' in the dependency array

   return (
      <>
         <BrowserRouter> {/* Déclaration du BrowserRouter pour gérer la navigation */}
            <Navbar /> {/* Affichage du composant Navbar */}
            <Routes> {/* Définition des routes de l'application */}
               <Route path="/login" element={<Login />} /> {/* Route vers le composant Login */}
               <Route path="/register" element={<Register />} /> {/* Route vers le composant Register */}
               <Route path="/" element={<Home />} /> {/* Route vers le composant Home */}
            </Routes>
            <Footer /> {/* Affichage du composant Footer */}
            <Toaster /> {/* Affichage du composant Toaster pour les notifications */}
         </BrowserRouter>
      </>
   );
};

export default App;
