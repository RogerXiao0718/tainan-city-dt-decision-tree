import styles from './UpdateProposalContainer.module.css'
import ToggleButton from '@/components/ToggleButton'
import { useContext, useEffect, useState } from 'react'
import { deptOptionList, domainOptionList } from './FilterContainer'
// import { UpdateFieldContext } from '@/context/UpdateFieldProvider'
import { UIStateContext } from '@/context/UIStateProvider'
import { ProposalListContext } from '@/context/ProposalListProvider'

// Todo: 新增相關機關、應用領域欄位
// Todo: 實作Submit更新initialProposal

export default function UpdateProposalContainer({ currentProposal }) {

    // const {updateField, setUpdateField} = useContext(UpdateFieldContext)
    const { setInitialProposal, updateField, setUpdateField } = useContext(ProposalListContext)
    const { setUIState } = useContext(UIStateContext)
    const [selectDepartmentList, setSelectDepartmentList] = useState([])
    const [selectDomainList, setSelectDomainList] = useState([])

    const toggleButtonCallbackGenerator = (name) => {
        return () => {
            setUpdateField(() => {
                const newUpdateField = {...updateField}
                newUpdateField[name] = !updateField[name]
                return newUpdateField
            })
        }
    }

    useEffect(() => {
        if (currentProposal) {
            setUpdateField(() => {
                return {
                    ...currentProposal
                }
            })
            setSelectDepartmentList([...currentProposal.departments])
            setSelectDomainList([...currentProposal.domain])
        }

    }, [currentProposal, setSelectDepartmentList, setSelectDomainList, setUpdateField])


    const onDepartmentSelectorChange = (event) => {
        if (event.target.value && !selectDepartmentList.includes(event.target.value)) {
            setSelectDepartmentList(() => {
                return [
                    ...selectDepartmentList,
                    event.target.value
                ]
            })
        }
    }

    const onDepartmentCardClick = (event) => {
        const innerText = event.target.innerHTML
        setSelectDepartmentList([
            ...selectDepartmentList.filter((dept) => dept !== innerText)
        ])
    }

    const onDomainSelectorChange = (event) => {
        if (event.target.value && !selectDomainList.includes(event.target.value)) {
            setSelectDomainList(() => {
                return [
                    ...selectDomainList,
                    event.target.value
                ]
            })
        }
    }

    const onDomainCardClick = (event) => {
        const innerText = event.target.innerHTML;
        setSelectDomainList([
            ...selectDomainList.filter((domain) => domain !== innerText)
        ])
    }

    const onSubmitButtonClick = () => {
        setInitialProposal((initialProposal) => {
            const optionPropNames = ["doable", "profitable", "publicService", "sustainable", "deptCollab", "crossCityCollab", "internationalPromote"]
            const proposalIndex = initialProposal.findIndex(proposal => proposal.name === currentProposal.name)
            const newProposalList = [...initialProposal]
            newProposalList[proposalIndex].departments = selectDepartmentList
            newProposalList[proposalIndex].domain = selectDomainList
            optionPropNames.forEach((option) => {
                newProposalList[proposalIndex][option] = updateField[option]
            })
            return newProposalList
        })
        setUIState((uiState) => {
            return {
                ...uiState,
                currentDisplaySection: 'detail'
            }
        })
    }
    
    return (
        currentProposal && (
            <div className={`${styles['update-proposal-container']}`}>
                <div className={`${styles['update-form-container']}`}>
                    <span className={`${styles['update-form-title']}`}>更新提案</span>
                    <span className={`${styles['proposal-name']}`}>
                        {currentProposal.name}
                    </span>
                    <div className={`${styles['selector-row-container']}`}>
                        <span className={`${styles['selector-label']}`}>相關機關: </span>
                        <select className={`${styles['selector']}`} onChange={onDepartmentSelectorChange}>
                            {
                                deptOptionList.map((deptName, index) => {
                                    return (
                                        <option key={index} value={deptName}>{deptName}</option>
                                    )
                                })
                            }
                        </select>
                        <div className={`${styles['department-card-container']}`}>
                        {selectDepartmentList.map((dept, index) => {
                            return (
                                <span key={index} className={`${styles['department-card']}`} onClick={onDepartmentCardClick}>
                                    {dept}
                                </span>
                            )
                        })}
                        </div>
                    </div>
                    <div className={`${styles['selector-row-container']}`}>
                        <span className={`${styles['selector-label']}`}>應用領域: </span>
                        <select className={`${styles['selector']}`} onChange={onDomainSelectorChange}>
                            {
                                domainOptionList.map((domain, index) => {
                                    return (
                                        <option key={index} value={domain}>{domain}</option>
                                    )
                                })
                            }
                        </select>
                        <div className={`${styles['department-card-container']}`}>
                        {selectDomainList.map((domain, index) => {
                            return (
                                <span key={index} className={`${styles['department-card']}`} onClick={onDomainCardClick}>
                                    {domain}
                                </span>
                            )
                        })}
                        </div>
                    </div>
                    <div className={`${styles['options-container']}`}>
                        <div className={`${styles['options-row']}`}>
                            <div className={`${styles['toggle-button-container']}`}>
                                <span>可行性: </span>
                                <ToggleButton callback={toggleButtonCallbackGenerator('doable')} toggled={updateField['doable']} />
                            </div>
                            <div className={`${styles['toggle-button-container']}`}>
                                <span>商轉效益: </span>
                                <ToggleButton callback={toggleButtonCallbackGenerator('profitable')} toggled={updateField['profitable']}/>
                            </div>
                        </div>
                        <div className={`${styles['options-row']}`}>
                            <div className={`${styles['toggle-button-container']}`}>
                                <span>公共服務: </span>
                                <ToggleButton callback={toggleButtonCallbackGenerator('publicService')} toggled={updateField['publicService']} />
                            </div>
                            <div className={`${styles['toggle-button-container']}`}>
                                <span>永續經營: </span>
                                <ToggleButton callback={toggleButtonCallbackGenerator('sustainable')} toggled={updateField['sustainable']}/>
                            </div>
                        </div>
                        <div className={`${styles['options-row']}`}>
                            <div className={`${styles['toggle-button-container']}`}>
                                <span>跨機關合作: </span>
                                <ToggleButton callback={toggleButtonCallbackGenerator('deptCollab')} toggled={updateField['deptCollab']} />
                            </div>
                            <div className={`${styles['toggle-button-container']}`}>
                                <span>跨縣市合作: </span>
                                <ToggleButton callback={toggleButtonCallbackGenerator('crossCityCollab')} toggled={updateField['crossCityCollab']}/>
                            </div>
                        </div>
                        <div className={`${styles['options-row']}`}>
                            <div className={`${styles['toggle-button-container']}`}>
                                <span>國際推廣: </span>
                                <ToggleButton callback={toggleButtonCallbackGenerator('internationalPromote')} toggled={updateField['internationalPromote']} />
                            </div>
                            <div className={`${styles['toggle-button-container']}`}>
                                
                            </div>
                        </div>
                        <div className={`${styles['proposal-submit-container']}`}>
                            <button className={`${styles['submit-button']}`} onClick={onSubmitButtonClick} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}