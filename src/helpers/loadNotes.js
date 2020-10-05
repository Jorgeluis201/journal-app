// Cargar notas de un usuario.
// Necesitamos el uid para cargar solo los de ese usuario.
import { db } from "../firebase/firebase-config"

export const loadNotes = async( uid ) => {

    // Llamamos la referencia de la base de datos, luego hacemos referencia a una collection, señalando el path
    // Para obtener la informacion, usamos la funcion llamada get(), esto es una promesa que resuelve la coleccion
    // El resultado lo guardados en la constante notesSnap
    // Convertimos esta funcion, a asyncrona, para que se espere que se resuelva lo de abajo.
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    // Si noteSnap no resuelve nada, se retorna la constante notes.
    const notes=[];



    // Lo que tenemos en notesSnap, es un snapshot, no es el arreglo directamente.
    // Generaremos un nuevo arreglo y guardarlo en notes.
    // forEach es una instruccion para sacar informacion que esta dentro de la colletion
    // dentro del forEach, tendremos un snaphijo, que es un snapshot del documento hijo, que se encuentra dentro de la coleccion.
    notesSnap.forEach( snapHijo => {
    
        // añadir un nuevo elemento que tendra como id, el snapHijo.id.
        // y el body, sera el snaphijo.data.
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    return notes;
}

// loadNotes es llamado cuando obtenemos el uid, en el appRouter, que es el primer lugar donde obtenemos el uid