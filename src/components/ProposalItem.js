import styles from './ProposalItem.module.css'
import Image from 'next/image'


export default function ProposalItem(props) {
    const {name, departments, index, setCurrentProposal} = props;

    function onProposalItemClicked() {
        setCurrentProposal(index)
    }

    return (
        <div className={`${styles['proposal-item']}`} onClick={onProposalItemClicked}>
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