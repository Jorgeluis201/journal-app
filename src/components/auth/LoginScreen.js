import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import {  startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { setError } from '../../actions/ui'

export const LoginScreen = () => {

    // Creamos una variable con el hook useDispatch para usarlo en el handleLogin
    const dispatch =useDispatch();
    // del state, obtenemos el ui, desestructuramos para obtener el loading.
    const { loading } = useSelector( state => state.ui );

    const [ formValues,handleInputChange ] =useForm({
       email:'thomas2021@gmail.com',
       password:'1234567'
   }) 
   const { email,password } = formValues;

//    Obtenemmos el mensaje de error del estado, utilizando useSelector y seleccionando state.ui, donde se encuentra el mensaje de error.
   const { msgError  } = useSelector(state => state.ui)
   

   
   

   //no recibimos nada
   //llamamos el handleLogin cuando alguien toca el form o el boton
   const handleLogin = (e)=>{
        e.preventDefault();
        // Para generar el dispatch, usamos un hook de react-redux
        dispatch( startLoginEmailPassword( email,password ) );
   }



    //Disparamos la accion de startGoogleLogin
    const handleGoogleLogin = ()=>{
        
        if(isValid){
           dispatch(startGoogleLogin());
        }
    }


//    Validar entradas de los input
   const isValid =()=>{
       if(email.trim().length === 0 ){
            dispatch(setError('Email is required'))
            return false;
       }else if(password.trim().length === 0 ) {
            dispatch(setError('Password is required'))
            return false;
       }
       return true
   }
   
    return (
        <>
            <h3 className="auth__title"> Login </h3>
            {/* Validamos que el mensaje de error exista o no
            Si existe, se renderiza el la etiqueta div, con la alerta correspondiente, sino, no se muestra nada. */}
            { 
                msgError && 
                (
                    <div className='auth__alert-error'>
                        { msgError }
                    </div>
                )
             }

            <form onSubmit={ handleLogin }>
                <input 
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                >
                </input>

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange= { handleInputChange }
                >
                </input>

                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >

                    Login
                </button>

                <hr/>
                <div className="auth__social-networks">
                    <p>Login with social network</p>

                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin}
                    >
                        
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>

                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>  

                    <Link 
                        to="/auth/register"
                    >
                        Create new account
                    </Link>    
                </div>
            </form>
        </>
    )
}
