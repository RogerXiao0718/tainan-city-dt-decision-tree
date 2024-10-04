'use client'
import styles from './AppHeader.module.css';
import Image from 'next/image'
import { useContext } from 'react';
import { ProposalListContext } from '@/context/ProposalListProvider'

export default function AppHeader() {

    const { initialProposal, setInitialProposal } = useContext(ProposalListContext)

    const onExportButtonClicked = () => {
        const fileName = 'ExportProposals.json'
        const json = JSON.stringify(initialProposal, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const href = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = href
        link.download = fileName
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(href)
    }

    const onReaderLoad = (event) => {
        const importedProposals = JSON.parse(event.target.result)
        setInitialProposal(importedProposals)
        console.log("Import Successed！")
    }

    const onImportChange = (event) => {
        console.log('import button clicked')
        const jsonFile = event.target.files[0]
        const reader = new FileReader()
        reader.onload = onReaderLoad
        reader.readAsText(jsonFile)
        // console.log(jsonFile)
        // const form_data = new FormData()
        // form_data.append('jsonFile', jsonFile, '', {type:'application/json'})
        // console.log({
        //     userid: auth,
        //     form_data
        // })

    }
    
    return (
        <div className={`${styles['header-container']}`}>
            <div className={`${styles['left-section']}`}>
                <Image className={`${styles['logo-image']}`} src='/images/tainan_logo.svg' alt='Tainan Logo'  width={80} height={40} />
                <span>
                    數位孿生提案簡易篩選
                </span>
            </div>
            <div className={`${styles['right-section']}`}>
                <div className={`${styles['proposal-button']}`}>
                    <input id="import-button" className={`${styles['import-button']}`} type="file" onChange={onImportChange} />
                    <label for="import-button">匯入提案</label>
                </div>
                   
                <button className={`${styles['proposal-button']}`} onClick={onExportButtonClicked}>
                    匯出提案
                </button>
            </div>
        </div>
    )
}