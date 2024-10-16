import { createAction } from "@reduxjs/toolkit";
import { loadUser } from "./UserAction";

// URL de base pour les requêtes API utilisateur
const baseURL = "http://localhost:3001/api/v1/user/";

// Création de l'action pour le succès de la récupération du token
export const getTokenSuccess = createAction("GET_TOKEN_SUCCESS", (token) => ({
  payload: token, // définit le token reçu comme charge utile
}));

// Création de l'action pour une erreur lors de la récupération du token
export const getTokenError = createAction("GET_TOKEN_ERROR", (error) => ({
  payload: error, // stocke l'erreur comme charge utile
}));

// Fonction asynchrone pour charger le token utilisateur
export const loadToken = (email, password, navigate) => async (dispatch) => {
  // Envoie une action indiquant que le token est en cours de récupération
  dispatch(getTokenSuccess({ isGetting: true }));

  try {
    // Envoie une requête POST à l'API pour authentifier l'utilisateur
    const response = await fetch(`${baseURL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // précise le format de la requête
      },
      body: JSON.stringify({ email, password }), // envoie les données de connexion
    });

    // Vérifie si la requête a échoué
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // lève une erreur si la réponse n'est pas correcte
    }

    // Extrait le token de la réponse JSON
    const {
      body: { token },
    } = await response.json();

    // Stocke le token dans le localStorage
    localStorage.setItem("token", token);

    // Envoie une action avec le token récupéré
    dispatch(getTokenSuccess({ token, tokenTrue: true, isGetting: false }));

    // Charge les infos utilisateur via le token récupéré
    await dispatch(loadUser(token));
    
    // Redirige l'utilisateur vers la page utilisateur après authentification
    navigate("/user");
  } catch (error) {
    // En cas d'erreur, envoie une action avec les détails de l'erreur
    dispatch(
      getTokenError({
        error: error.message, // message d'erreur
        isGetting: false, // réinitialise l'indicateur de chargement
        tokenTrue: false, // indique que le token est invalide
      })
    );
  }
};
// createAction : Permet de créer des actions de manière simple, avec un type d'action et une charge utile (payload).

// dispatch : Sert à envoyer des actions à Redux dans le store pour mettre à jour l'état de l'application.

// fetch : Utilisé pour effectuer une requête HTTP (ici, POST) pour authentifier l'utilisateur via une API.

// localStorage : Stocke localement le token pour l'utiliser dans d'autres requêtes API.

// navigate : Redirige l'utilisateur après une authentification réussie.

// En résumé, ce code gère la connexion de l'utilisateur, récupère un token d'authentification et 
// charge les informations utilisateur associées.






// La méthode builder est spécifique à Redux Toolkit, et non à Redux 
// de base. Elle est utilisée dans la fonction createSlice de Redux 
// Toolkit pour gérer les actions asynchrones (thunks) et les reducers. 
// Plus précisément, elle apparaît dans la propriété extraReducers pour 
// gérer les actions créées en dehors du slice, comme celles provenant 
// de thunks avec createAsyncThunk.

// Redux de base ne possède pas de méthode builder; c'est une 
// abstraction de Redux Toolkit qui simplifie et structure la gestion 
// de Redux.






// Vous avez dit :
// explique moi l'utlisation du store, des reducers et action. le sens logique de loeurs utilisation
// ChatGPT a dit :

// En Redux, l'architecture est basée sur trois concepts clés : le store, les reducers, et les actions. Voici comment ils s'articulent logiquement :

// 1. Store
// Le store est l'endroit où l'état global de l'application est centralisé. Il agit comme une source unique de vérité, 
// ce qui signifie que tous les composants de votre application peuvent accéder au même état centralisé. Le store est créé 
// à l’aide de createStore (dans Redux de base) ou configureStore (dans Redux Toolkit), et c’est ici que vous liez les reducers.

// 2. Actions
// Les actions sont des objets simples qui décrivent un événement ou une intention de modification de l'état. 
// Une action contient généralement un type (qui décrit l'action à effectuer) et un payload (qui contient 
//   les données nécessaires à cette action). Par exemple, une action peut ressembler à :

// javascript
// Copier le code
// { type: 'ADD_TODO', payload: { text: 'Learn Redux' } }
// Les actions sont dispatchées (envoyées) vers le store pour signaler qu’une modification de l’état doit avoir lieu.

// 3. Reducers
// Les reducers sont des fonctions pures qui reçoivent l'état actuel et une action, puis retournent un nouvel état. 
// Ils agissent comme des gestionnaires d’état : en fonction du type d’action reçu, ils décident comment l'état doit être modifié. 
// Un reducer peut ressembler à ceci :

// javascript
// Copier le code
// const todoReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'ADD_TODO':
//             return [...state, action.payload];
//         default:
//             return state;
//     }
// };
// Chaque modification de l'état dans Redux passe par un reducer, qui est responsable d’assurer que le nouvel état est une transformation 
// correcte de l’ancien état.

// Logique de leur Utilisation Ensemble
// Dispatch d'une Action : Lorsqu'un utilisateur effectue une action (comme cliquer sur un bouton), une action est dispatchée vers le store.
// Reducer & Mise à jour de l'état : Le store envoie cette action au reducer approprié. Le reducer utilise cette action pour déterminer 
// comment l’état doit changer, et retourne un nouvel état.
// Mise à jour du Store : Le store enregistre cet état mis à jour et informe tous les composants connectés, qui pourront mettre à jour 
// leur affichage en conséquence.
// Ce cycle permet de maintenir une gestion d'état prévisible, centralisée et immuable, ce qui est particulièrement 
// utile pour des applications de grande envergure.

// Si vous avez besoin d'une illustration ou d'un exemple pratique, je suis là pour aider !
