import styles from './ProposalItem.module.css'
import Image from 'next/image'
import { useContext } from 'react';
import {ProposalListContext} from '@/context/ProposalListProvider'
import { UIStateContext } from "@/context/UIStateProvider"



export default function ProposalItem(props) {
    const {proposal, setCurrentProposal} = props;
    const {name, departments} = proposal
    const { currentProposal,  initialProposal, setInitialProposal } = useContext(ProposalListContext)
    const { uiState, setUIState } = useContext(UIStateContext)
    

    function onProposalItemClicked() {
        setCurrentProposal(proposal)
        if ( uiState.currentDisplaySection !== 'decision-tree' && uiState.currentDisplaySection !== 'update') {
            setUIState({
                ...uiState,
                currentDisplaySection: 'detail'
            })
        }
    }

    function onDeleteButtonClicked(event) {
        event.stopPropagation()
        setCurrentProposal(null)
        const newInitialProposal = initialProposal.filter( oldProposal => {
            return oldProposal.name !== name
        })
        
        setInitialProposal(() => {
            return [
                ...newInitialProposal
            ]
        })
    }

    return (
        <div className={`${styles['proposal-item']} ${currentProposal === proposal ? styles['selected-proposal'] : ''}`} onClick={onProposalItemClicked}>
            <div className={`${styles['main-dept-name']}`}>
            {
                departments && (
                    <div>
                        {departments[0]}
                    </div>
                )
            }
            </div>
            <div className={`${styles['name-container']}`}>
                <span>{name}</span>
            </div>
            <div className={`${styles['right-container']}`}>
                <Image className={`${styles['delete-proposal-icon']}`} src="/images/delete-icon.png"  alt="delete-proposal" width={28} height={28} onClick={onDeleteButtonClicked} />
                <Image src="/images/Chevron Right.png" alt="more-info" width={36} height={36} />
            </div>
        </div>
    )
}