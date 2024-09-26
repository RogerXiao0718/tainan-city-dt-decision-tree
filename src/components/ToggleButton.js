'use client'
import styles from './ToggleButton.module.css';
import {useState} from 'react'

export default function ToggleButton(props) {
    const { callback } = props
    const [toggle, setToggle] = useState(true); 

    function onToggleButtonClicked() {
        setToggle(!toggle)
        if (callback) {
            callback()
        }
    }
    return (
        <div className={`${styles['toggle-btn']} ${toggle ? '' : styles['toggle-btn-disable']}`} onClick={onToggleButtonClicked}>
            <div className={`${styles['toggle-circle']} ${toggle ? '' : styles['toggle-circle-disable']}`}></div>
        </div>
    )
}