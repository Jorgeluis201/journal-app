import React from 'react'
import { AppRouter } from './routers/AppRouter'

// este provider cumple la misma funcion que el context, que provee cierta informacion a toda la aplicacion
// Esto es un HighOrderComponent
import { Provider } from 'react-redux'
import { store } from './store/store'


export const JournalApp = () => {
    
    return (
        // Llamamos el HOC para usar el store
        <Provider store={ store }>
            <AppRouter/>
        </Provider>
    )
}
