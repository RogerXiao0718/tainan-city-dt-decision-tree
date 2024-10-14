'use client'
import {createContext, useState} from "react"
import cloneDeep from "@/utils/cloneDeep"

export const CreateProposalContext = createContext(null)

export const initialProposalCreation = {
    "name": "",
    "departments": [],
    "domain": [],
    "doable": {
        "value": false,
        "note": ""
    },
    "profitable": {
        "value": false,
        "note": ""
    },
    "publicService": {
        "value": false,
        "note": ""
    },
    "sustainable": {
        "value": false,
        "note": ""
    },
    "deptCollab": {
        "value": false,
        "note": ""
    },
    "crossCityCollab": {
        "value": false,
        "note": ""
    },
    "internationalPromote": {
        "value": false,
        "note": ""
    }
}

export default function CreateProposalProvider({ children }) {

    const [proposalCreation, setProposalCreation] = useState(cloneDeep(initialProposalCreation))

    return (
        <CreateProposalContext.Provider value={{proposalCreation, setProposalCreation}}>
            {children}
        </CreateProposalContext.Provider>
    )
}