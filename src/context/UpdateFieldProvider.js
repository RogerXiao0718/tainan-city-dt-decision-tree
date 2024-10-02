'use client'
import { createContext, useState } from 'react';

export const UpdateFieldContext = createContext(null)

export default function UpdateFieldProvider({children}) {

    const [updateField, setUpdateField] = useState({
        departments: [],
        domain: [],
        doable: false,
        profitable: false,
        publicService: false, 
        sustainable: false,
        deptCollab: false,
        crossCityCollab: false,
        internationalPromote: false
    })

    return (
        <UpdateFieldContext.Provider value={{updateField, setUpdateField}}>
            {children}
        </UpdateFieldContext.Provider>
    )
}