'use client'
import {createContext, useState} from 'react'

export const UIStateContext = createContext()

const initialUIState = {
    currentDisplaySection: 'detail',  // 'detail' | 'decision-tree' | 'update'
}

export default function UIStateProvider({children}) {
    const [uiState, setUIState] = useState(initialUIState)
    return (
        <UIStateContext.Provider value={{uiState, setUIState}}>
            {children}
        </UIStateContext.Provider>
    )
}