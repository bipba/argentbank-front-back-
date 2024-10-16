import { configureStore } from '@reduxjs/toolkit';
import { getUserReducer } from './Reducers/UserReducer';
import { tokenReducer } from './Reducers/TokenReducer';

const store = configureStore({
  reducer: {
    token: tokenReducer,// Associe le reducer du token à une clé "token"
    user: getUserReducer,// Associe le reducer utilisateur à une clé "user"
  },
  devTools : true, // A changer en False pour désactiver le tool dans navigateur
});

export default store;