'use client'
import {createContext, useEffect, useState} from 'react'

export const ProposalListContext = createContext(null)
export const initialDecisionOrder = [
    {
        en: 'doable',
        ch: '可行性'
    },
    {
        en: 'profitable',
        ch: '商轉效益'
    },
    {
        en: 'publicService',
        ch: '公共服務'
    },
    {
        en: 'sustainable',
        ch: '永續經營'
    },
    {
        en: 'deptCollab',
        ch: '跨機關合作'
    },
    {
        en: 'crossCityCollab',
        ch: '跨縣市合作'
    },
    {
        en: 'internationalPromote',
        ch: '國際推廣'
    }
]

export default function ProposalListProvider({children}) {
    const [initialProposal, setInitialProposal] = useState(null)
    const [proposalList, setProposalList] = useState(null)
    const [currentProposal, setCurrentProposal] = useState(null)
    const [currentDecisionList, setCurrentDecisionList] = useState(initialDecisionOrder)
    
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
        <ProposalListContext.Provider value={{initialProposal, setInitialProposal, proposalList, setProposalList, currentProposal, setCurrentProposal, currentDecisionList, setCurrentDecisionList}}>
            {children}
        </ProposalListContext.Provider>
    )
}