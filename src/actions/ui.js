import { types } from "../types/types";

// Generamos los actions que serán utilizados

export const setError = ( err )=>({
  type:types.uiSetError,
  payload: err
})

export const removeError = ( err )=>({
    type:types.uiRemoveError
  })

export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})