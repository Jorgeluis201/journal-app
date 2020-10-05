
// Creamos types para utilizarlo en authReducer, que es el que utiliza un Reducer.

export const types={
    login: '[auth] Login',
    logout:'[auth] Logout',

    // 
    uiSetError:'[UI] Set Error',
    uiRemoveError:'[UI] Remove Error',

    // 1.Creamos los types
    uiStartLoading:'[UI] Start Loading',
    uiFinishLoading:'[UI] Finish Loading',

    // Creamos types para el noteReducer

    notesAddNew: '[Notes] New Notes',
    notesActive: '[Notes] Set Active Notes',
    notesLoad: '[Notes] Load Notes',
    notesUpdated:' [Notes] Update Note Saved',
    notesFileUrl: '[Notes] Update image url',
    notesDelete: '[Notes] Delete notes',
    notesLogoutCleaning: '[Notes] Delete note',
}