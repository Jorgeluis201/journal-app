import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NotesScreen = () => {
    
    
    // Referencia a la nota activa
    const { active:note } = useSelector(state => state.notes )
    
    // El useForm regresa el formValues y el handleInputChange.
    // El useForm recibe el argumento en el cual debe tener los campos del formulario
    // Le mandamos el notes, donde esta la informacion
    const[formValues,handleInputChange,reset] = useForm(note);

    // Extraemos la informacion necesaria del formValues
    const {body,title}=formValues;

    // ejecutar la accion reset solo si el id de la nota es diferente.
    const activeId = useRef(note.id)
    //Actualizamos la nota activa en pantalla.
    
    useEffect(() => {
        
        if(note.id !== activeId.current ){
            reset(note);
            activeId.current = note.id;
        }
            
    }, [note,reset]);
    
    return (
        <div className="notes__main-content">
            <NotesAppBar/>
            <div className="notes__content">
                <input
                    autoComplete="off"
                    type="text"
                    className="notes__title-input"
                    placeholder="Some awesome title"
                    value={title}
                    onChange={handleInputChange}
                >
                </input>
                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    (note.url)
                    &&
                    <div 
                        className="notes__image"
                    >
                        <img 
                            src="https://i.blogs.es/99d036/azir_4/1366_2000.jpg "
                            alt="Azir Reinos en guerra"/>

                    </div>
                }
            </div>
        </div>
    )
}
