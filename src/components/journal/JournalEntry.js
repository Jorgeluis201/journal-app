import React from 'react'
// Para manejar fechas importaremos la libreria de moment.js comando: npm install moment --save
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNotes } from '../../actions/notes';

export const JournalEntry = ({id,date,title,body,url}) => {

    // guardamos el resultado de la funcion moment, para manipular el valor del date
    const noteDate = moment(date);

    const dispatch = useDispatch();

    const handleEntryClick = ()=>{
        dispatch(
            activeNotes(
                id,{
                    date,
                    title,
                    body,
                    url}
                ));
    }
    
    return (
        <div 
            className="journal__entry pointer"
            onClick={
                handleEntryClick
            }>
            {
                url
                &&

                <div className="journal__entry-picture"
                style={{
                    backgroundSize:'cover',
                    backgroundImage:`url(${ url })`
                }}
            >
            </div>}

            <div className="journal__entry-body">
                <p className="journal__entry-title">{ title }</p>
                <h5 className="journal__entry-content">{ body }</h5>
            </div>
            
            <div className="journal__entry-date-box">
                
                {/* Para mostrar la fecha en el formato deseado, 
                    se llama la variable que contiene la fecha, y 
                    se aplica la funcion formar, que recibe el formato de fecha deseado
                 */}
                <span> {noteDate.format('dddd')}</span>
                
                <h4> { noteDate.format('Do') } </h4>
            </div>
        </div>
    )
}
