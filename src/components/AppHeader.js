'use client'
import styles from './AppHeader.module.css';
import Image from 'next/image'
import { useContext } from 'react';
import { ProposalListContext } from '@/context/ProposalListProvider'
import Papa from "papaparse"

export default function AppHeader() {

    const { initialProposal,
        setInitialProposal,
        setInitialDecisionOrder,
        setCurrentDecisionList,
        setFilterRule,
        setProposalCreation,
        setInitialProposalCreation,
        setUpdateFields,
        setCurrentProposal } = useContext(ProposalListContext)

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

    const handleProposalListContext = (newData) => {
        setInitialProposal(newData)
        const newDecisionOrder = Object.keys(newData[0]).filter(keyName => {
            if (keyName !== 'name' && keyName !== 'departments' && keyName !== 'domain') {
                return true
            } else {
                return false
            }
        })
        let proposalCreation = {
            name: "",
            departments: [],
            domain: []
        }
        let initialFilterRule = {};
        let initialUpdateFields = {}
        newDecisionOrder.forEach(decisionName => {
            initialFilterRule[decisionName] = false;
            proposalCreation[decisionName] = false;
            initialUpdateFields[decisionName] = false;
        })
        console.log(`[Debug] newDecisionOrder: ${newDecisionOrder}`)
        setCurrentDecisionList(newDecisionOrder);
        setInitialDecisionOrder(newDecisionOrder);
        setProposalCreation({...proposalCreation});
        setCurrentProposal(null)
        setInitialProposalCreation({...proposalCreation})
        setFilterRule(initialFilterRule)
        setUpdateFields(initialUpdateFields)
    }

    // const csvToJson = (csv) => {
    //     const lines = csv.split('\n');
    //     const headers = lines[0].split(',');
    //     const result = [];

    //     for (let i = 1; i < lines.length; i++) {
    //         const obj = {};
    //         const currentLine = lines[i].split(',');

    //         for (let j = 0; j < headers.length; j++) {
    //             obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : ''; // 處理空值
    //         }
    //         result.push(obj);
    //     }
    //     return result;
    // };

    const onReaderLoad = (event) => {
        const fileContent = event.target.result;
        const fileName = event.target.fileName;

        if (fileName.endsWith('.json')) {
            // 處理 JSON 檔案
            const importedProposals = JSON.parse(fileContent);
            setInitialProposal(importedProposals);
            handleProposalListContext(importedProposals)
            console.log("JSON Import Successed！");
        } else if (fileName.endsWith('.csv') || fileName.endsWith('.xlsx')) {
            Papa.parse(fileContent, {
                header: true,
                complete: (results) => {
                    let data = results.data
                    data = data.filter(record => {
                        return record['name']
                    })
                    data = data.map(record => {
                        record['departments'] = record['departments'].trim().split(',')
                        record['domain'] = record['domain'].trim().split(',')
                        return record
                    })
                    let decisionOrder = Object.keys(data[0]).filter(keyName => {
                        if (keyName !== 'name' && keyName !== 'departments' && keyName !== 'domain') {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    data = data.map(record => {
                        const newRecord = {...record}
                        decisionOrder.forEach(decisionName => {
                            if (record[decisionName].trim() === 'O') {
                                newRecord[decisionName] = true
                            }  else {
                                newRecord[decisionName] = false
                            }
                        })
                        return newRecord
                    })
                    setInitialProposal(data);
                    handleProposalListContext(data)
                    console.log("CSV Import Successed！", JSON.stringify(data));
                },
                error: (error) => {
                    console.error("CSV Parse Error:", error.message);
                },
            });
        } else {
            console.error("Unsupported file type.");
        }
    }

    const onImportChange = (event) => {
        console.log('import button clicked');
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.fileName = file.name;
        reader.onload = onReaderLoad;
        reader.readAsText(file,);
    }

    return (
        <div className={`${styles['header-container']}`}>
            <div className={`${styles['left-section']}`}>
                <Image className={`${styles['logo-image']}`} src='/images/tainan_logo.svg' alt='Tainan Logo' width={80} height={40} />
                <span>
                    臺南市政府簡易提案篩選平臺
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