'use client'
import {createContext, useState} from 'react'

export const FilterRuleContext = createContext(null)

export default function FilterRuleContextProvider({children}) {

    const [filterRule, setFilterRule] = useState({
        doable: false,
        profitable: false,
        publicService: false, 
        sustainable: false,
        deptCollab: false,
        crossCityCollab: false,
        internationalPromote: false
    })

    const [stringArrayFilterRule, setStringArrayFilterRule] = useState({
        departments: '',
        domain: ''
    })

    return (
        <FilterRuleContext.Provider value={{filterRule, setFilterRule, stringArrayFilterRule, setStringArrayFilterRule}}>
            {children}
        </FilterRuleContext.Provider>
    )
}