/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import styles from "./page.module.css"
import Image from "next/image"
import ProposalItem from '@/components/ProposalItem'
import DetailInfoContainer from '@/components/DetailInfoContainer'
import FilterContainer from '@/components/FilterContainer'
import LoadingBouncer from '@/components/LoadingBouncer'
import { useState, useEffect, useContext } from 'react'
import { FilterRuleContext } from '@/context/FilterRuleProvider'
import { ProposalListContext} from '@/context/ProposalListProvider'
import DecisionTree from '@/components/DecisionTree'
import Draggable from "react-draggable"


export default function Home() {
    const [currentProposal, setCurrentProposal] = useState(null)
    const [filterUIAppear, setFilterUIAppear] = useState(false)
    const [decisionTreeAppear, setDecisionTreeAppear] = useState(false)
    const { filterRule, setFilterRule, stringArrayFilterRule } = useContext(FilterRuleContext)
    const { proposalList, setProposalList, initialProposal } = useContext(ProposalListContext)
    useEffect(() => {
        console.log('filter effect triggered')
        if (!Object.values(filterRule).every(filterValue => filterValue === false) ||
            !Object.values(stringArrayFilterRule).every(filterValue => filterValue === '')
            ) {
            const filterRuleKeys = Object.keys(filterRule)
            const DropDownFilterRuleKeys = Object.keys(stringArrayFilterRule)
            console.log(filterRuleKeys)
            // apply filter rule to proposal list
            const filtered_proposal = initialProposal.filter((proposal) => {
                let filterResult = true
                for (const filterKey of filterRuleKeys) {
                    if (filterRule[filterKey] === true) {
                        if (proposal[filterKey].value === false) {
                            filterResult = false
                        }
                    }
                }

                // drop down list filter rule
                let dropDownFilterResult = true
                for (const DropDownFilterRuleKey of DropDownFilterRuleKeys) {
                    if (stringArrayFilterRule[DropDownFilterRuleKey] !== '') {
                        if ( !proposal[DropDownFilterRuleKey].includes(stringArrayFilterRule[DropDownFilterRuleKey])) {
                            dropDownFilterResult = false
                        }
                    }
                }
                return filterResult && dropDownFilterResult
            })
            setProposalList([...filtered_proposal])
        } else {
            // reset proposals
            if (initialProposal) {
                setProposalList([...initialProposal])
            }
        }
    }, [filterRule, setProposalList, stringArrayFilterRule])

    function onFilterUIAppearClicked() {
        setFilterUIAppear(!filterUIAppear)
    }

    function onDecisionTreeTagClicked() {
        setDecisionTreeAppear(!decisionTreeAppear)
    }

    return (
        <div className={`${styles['main']}`}>
            <div className={`${styles['proposal-list']}`}>
                <div className={`${styles['proposal-list-header-container']}`}>
                    <div className={`${styles['proposal-header-left']}`}>
                        <Image src='/images/proposal3x.png' width={60} height={60} alt='proposal icon' />
                        <span>各局處提案</span>
                    </div>
                    <div className={`${styles['proposal-header-right']}`}>
                        <Image className={`${styles['filter-image']}`} onClick={onFilterUIAppearClicked} src='/images/filter.png' width={30} height={30} alt='filter' />
                    </div>
                </div>
                <FilterContainer filterUIAppear={filterUIAppear} setFilterUIAppear={setFilterUIAppear} />
                <div className={`${styles['proposal-items-container']}`}>
                    {
                        proposalList ? proposalList.map(
                            (proposal, index) => {
                                return (
                                    <ProposalItem key={index} proposal={proposal} index={index} setCurrentProposal={setCurrentProposal} />
                                )
                            }
                        ) : <LoadingBouncer />
                    }
                </div>
            </div>
            <div className={`${styles['detail-info-section']}`}>
                <DetailInfoContainer currentProposal={currentProposal} />
            </div>
            <div className={`${styles['decision-tree-tag']}`} onClick={onDecisionTreeTagClicked} >
                    <span>提案決策樹</span>
                    {/* <Image src='/images/arrow_back.png' alt="backward arrow" width={24} height={24} /> */}
            </div>
            <div className={`${styles['decision-tree-container']} ${decisionTreeAppear ? styles['decision-tree-container-enabled'] : ''}`}>
            {
                initialProposal && <DecisionTree />
            }
            </div>
        </div>
    );
}
