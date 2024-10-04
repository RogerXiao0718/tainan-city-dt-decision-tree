'use client'
import styles from './FilterContainer.module.css';
import ToggleButton from '@/components/ToggleButton'
import { useContext } from 'react'
import { FilterRuleContext } from '@/context/FilterRuleProvider'
import { UIStateContext } from "@/context/UIStateProvider"

export const deptOptionList = ['', '文化局', '觀光旅遊局', '經濟發展局', '體育局', '都市發展局', '交通局', '消防局', '水利局', '工務局']
export const domainOptionList = ['', '娛樂', '電商', '學習', '運動科技', '文化', '動畫', '影視', '觀光', '旅遊', '賽事', '展演', '公共服務']


export default function FilterContainer() {

    const { uiState, setUIState } = useContext(UIStateContext)
    const { filterUIAppear } = uiState
    const { filterRule, setFilterRule, stringArrayFilterRule, setStringArrayFilterRule } = useContext(FilterRuleContext)


    function ToggleButtonCallbackGenerator(ruleName, setStateFunction) {
        return () => {
            const newRule = { ...filterRule }
            newRule[ruleName] = !filterRule[ruleName]
            setStateFunction({ ...newRule })
        }
    }

    function onResetButtonClicked() {
        let newFilterRule = {}
        for (const filterKey of Object.keys(filterRule)) {
            newFilterRule[filterKey] = false
        }
        setFilterRule({
            ...newFilterRule
        })


        setStringArrayFilterRule({
            departments: '',
            domain: ''
        })
    }

    function onCloseButtonClicked() {
        setUIState({
            ...uiState,
            filterUIAppear: false
        })
    }

    function onDepartmentSelectChange(event) {
        let newFilterRule = { ...stringArrayFilterRule }
        newFilterRule['departments'] = event.target.value
        setStringArrayFilterRule(newFilterRule)
    }

    function onDomainSelectChange(event) {
        let newFilterRule = { ...stringArrayFilterRule }
        newFilterRule['domain'] = event.target.value
        setStringArrayFilterRule(newFilterRule)
    }

    return (
        <div className={`${styles['filter-container']} ${filterUIAppear ? styles['filter-container-enabled'] : ''}`}>
            <div className={`${styles['filter-header']}`}>
                <span>設定篩選條件</span>
            </div>
            <div className={`${styles['conditions-container']}`}>
                <div className={`${styles['condition-row']}`}>
                    <label>相關機關: </label>
                    <select className={`${styles['condition-select']}`} onChange={onDepartmentSelectChange} value={stringArrayFilterRule['departments']} >
                        {
                            deptOptionList.map((deptName, i) => {
                                return (
                                    <option key={i} value={deptName}>{deptName}</option>
                                )
                            })
                        }
                    </select>
                    {/* <Image className={`${styles['select-cancel-img']}`} src='/images/cancel_plain.png' alt='cancel' width={20} height={20} /> */}
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>應用領域: </label>
                    <select className={`${styles['condition-select']}`} onChange={onDomainSelectChange} value={stringArrayFilterRule['domain']}>
                        {
                            domainOptionList.map((domain, i) => {
                                return (
                                    <option key={i} value={domain}>{domain}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>可行性: </label>
                    <ToggleButton callback={ToggleButtonCallbackGenerator('doable', setFilterRule)} toggled={filterRule['doable']} />
                    <label>商轉效益: </label>
                    <ToggleButton callback={ToggleButtonCallbackGenerator('profitable', setFilterRule)} toggled={filterRule['profitable']} />
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>公共服務: </label>
                    <ToggleButton callback={ToggleButtonCallbackGenerator('publicService', setFilterRule)} toggled={filterRule['publicService']} />
                    <label>永續經營: </label>
                    <ToggleButton callback={ToggleButtonCallbackGenerator('sustainable', setFilterRule)} toggled={filterRule['sustainable']} />
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>跨機關合作: </label>
                    <ToggleButton callback={ToggleButtonCallbackGenerator('deptCollab', setFilterRule)} toggled={filterRule['deptCollab']} />
                    <label>跨縣市合作: </label>
                    <ToggleButton callback={ToggleButtonCallbackGenerator('crossCityCollab', setFilterRule)} toggled={filterRule['crossCityCollab']} />
                </div>
                <div className={`${styles['condition-row']}`}>
                    <label>國際推廣: </label>
                    <ToggleButton callback={ToggleButtonCallbackGenerator('internationalPromote', setFilterRule)} toggled={filterRule['internationalPromote']} />
                </div>


            </div>
            <div className={`${styles['apply-filter-container']}`}>
                <button className={`${styles['reset-filter-btn']}`} onClick={onResetButtonClicked}>
                    Reset
                </button>
                <button className={`${styles['close-filter-btn']}`} onClick={onCloseButtonClicked}>
                    Close
                </button>
            </div>
        </div>
    )
}