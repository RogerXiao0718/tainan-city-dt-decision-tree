import styles from './FilterContainer.module.css';
import ToggleButton from '@/components/ToggleButton'

export default function FilterContainer() {
    return (
        <div className={`${styles['filter-container']}`}>
            <div className={`${styles['filter-header']}`}>
                <span>設定篩選條件</span>
            </div>
            <div className={`${styles['conditions-container']}`}>
                <div className={`${styles['condition-row']}`}>
                    <label>相關機關: </label>
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>應用領域: </label>
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>可用性: </label>
                    <ToggleButton />
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>商轉效益: </label>
                    <ToggleButton />
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>公共服務: </label>
                    <ToggleButton />
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>永續經營: </label>
                    <ToggleButton />
                </div>
                
            </div>
        </div>
    )
}