'use client'
import {createContext, useState} from 'react'

export const FilterRuleContext = createContext(null)

export default function FilterRuleContextProvider({children}) {

    const [stringArrayFilterRule, setStringArrayFilterRule] = useState({
        departments: '',
        domain: ''
    })

    return (
        <FilterRuleContext.Provider value={{ stringArrayFilterRule, setStringArrayFilterRule}}>
            {children}
        </FilterRuleContext.Provider>
    )
}