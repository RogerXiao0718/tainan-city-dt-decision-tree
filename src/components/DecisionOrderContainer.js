import styles from "./DecisionOrderContainer.module.css"
import { useContext } from "react"
import { ProposalListContext } from '@/context/ProposalListProvider'
import { UIStateContext } from '@/context/UIStateProvider'

export default function DecisionOrderContainer() {
    const { currentDecisionList, setCurrentDecisionList, initialDecisionOrder } = useContext(ProposalListContext)
    const {uiState, setUIState} = useContext(UIStateContext)
    const {decisionOrderUIAppear} = uiState
    const onOrderSelectChangeGenerator = (optionDecision) => {
        return (event) => {
            const value = parseInt(event.target.value)
            if (value === -1) {
                if (currentDecisionList.length > 2) {
                    const newDecisionList = currentDecisionList.filter(decision => {
                        return decision !== optionDecision
                    }) 
                    setCurrentDecisionList(newDecisionList)
                }
            } else {
                const newDecisionList = currentDecisionList.filter(decision => {
                    return decision !== optionDecision
                })
                console.log(newDecisionList)
                const frontSlice = newDecisionList.slice(0, value)
                const backSlice = newDecisionList.slice(value)
                setCurrentDecisionList([
                    ...frontSlice,
                    optionDecision,
                    ...backSlice
                ])
            }
        }
    }

    const onResetButtonClicked = () => {
        setCurrentDecisionList([
            ...initialDecisionOrder
        ])
    }

    const onCloseButtonClicked = () => {
        setUIState({
            ...uiState,
            decisionOrderUIAppear: false
        })
    }

    return (
        decisionOrderUIAppear && <div className={`${styles['decision-order-container']}`}>
            <div className={`${styles['decision-order-title-container']}`}>
                <span className={`${styles['decision-order-title']}`}>設定決策順序</span>
            </div>
            <div className={`${styles['order-list-container']}`}>
                {
                    currentDecisionList.map((decision, index) => {
                        return (
                            <div key={index} className={`${styles['decision-order-row']}`}>
                                <span className={`${styles['order-number']}`}>
                                    {index + 1}
                                </span>
                                <span className={`${styles['decision-ch-title']}`}>
                                    {decision}
                                </span>
                                <select className={`${styles['order-select']}`} onChange={onOrderSelectChangeGenerator(decision)} value={index}>
                                    <option value={-1}>{0}</option>
                                    {
                                        currentDecisionList.map((_, index) => {
                                            return (
                                                <option key={index} value={parseInt(index)}>
                                                    {index+1}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`${styles['button-container']}`}>
                <button className={`${styles['reset-order-btn']}`} onClick={onResetButtonClicked}>
                    Reset
                </button>
                <button className={`${styles['close-btn']}`} onClick={onCloseButtonClicked}>
                    Close
                </button>
            </div>
        </div>
    )
}