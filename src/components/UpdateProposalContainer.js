import styles from './UpdateProposalContainer.module.css'
import ToggleButton from '@/components/ToggleButton'

export default function UpdateProposalContainer({ currentProposal }) {
    return (
        currentProposal && (
            <div className={`${styles['update-proposal-container']}`}>
                <div className={`${styles['update-form-container']}`}>
                    <span className={`${styles['update-form-title']}`}>更新提案</span>
                    <span className={`${styles['proposal-name']}`}>
                        {currentProposal.className}
                    </span>
                    <div className={`${styles['options-container']}`}>
                        <div className={`${styles['options-row']}`}>
                            <ToggleButton />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}