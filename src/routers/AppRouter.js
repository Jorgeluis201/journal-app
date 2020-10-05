import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch, Redirect
  } from "react-router-dom";

import { JournalScreen } from '../components/journal/JournalScreen';

import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Hay algo que firebase dice cuando la autentificacion cambia, es una funcion que regresa,
    //  el estado de la autentificacion cambia, ejecutamos un procesidimiento
    // para eso utilizamos useEffect.
    useEffect(() => {
        // onAuthStateChanged, retorna un firebase.Unsuscribe. Esto crea un observable, esto es un tipo de objeto especial,
        // que se puede disparar mas de una vez
        firebase.auth().onAuthStateChanged( async( user )=>{
            // si user.uid existe, pasa al cuerpo del if, "?", esto pregunta si existe o no
            if( user?.uid ){
                // Para lanzar el dispatch, primero debemos importarlo
                dispatch( login( user.uid ,user.displayName ));
                // Si el usuario se autentifica, se cambia el valor de isLoggedIn a true.
                setIsLoggedIn( true );
  
                dispatch( startLoadingNotes( user.uid ));

            } else {
                setIsLoggedIn(false);
            }
            
            setChecking(false)
        }) ;
    }, [dispatch,setChecking ]);

    if(checking){
        return(
                <h1>Espere...</h1>
        )       
    }



    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isLoggedIn={ isLoggedIn }
                    />

                    <PrivateRoute
                        exact 
                        path="/"
                        component={ JournalScreen }
                        isLoggedIn={ isLoggedIn }
                    />

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
        
    )
}
