import styles from './BooleanInfo.module.css'
import Image from 'next/image'

export default function BooleanInfo(props) {
    const { boolValue } = props
    return (
        <div className={`${styles['boolean-info']}`}>
            {
                boolValue ?
                (
                    <div className={`${styles['bool-container']}`}>
                        <Image src='/images/check-circle.png' alt="yes" width={30} height={30} />
                        <span>Yes</span>
                    </div>
                ) :
                (
                    <div className={`${styles['bool-container']}`}>
                        <Image src='/images/cancel.png' alt="no" width={30} height={30} />
                        <span>No</span>
                    </div>
                )
            }
        </div>
    )
}