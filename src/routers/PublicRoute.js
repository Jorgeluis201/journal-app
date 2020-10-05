//Convertimos las rutas en privadas.

import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

// recibiremos una propiedad llamada isLoggedIn, para saber si esta autentificado o n
// Recibiremos un componente
// usaremos el operador ...rest, para todos los demas argumentos y seran almacenados.
export const PublicRoute = ({
     isLoggedIn,
    component:Component,
    ...rest
}) => {
    
    // retornaremos un route, donde va a tener esa ruta, primero, todo el resto de propiedades { ...rest }
    // retornaremos el componente de manera condicional
    //Verificamos si el usuario esta autentificado, si lo esta, se retorna al componente, sino, se retornará al login
    return (
        <Route { ...rest } 
            component = { (props) => (
                ( !isLoggedIn ) 
                    ? (<Component { ...props } />) 
                    : ( <Redirect to="/"/>)
            )}
        />       
    )
}

PublicRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
