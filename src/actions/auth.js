// los actions, son simplemente funciones parecidas a los helpers
import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui"

import Swal from 'sweetalert2';


// -------------------------------------------------------------------------------------------------------------------------------
// Creamos esta funcion para lanzar funcion asincrona
// Recibe email y password y retorna un callback
export const startLoginEmailPassword =( email,password ) =>{
    return ( dispatch )=>{
        dispatch(startLoading() );
        // Validamos el usuario con la base de datos
        firebase.auth().signInWithEmailAndPassword( email,password )
            .then( ({ user }) => {
                
                dispatch( login( user.uid, user.displayName ));
                dispatch( finishLoading() );
            })
            .catch(e => { 
                dispatch(finishLoading());
                Swal.fire('Error',e.message,'error')
            })      
    }
};



// -------------------------------------------------------------------------------------------------------------------------------
// Creamos una funcion asincrona para comenzar el registro 
export const startRegisterWithEmailPasswordName = ( email, password, name) => {
    // Esto retorna un callback
    return(dispatch)=>{
        // Para autentificar se comienza con firebase.auth() y llamamos la funcion createUserWithEmailAndPassword y recibe los parametros anteriormente señalados
        //  Esto retorna una promesa que resuelver un userCredentia  
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async ({ user }) => {
                
                // funcion para actualizar el displayname
                await user.updateProfile({displayName:name});

                dispatch(
                    login(user.uid,user.displayName)
                )
            })
            .catch( e=>{
                console.log(e)
                Swal.fire('Error',e.message,'error')
            });
    }
};


// -------------------------------------------------------------------------------------------------------------------------------
// Creamos una accion para el logeo de google
export const startGoogleLogin = ()=>{
    // Para las tareas asincronas se coloca el return de un callback
    return (dispatch)=>{
        // utilizamos signInWithPopup() y esto recibe el proveedor que es googleAuthProvider
        // Todo esto retorna una promesa 
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({ user }) =>{
                    dispatch(
                        login(
                            user.uid,
                            user.displayName
                        ))
            })
    }
};


// -------------------------------------------------------------------------------------------------------------------------------
// Creamos un action para el login, que requiere el uid y el displayName.
// Esto es una funcion sincrona
export const login = ( uid,displayName ) => ({
      // retornamos el type correspondiente al login
        type: types.login,
        // retornamos un payload, que sera un objeto que contiene el uid y el displyName
        payload: {
            uid,
            displayName
        }
});



// -------------------------------------------------------------------------------------------------------------------------------
// Esto es asincrono, porque la parte de firebase tengo que dispararla, y ejecutar el logout como una instruccion de firebase que regresa una promesa
// Como esperamos que esto se ejecute, colocamos async
export const startLogout =()=>{
    return async(dispatch)=>{
        // signOut regresa una promesa si se ejecuta correctamente.
        firebase.auth().signOut();
        // hacemos el dispatch de la accion de logout
        dispatch(logout());

    }
}

// Creamos un action sincrono, para llamar al type, logout, que regresa un objeto vacio, que cambia el state.
export const logout = () => ({
    type: types.logout
})