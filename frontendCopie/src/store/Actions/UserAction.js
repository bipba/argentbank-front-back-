import { createAction } from '@reduxjs/toolkit';  // Importation de la fonction createAction depuis Redux Toolkit

// Définition de l'URL de base pour les appels API vers le backend
const baseURL = 'http://localhost:3001/api/v1/user/';

// Création des actions avec Redux Toolkit, qui génèrent des objets d'action avec un type spécifique et un payload

// Action envoyée lorsque la récupération des infos utilisateur réussit
export const getUserSuccess = createAction('GET_USER_SUCCESS', (user) => ({ payload: user }));

// Action envoyée lorsqu'il y a une erreur lors de la récupération des infos utilisateur
export const getUserError = createAction('GET_USER_ERROR', (error) => ({ payload: error }));

// Action envoyée pour déconnecter un utilisateur
export const logout = createAction('LOGOUT_USER');

// Action envoyée lorsqu'une modification des infos utilisateur démarre (par exemple, modification du nom d'utilisateur)
export const editUser = createAction('EDIT_USER');

// Action envoyée lorsque la modification des infos utilisateur réussit
export const editUserSuccess = createAction('EDIT_USER_SUCCESS', (user) => ({ payload: user }));

// Action envoyée lorsqu'il y a une erreur lors de la modification des infos utilisateur
export const editUserError = createAction('EDIT_USER_ERROR', (error) => ({ payload: error }));

// Thunk pour charger les informations de l'utilisateur
// Le thunk permet d'effectuer une action asynchrone, comme un appel API, avant d'envoyer les actions success/fail
export const loadUser = (token) => async (dispatch) => {
  // Dispatch d'une action pour indiquer que le chargement des infos utilisateur commence (ici, isLoading est à true)
  dispatch(getUserSuccess({ isLoading: true }));

  try {
    // Appel API pour récupérer les informations de l'utilisateur à partir du token d'authentification
    const response = await fetch(`${baseURL}profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Indique que les données envoyées sont au format JSON
        'Authorization': `Bearer ${token}`,  // Utilisation du token pour l'autorisation
      },
    });

    // Vérification de la réponse, si elle n'est pas OK (par exemple, statut HTTP 400 ou 500), une erreur est lancée
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Conversion de la réponse en JSON (le backend retourne probablement les infos utilisateur)
    const data = await response.json();

    // Dispatch de l'action de succès avec les données utilisateur récupérées et le statut "connecté"
    dispatch(getUserSuccess({ user: data, isLoading: false, isLoggedIn: true }));

    // Retourne les données utilisateur (optionnel selon ton besoin dans l'appel du thunk)
    return data;
  } catch (error) {
    // En cas d'erreur, dispatch de l'action d'erreur avec le message d'erreur et mise à jour de l'état pour indiquer l'échec de connexion
    dispatch(getUserError({ error: error.message, isLoading: false, isLoggedIn: false }));
    
    // Propagation de l'erreur pour permettre de la gérer ailleurs si besoin
    throw error;
  }
};

// Thunk pour modifier le nom d'utilisateur
// Comme le précédent, il effectue une action asynchrone (mise à jour des infos utilisateur via API)
export const EditUser = (userName) => async (dispatch) => {
  // Récupération du token d'authentification stocké dans le localStorage
  const token = localStorage.getItem('token');

  // Dispatch d'une action pour indiquer que la modification d'utilisateur commence
  dispatch(editUser());

  try {
    // Appel API pour modifier les informations de l'utilisateur
    const response = await fetch(`${baseURL}profile`, {
      method: 'PUT',  // Méthode PUT utilisée pour modifier des données existantes
      headers: {
        'Content-Type': 'application/json',  // Les données sont envoyées en JSON
        'Authorization': `Bearer ${token}`,  // Le token est ajouté aux headers pour l'autorisation
      },
      body: JSON.stringify({ userName }),  // Envoi du nouveau nom d'utilisateur dans le corps de la requête
    });

    // Vérification de la réponse, une erreur est lancée si le statut de la réponse n'est pas OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Si l'appel API réussit, on récupère les nouvelles informations de l'utilisateur
    const data = await response.json();

    // Dispatch de l'action indiquant que la modification a réussi avec les nouvelles données utilisateur
    dispatch(editUserSuccess(data));

    // Rechargement des informations de l'utilisateur pour s'assurer que l'état est à jour
    dispatch(loadUser(token));
  } catch (error) {
    // En cas d'erreur, dispatch de l'action d'erreur avec le message d'erreur
    dispatch(editUserError(error.message));
  }
};
