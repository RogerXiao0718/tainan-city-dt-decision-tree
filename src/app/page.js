/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import styles from "./page.module.css"
import Image from "next/image"
import ProposalItem from '@/components/ProposalItem'
import DetailInfoContainer from '@/components/DetailInfoContainer'
import FilterContainer from '@/components/FilterContainer'
import { useState } from 'react'

export default function Home() {

    const proposal_list = [
        {
            name: '博物展館三維建模結合室內展覽VR體驗',
            departments: ['文化局'],
            domain: ['文化', '觀光', '旅遊'],
            doable: {
                value: true,
                note: ''
            },
            profitable: {
                value: true,
                note: ''
            },
            publicService: {
                value: false,
                note: ''
            },
            sustainable: {
                value: true,
                note: ''
            },
            deptCollab: {
                value: true,
                note: ''
            },
            crossCityCollab: {
                value: false,
                note: ''
            },
            internationalPromote: {
                value: false,
                note: ''
            }

        },
        {
            name: '數位雙生輔助線上觀光並輔助古蹟修繕',
            departments: ['文化局'],
            domain: ['文化', '觀光', '旅遊'],
            doable: {
                value: false,
                note: ''
            },
            profitable: {
                value: true,
                note: ''
            },
            publicService: {
                value: false,
                note: ''
            },
            sustainable: {
                value: true,
                note: ''
            },
            deptCollab: {
                value: true,
                note: ''
            },
            crossCityCollab: {
                value: false,
                note: ''
            },
            internationalPromote: {
                value: false,
                note: ''
            }

        },
        {
            name: '商圈及老街建模結合VR環遊服務',
            departments: ['觀光旅遊局'],
            domain: ['文化', '觀光', '旅遊', '電商'],
            doable: {
                value: true,
                note: ''
            },
            profitable: {
                value: true,
                note: ''
            },
            publicService: {
                value: false,
                note: ''
            },
            sustainable: {
                value: true,
                note: ''
            },
            deptCollab: {
                value: true,
                note: ''
            },
            crossCityCollab: {
                value: false,
                note: ''
            },
            internationalPromote: {
                value: false,
                note: ''
            }

        }
    ]

    const [currentProposal, setCurrentProposal] = useState(null)
    const [displayFilter, setDisplayFilter] = useState(false)

    function onFilterImageClicked() {
        setDisplayFilter(!displayFilter)
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
                        <Image  className={`${styles['filter-image']}`} src='/images/filter.png' onClick={onFilterImageClicked} width={30} height={30} alt='filter' />
                    </div>
                </div>
                <FilterContainer />
                <div className={`${styles['proposal-items-container']}`}>
                    {
                        proposal_list.map(
                            (proposal, index) => {
                                return (
                                    <ProposalItem key={index} {...proposal} index={index} setCurrentProposal={setCurrentProposal} />
                                )
                            }
                        )
                    }
                </div>
            </div>
            <div className={`${styles['detail-info-section']}`}>
                <DetailInfoContainer currentProposal={currentProposal !== null ? proposal_list[currentProposal] : null} />
            </div>
        </div>
    );
}
