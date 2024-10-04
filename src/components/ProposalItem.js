import styles from './ProposalItem.module.css'
import Image from 'next/image'
import { useContext } from 'react';
import {ProposalListContext} from '@/context/ProposalListProvider'


export default function ProposalItem(props) {
    const {proposal, setCurrentProposal} = props;
    const {name, departments} = proposal
    const { currentProposal } = useContext(ProposalListContext)

    function onProposalItemClicked() {
        setCurrentProposal(proposal)

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
                <Image src="/images/Chevron Right.png" alt="more-info" width={36} height={36} />
            </div>
        </div>
    )
}