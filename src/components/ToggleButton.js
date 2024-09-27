'use client'
import styles from './ToggleButton.module.css';

export default function ToggleButton(props) {
    const { callback, toggled } = props

    function onToggleButtonClicked() {
        if (callback) {
            callback()
        }
    }
    return (
        <div className={`${styles['toggle-btn']} ${toggled ? '' : styles['toggle-btn-disable']}`} onClick={onToggleButtonClicked}>
            <div className={`${styles['toggle-circle']} ${toggled ? '' : styles['toggle-circle-disable']}`}></div>
        </div>
    )
}