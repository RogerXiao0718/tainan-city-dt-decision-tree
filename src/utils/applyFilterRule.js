import { useContext } from "react";
import {FilterRuleContext} from '@/context/FilterRuleProvider'

export default function useApplyFilterRule() {
    const {filterRule} = useContext(FilterRuleContext)
    
}