import styles from './DetailInfoContainer.module.css'
import BooleanInfo from '@/components/BooleanInfo'

export default function DetailInfoContainer({currentProposal}) {

    return (
        <div>
            {
                (currentProposal) && (
                    <div className={`${styles['detail-info-container']}`}>
                        <div className={`${styles['proposal-title-container']}`}>
                            {currentProposal.name}
                        </div>
                        <div className={`${styles['rows-container']}`}>
                            <div className={`${styles['row-container']}`}>
                                <label>相關機關：</label>
                                {
                                    currentProposal.departments.map((dept, index) => {
                                        return (
                                            <div key={index} className={`${styles['item-card']}`}>
                                                {dept}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={`${styles['row-container']}`}>
                                <label>應用領域：</label>
                                {
                                    currentProposal.domain.map((d, index) => {
                                        return (
                                            <div key={index} className={`${styles['item-card']}`}>
                                                {d}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={`${styles['row-container']}`}>
                                <label>可行性：</label>
                                {
                                    <BooleanInfo boolValue={currentProposal.doable.value} />
                                }
                            </div>
                            <div className={`${styles['row-container']}`}>
                                <label>商轉效益：</label>
                                {
                                    <BooleanInfo boolValue={currentProposal.profitable.value} />
                                }
                            </div>
                            <div className={`${styles['row-container']}`}>
                                <label>公共服務：</label>
                                {
                                    <BooleanInfo boolValue={currentProposal.publicService.value} />
                                }
                            </div>
                            <div className={`${styles['row-container']}`}>
                                <label>永續經營：</label>
                                {   
                                    <BooleanInfo boolValue={currentProposal.sustainable.value} />
                                }
                            </div>
                            <div className={`${styles['row-container']}`}>
                                <label>跨機關合作：</label>
                                {   
                                    <BooleanInfo boolValue={currentProposal.deptCollab.value} />
                                }
                            </div>
                            <div className={`${styles['row-container']}`}>
                                <label>跨縣市合作：</label>
                                {   
                                    <BooleanInfo boolValue={currentProposal.crossCityCollab.value} />
                                }
                            </div>
                            <div className={`${styles['row-container']}`}>
                                <label>國際推廣：</label>
                                {   
                                    <BooleanInfo boolValue={currentProposal.internationalPromote.value} />
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}