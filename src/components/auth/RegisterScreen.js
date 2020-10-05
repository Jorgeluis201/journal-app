import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    // usamos este hook que recibe un callback, que es un state
    // Utilizamos useSelector para obtener el msjError del state.
    const { msgError } = useSelector(state => state.ui)

   

    const [ formValues,handleInputChange ] = useForm({
        name:'thomas Barrera',
        email:'thomas2021@gmail.com',
        password:'1234567',
        password2:'1234567'
})

    const { name,email,password,password2 } = formValues;

    const handleRegister = (e)=>{
            e.preventDefault();

        if(isFormValid()){
            // Realizamos el dispatch de la funcion llamada desde auth, esto para crear un registro de usuario
            dispatch(startRegisterWithEmailPasswordName(email,password,name))
        }
    }

    // creamos una funcion, para validar el formulario
    const isFormValid=()=>{
        if(name.trim().length === 0 ){
            dispatch(setError('Name is required'))
            return false;
            
        }else if(
            // usamos la libreria validator, para validar el email
            !validator.isEmail( email )){
                dispatch(setError('Email is incorrect'))
                return false
                
        }else if( password !== password2 || password.length < 5){
            dispatch(setError('Passwod should be at least 6 '))       
            return false;
        }

        dispatch(removeError);
            
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            { 
                msgError && 
                (
                    <div className='auth__alert-error'>
                        { msgError }
                    </div>
                )
             }

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="auth__input"
                    value={ name }
                    onChange={handleInputChange}
                >
                </input>

                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                >
                </input>

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                >
                </input>

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                >
                </input>

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link
                    to="/auth/login" 
                    className="link"
                >
                    Already registered?
                </Link>
                
            </form>
        </>
    )
}
