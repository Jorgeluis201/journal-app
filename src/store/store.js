// exportamos el store para ser importado en la parte más alta de mi aplicacion, en este caso en el JournalApp.js

import {createStore,combineReducers, applyMiddleware,compose} from 'redux';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

// importamos esta libreria para usar thunk
import thunk from 'redux-thunk';
import { notesReducer } from '../reducers/notesReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Creamos este reducers, para mandarselo al createStore. El objetivo de esto,
//  es para cuando queramos añadir una nueva funcionalidad a la aplicacion, simplemente la agregamos a reducers, para no refactorizar nada
const reducers = combineReducers({
    // tendre una propiedad llamada auth, que será manejada por authReducer
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})



// Solo recide un reducer nada más, no se le puede mandar varios reducer por defecto
//Esto recibe un reducer, llamamos a reducers
// agregamos este nuevo argumento +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), para configurar nuestro store
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);