import styles from './ProposalCreationContainer.module.css'
import { deptOptionList, domainOptionList } from '@/components/FilterContainer'
import { ProposalListContext } from "@/context/ProposalListProvider"
import { useContext, useMemo, useState } from 'react'
import ToggleButton from '@/components/ToggleButton'
import pairArray from '@/utils/pairArray'

// import { initialDecisionOrder } from '@/context/ProposalListProvider'

export default function ProposalCreationContainer() {

    // const { proposalCreation, setProposalCreation } = useContext(CreateProposalContext)
    const { setInitialProposal, proposalCreation, setProposalCreation, initialProposalCreation, initialDecisionOrder} = useContext(ProposalListContext)
    const { departments, domain } = useMemo(() => {
        return proposalCreation
    }, [proposalCreation])

    const [newProposalName, setNewProposalName] = useState("")
    const [alertMessage, setAlertMessage] = useState("")

    const onProposalNameInputChanged = (event) => {
        setNewProposalName(event.target.value)
    }

    const onDepartmentSelectorChange = (event) => {
        if (event.target.value && !departments.includes(event.target.value)) {
            const newDepartments = [...proposalCreation.departments, event.target.value]
            setProposalCreation(() => {
                return {
                    ...proposalCreation,
                    departments: [...newDepartments]
                }
            })
        }
    }

    const onDepartmentCardClicked = (event) => {
        const innerText = event.target.innerHTML
        const newDepartments = departments.filter((deptName) => {
            return deptName !== innerText
        })
        setProposalCreation(() => {
            return {
                ...proposalCreation,
                departments: [...newDepartments]
            }
        })
    }

    const onDomainSelectorChange = (event) => {
        if (event.target.value && !domain.includes(event.target.value)) {
            const newDomainList = [...domain, event.target.value]
            setProposalCreation(() => {
                return {
                    ...proposalCreation,
                    domain: [...newDomainList]
                }
            })
        }
    }

    const onDomainCardClicked = (event) => {
        const innerText = event.target.innerHTML
        const newDomainList = domain.filter((domainName) => {
            return domainName !== innerText
        })
        setProposalCreation(() => {
            return {
                ...proposalCreation,
                domain: [...newDomainList]
            }
        })
    }

    const toggleButtonCallbackGenerator = (name) => {
        return () => {
            const newProposalCreation = { ...proposalCreation }
            newProposalCreation[name] = !proposalCreation[name]
            setProposalCreation(() => {
                return { ...newProposalCreation }
            })
        }
    }

    const onSubmitButtonClick = () => {
        // check field correctness
        if (newProposalName.trim() === "") {
            setAlertMessage("提案名稱不得空白")
        } else if (departments.length === 0) {
            setAlertMessage("請設定相關機關")
        } else if (domain.length === 0) {
            setAlertMessage("請設定應用領域")
        } else {
            const newProposal = {
                ...proposalCreation,
                name: newProposalName
            }
            console.log(`[Debug]New Proposal`)
            setInitialProposal((initialProposal) => {
                return [...initialProposal, newProposal]
            })
            setNewProposalName("")
            console.log(initialProposalCreation)
            setProposalCreation(() => {

                return { ...initialProposalCreation }
            })
        }
    }

    return (
        <div className={`${styles['proposal-creation-container']}`}>
            <div className={`${styles['proposal-creation-form']}`}>
                <div className={`${styles['creation-form-header-container']}`}>
                    <span>新增提案</span>
                </div>
                <div className={`${styles['proposal-name-container']}`}>
                    <span className={`${styles['proposal-name-label']}`}>提案名稱：</span>
                    <input type="text" className={`${styles['proposal-name-input']}`} value={newProposalName} onChange={onProposalNameInputChanged} />
                </div>
                <div className={`${styles['selector-container']}`}>
                    <span className={`${styles['selector-label']}`}>相關機關：</span>
                    <select className={`${styles['selector']}`} onChange={onDepartmentSelectorChange}>
                        {
                            deptOptionList.map((deptOption, index) => {
                                return (
                                    <option key={index} value={deptOption}>
                                        {deptOption}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={`${styles['card-container']}`}>
                    {
                        proposalCreation.departments.map((deptName, i) => {
                            return (
                                <span key={i} className={`${styles['card']}`} onClick={onDepartmentCardClicked}>
                                    {deptName}
                                </span>
                            )
                        })
                    }
                </div>
                <div className={`${styles['selector-container']}`}>
                    <span className={`${styles['selector-label']}`}>應用領域：</span>
                    <select className={`${styles['selector']}`} onChange={onDomainSelectorChange}>
                        {domainOptionList.map((domain, index) => {
                            return (
                                <option key={index} value={domain}>
                                    {domain}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className={`${styles['card-container']}`}>
                    {
                        proposalCreation.domain.map((domain, i) => {
                            return (
                                <span key={i} className={`${styles['card']}`} onClick={onDomainCardClicked}>
                                    {domain}
                                </span>
                            )
                        })
                    }
                </div>
                <div className={`${styles['toggle-button-form-container']}`}>
                    {
                        pairArray(initialDecisionOrder).map((decisionNamePair, index) => {
                            return (
                                <div className={`${styles['toggle-button-row-container']}`} key={`decision-name-pair-container-${index}`}>
                                    {
                                        decisionNamePair.map((decisionName, index) => {
                                            return (
                                                <div className={`${styles['toggle-button-container']}`} key={`decision-name-container-${index}`}>
                                                    <span>{`${decisionName}: `}</span>
                                                    <ToggleButton callback={toggleButtonCallbackGenerator(decisionName)} toggled={proposalCreation[decisionName]} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    {/* <div className={`${styles['toggle-button-row-container']}`}>
                        <div className={`${styles['toggle-button-container']}`}>
                            <span>可行性: </span>
                            <ToggleButton callback={toggleButtonCallbackGenerator('doable')} toggled={proposalCreation['doable'].value} />
                        </div>
                        <div className={`${styles['toggle-button-container']}`}>
                            <span>商轉效益：</span>
                            <ToggleButton callback={toggleButtonCallbackGenerator('profitable')} toggled={proposalCreation['profitable'].value} />
                        </div>
                    </div>
                    <div className={`${styles['toggle-button-row-container']}`}>
                        <div className={`${styles['toggle-button-container']}`}>
                            <span>公共服務: </span>
                            <ToggleButton callback={toggleButtonCallbackGenerator('publicService')} toggled={proposalCreation['publicService'].value} />
                        </div>
                        <div className={`${styles['toggle-button-container']}`}>
                            <span>永續經營：</span>
                            <ToggleButton callback={toggleButtonCallbackGenerator('sustainable')} toggled={proposalCreation['sustainable'].value} />
                        </div>
                    </div>
                    <div className={`${styles['toggle-button-row-container']}`}>
                        <div className={`${styles['toggle-button-container']}`}>
                            <span>跨機關合作: </span>
                            <ToggleButton callback={toggleButtonCallbackGenerator('deptCollab')} toggled={proposalCreation['deptCollab'].value} />
                        </div>
                        <div className={`${styles['toggle-button-container']}`}>
                            <span>跨縣市合作：</span>
                            <ToggleButton callback={toggleButtonCallbackGenerator('crossCityCollab')} toggled={proposalCreation['crossCityCollab'].value} />
                        </div>
                    </div>
                    <div className={`${styles['toggle-button-row-container']}`}>
                        <div className={`${styles['toggle-button-container']}`}>
                            <span>國際推廣: </span>
                            <ToggleButton callback={toggleButtonCallbackGenerator('internationalPromote')} toggled={proposalCreation['internationalPromote'].value} />
                        </div>
                    </div> */}
                    <div className={`${styles['alert-message-container']}`}>
                        <span>{alertMessage}</span>
                    </div>
                    <div className={`${styles['submit-button-container']}`}>
                        <button className={`${styles['submit-button']}`} onClick={onSubmitButtonClick}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}