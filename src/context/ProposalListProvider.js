'use client'
import {createContext, useEffect, useState} from 'react'

export const ProposalListContext = createContext(null)

export default function ProposalListProvider({children}) {
    const [initialProposal, setInitialProposal] = useState(null)
    const [proposalList, setProposalList] = useState(null)
    const [currentProposal, setCurrentProposal] = useState(null)
    const proposalURL = '/data/proposalList.json'
    useEffect(() => {
        fetch(proposalURL)
        .then( response => response.json())
        .then(data => {
            setInitialProposal(data)
            setProposalList(data)
        })
    }, [])

    return (
        <ProposalListContext.Provider value={{initialProposal, proposalList, setProposalList, currentProposal, setCurrentProposal}}>
            {children}
        </ProposalListContext.Provider>
    )
}