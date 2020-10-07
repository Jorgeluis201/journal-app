// Creamos el action que crea la nueva nota
// Esta es una tarea asincrona
import { types } from "../types/types";
import { db } from "../firebase/firebase-config";
import { loadNotes } from '../helpers/loadNotes';



export const startNewNote = () => {
    // Usamos el segundo argumento, que es una funcion para obtener el state
    return async ( dispatch, getState ) => {
    // Para grabar en fireStore necesitamos el uid del estado
    // Utilizamos gestState para obtener el uid del auth.
    const { uid } = getState().auth;
    // Creamos la nota que queremos grabar
    const newNote = {
        title: 'OLA CARLANGAS',
        body: '',
        // Esto me va a dar el momento exacto que la persona crea la nota.
        date: new Date().getTime()
    }
    // Ocupamos la referencia a la base de datos fireStore, que esta en firebase-config.
    // add: Esto regresa una promesa, entonces usamos await, para que se espere a que se cree la nueva nota. el add resuelve un docRef.
    // 
    const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
    
    // Llamamos la action, y le entregamos el id y la nueva nota.
    //Esto hace el dispatch al reducer 
    dispatch(activeNotes( doc.id, newNote ));

    }
}

// Cuando tenga la informacion, se la mando a mi reducer.
// Esto recibe el id, y recibe la nueva nota
// Y regresa un objeto, con el id y la demas estructura
export const activeNotes=( id, note )=>({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
})

// Esto va a ser una action que dispara otra action, por lo cual va a ser asyncrona
// Este action es para cargar las notes
export const startLoadingNotes = ( uid )=>{ 
    return async(dispatch)=>{
         // Necesito almacenar esto en el store, para eso crearemos un action llamado setNote
         const notes = await loadNotes( uid );
         dispatch( setNotes( notes ));
    }

}

export const setNotes = ( notes ) =>({
    type:types.notesLoad,
    payload:notes
})


export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {
       
        
        const { uid } = getState().auth;
        // Validamos que no exista el url
        if ( !note.url ){
            // Eliminamos la propiedad url, para que no se dispare el error de undefined.
            delete note.url;
            
        }
        //Extraemos todas las propiedades del objeto note y los guardamos en noteToFireStore. 
        const noteToFirestore = { ...note };
        // Borramos el id.
        delete noteToFirestore.id;
        
        
        // Grabamos en la base de datos, utilizando el path y la funcion update
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        

    }
}








