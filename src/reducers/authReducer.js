//aqui manejamos el objeto que vamos a manejar en el state
/*{
    uid:'ajsdajsdjasdjasd',
    name:'Jorge
}
*/
// definimos el state en vacio
//Manejamos un reducer

import { types } from "../types/types";

// es una funcion pura, que recibe dos cosas, un state y el action
export const authReducer = (state ={},action) =>{

    switch ( action.type) {
        // Llamamos el type definido en types/types.js
        case types.login:
            // Retornamos un nuevo objeto que el uid, lo entregara firebase 
            return {
                uid:action.payload.uid,
                name:action.payload.displayName
            }
    
        case types.logout:
        //Retornamos un objeto vacio cuando alguien se logout
            return {
            }
        default:
            return state;
    }

}