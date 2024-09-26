import styles from './AppHeader.module.css';
import Image from 'next/image'

export default function AppHeader() {
    return (
        <div className={`${styles['header-container']}`}>
            <Image className={`${styles['logo-image']}`} src='/images/tainan_logo.svg' alt='Tainan Logo'  width={80} height={40} />
            <span>
                數位孿生提案簡易決策樹
            </span>
        </div>
    )
}