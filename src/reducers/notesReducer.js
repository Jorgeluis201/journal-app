import { types } from "../types/types";
/*
{
    notes:[],
    active:{
        id:'jaajsjasjj213123',
        title:'',
        body;'',
        imageURL:'',
        date:asdasdasdasdasd
    }
}

*/

const initialState={
    notes:[],
    active:null
}


export const notesReducer = ( state=initialState, action ) => {

    switch (action.type) {

        case types.notesActive:
            // Regresamos un nuevo estado
            // Clonamos el estado anterior con ...state
            // colocamos la nota active
            // active es un objeto, que contiene el action.payload
            return{
                ...state,
                active:{
                    ...action.payload
                }
            }
        
        case types.notesLoad:
            
            return{
                ...state,
                notes: [...action.payload ]
            }
         default:
            return state;
    }
}