import {useState, useContext } from 'react'; // Importation de useState pour gérer l'état local
import { Link, Navigate } from 'react-router-dom'; // Importation de Link et Navigate pour la navigation dans React Router
import axios from 'axios'; // Importation du module axios pour effectuer des requêtes HTTP
import toast from 'react-hot-toast'; // Importation du composant toast de la bibliothèque react-hot-toast pour afficher des notifications
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Context } from '../../main'; // Importation du contexte principal

const Register = () => {
    const [email, setEmail] = useState(''); // État local pour stocker l'e-mail de l'utilisateur
    const [password, setPassword] = useState(''); // État local pour stocker le mot de passe de l'utilisateur
    const [phone, setPhone] = useState(''); // État local pour stocker le numéro de téléphone de l'utilisateur
    const [name, setName] = useState(''); // État local pour stocker le nom de l'utilisateur
    const [role, setRole] = useState(''); // État local pour stocker le rôle de l'utilisateur

    const { isAuthorized, setIsAuthorized } = useContext(Context); // Utilisation du hook useContext pour accéder au contexte de l'application

    const handleRegister = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut de l'événement
        try {
            const { data } = await axios.post( // Requête HTTP POST pour enregistrer l'utilisateur
                'http://localhost:4000/api/v1/auth/register', // URL de l'API pour l'enregistrement de l'utilisateur
                { name, email, password, phone, role }, // Données à envoyer avec la requête
                {
                    headers: { 'Content-Type': 'application/json' }, // En-têtes de la requête
                    withCredentials: true, // Utilisation des cookies pour maintenir la session de l'utilisateur
                }
            );
            toast.success(data.message); // Affichage d'un message de succès à l'aide du composant toast lorsque l'enregistrement réussit
            setName(''); // Réinitialisation du nom
            setEmail(''); // Réinitialisation de l'e-mail
            setPhone(''); // Réinitialisation du numéro de téléphone
            setRole(''); // Réinitialisation du rôle
            setPassword(''); // Réinitialisation du mot de passe
            setIsAuthorized(true); // Mise à jour de l'état d'autorisation pour indiquer que l'utilisateur est autorisé
        } catch (error) {
            toast.error(error.response.data.message); // Affichage d'un message d'erreur à l'aide du composant toast lorsque l'enregistrement échoue
        }
    };

   /* if (isAuthorized) { // Si l'utilisateur est déjà autorisé, rediriger vers la page d'accueil
        return <Navigate to="/" />;
    }*/

    return (
        <>
            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="#" alt="logo" /> {/* Remplacer src="#" par l'URL de votre logo */}
                        <h3>Créer un nouveau compte</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <label>S&apos;inscrire en tant que</label>
                            <div>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Sélectionnez le rôle</option>
                                    <option value="Employeur">Employeur</option>
                                    <option value="Demandeur d&apos;emploi">Demandeur d&apos;emploi</option>
                                </select>
                                <FaRegUser />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Nom</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Farah"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <FaPencilAlt />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Adresse e-mail</label>
                            <div>
                                <input
                                    type="email"
                                    placeholder="farahr2001@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MdOutlineMailOutline />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Numéro de téléphone</label>
                            <div>
                                <input
                                    type="number"
                                    placeholder="12345678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <FaPhoneFlip />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Mot de passe</label>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <RiLock2Fill />
                            </div>
                        </div>
                        <button type="submit" onClick={handleRegister}>
                            S&apos;inscrire
                        </button>
                        <Link to="/login">Se connecter maintenant</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="#" alt="register" /> {/* Remplacer src="/register.png" par l'URL de votre image de banner */}
                    </div>
            </section>
        </>
    );
};

export default Register;
