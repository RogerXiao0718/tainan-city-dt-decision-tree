'use client'
import { createContext, useEffect, useState } from 'react'
// import cloneDeep from '@/utils/cloneDeep'

export const ProposalListContext = createContext(null)
// export const initialDecisionOrder = [
//     {
//         en: 'doable',
//         ch: '可行性'
//     },
//     {
//         en: 'profitable',
//         ch: '商轉效益'
//     },
//     {
//         en: 'publicService',
//         ch: '公共服務'
//     },
//     {
//         en: 'sustainable',
//         ch: '永續經營'
//     },
//     {
//         en: 'deptCollab',
//         ch: '跨機關合作'
//     },
//     {
//         en: 'crossCityCollab',
//         ch: '跨縣市合作'
//     },
//     {
//         en: 'internationalPromote',
//         ch: '國際推廣'
//     }
// ]

export default function ProposalListProvider({ children }) {
    const [initialProposal, setInitialProposal] = useState(null)
    const [proposalList, setProposalList] = useState(null)
    const [currentProposal, setCurrentProposal] = useState(null)
    const [currentDecisionList, setCurrentDecisionList] = useState(null)
    const [initialDecisionOrder, setInitialDecisionOrder] = useState(null)
    

    const proposalURL = '/data/proposalList.json'
    useEffect(() => {
        fetch(proposalURL)
            .then(response => response.json())
            .then(data => {
                setInitialProposal(data)
                setProposalList(data)
                let decisionList = Object.keys(data[0]).filter(
                    dataKey => {
                        if (dataKey !== "name" && dataKey !== "departments" && dataKey !== "domain") {
                            return true
                        } else {
                            return false;
                        }
                    }
                )
                setCurrentDecisionList(decisionList)
                setInitialDecisionOrder(decisionList)
            })
    }, [])

    return (
        <ProposalListContext.Provider value={{ initialProposal, setInitialProposal, proposalList, setProposalList, currentProposal, setCurrentProposal, currentDecisionList, setCurrentDecisionList, initialDecisionOrder, setInitialDecisionOrder }}>
            {children}
        </ProposalListContext.Provider>
    )
}