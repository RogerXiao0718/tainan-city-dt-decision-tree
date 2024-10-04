import styles from "./DecisionOrderContainer.module.css"
import { useContext } from "react"
import { ProposalListContext } from '@/context/ProposalListProvider'

export default function DecisionOrderContainer() {
    const {currentDecisionList, setCurrentDecisionList} = useContext(ProposalListContext)

    return (
        <div className={`${styles['decision-order-container']}`}>
            <div className={`${styles['decision-order-title-container']}`}>
                <span className={`${styles['decision-order-title']}`}></span>
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
                                    {decision.ch}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}