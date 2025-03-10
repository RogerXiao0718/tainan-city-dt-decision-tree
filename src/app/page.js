/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import styles from "./page.module.css";
import Image from "next/image";
import ProposalItem from "@/components/ProposalItem";
import DetailInfoContainer from "@/components/DetailInfoContainer";
import FilterContainer from "@/components/FilterContainer";
import DecisionOrderContainer from "@/components/DecisionOrderContainer";
import LoadingBouncer from "@/components/LoadingBouncer";
import { useState, useEffect, useContext } from "react";
import { FilterRuleContext } from "@/context/FilterRuleProvider";
import { ProposalListContext } from "@/context/ProposalListProvider";
import { UIStateContext } from "@/context/UIStateProvider";
import DecisionTree from "@/components/DecisionTree";
import ProposalCreationContainer from "@/components/ProposalCreationContainer";
import UpdateProposalContainer from "@/components/UpdateProposalContainer";
import UpdateFieldProvider from "@/context/UpdateFieldProvider";

export default function Home() {
  // const [currentProposal, setCurrentProposal] = useState(null)

  const { stringArrayFilterRule } = useContext(FilterRuleContext);
  const {
    proposalList,
    setProposalList,
    currentProposal,
    setCurrentProposal,
    initialProposal,
    filterRule,
    proposalCreation,
    setFilterRule,
  } = useContext(ProposalListContext);
  const { uiState, setUIState } = useContext(UIStateContext);
  const { currentDisplaySection, leftPanelUIAppear } = uiState;
  useEffect(() => {
    if (filterRule) {
      if (
        !Object.values(filterRule).every(
          (filterValue) => filterValue === false
        ) ||
        !Object.values(stringArrayFilterRule).every(
          (filterValue) => filterValue === ""
        )
      ) {
        const filterRuleKeys = Object.keys(filterRule);
        const DropDownFilterRuleKeys = Object.keys(stringArrayFilterRule);
        // apply filter rule to proposal list
        const filtered_proposal = initialProposal.filter((proposal) => {
          let filterResult = true;
          for (const filterKey of filterRuleKeys) {
            if (filterRule[filterKey] === true) {
              if (proposal[filterKey] === false) {
                filterResult = false;
              }
            }
          }

          // drop down list filter rule
          let dropDownFilterResult = true;
          for (const DropDownFilterRuleKey of DropDownFilterRuleKeys) {
            if (stringArrayFilterRule[DropDownFilterRuleKey] !== "") {
              if (
                !proposal[DropDownFilterRuleKey].includes(
                  stringArrayFilterRule[DropDownFilterRuleKey]
                )
              ) {
                dropDownFilterResult = false;
              }
            }
          }
          return filterResult && dropDownFilterResult;
        });
        setProposalList([...filtered_proposal]);
      } else {
        // reset proposals
        if (initialProposal) {
          setProposalList([...initialProposal]);
        }
      }
    }
  }, [filterRule, initialProposal, setProposalList, stringArrayFilterRule]);

  function onLeftPanelBackClicked() {
    setUIState({
      ...uiState,
      leftPanelUIAppear: false,
    });
  }

  function onFilterUIAppearClicked() {
    setUIState((uiState) => {
      return {
        ...uiState,
        filterUIAppear: !uiState.filterUIAppear,
        decisionOrderUIAppear: false,
      };
    });
  }

  function onDecisionOrderUIClicked() {
    setUIState((uiState) => {
      return {
        ...uiState,
        decisionOrderUIAppear: !uiState.decisionOrderUIAppear,
        filterUIAppear: false,
      };
    });
  }

  function onProposalListSideTagClicked() {
    setUIState((uiState) => {
      return {
        ...uiState,
        leftPanelUIAppear: true,
      };
    });
  }

  function onDetailTagClicked() {
    setUIState((uiState) => {
      return {
        ...uiState,
        currentDisplaySection: "detail",
      };
    });
  }

  function onDecisionTreeTagClicked() {
    // setDecisionTreeAppear(!decisionTreeAppear)
    setUIState((uiState) => {
      return {
        ...uiState,
        currentDisplaySection: "decision-tree",
      };
    });
  }

  function onCreationTagClicked() {
    setUIState((uiState) => {
      return {
        ...uiState,
        currentDisplaySection: "create",
      };
    });
  }

  function onUpdateProposalTagClicked() {
    setUIState((uiState) => {
      return {
        ...uiState,
        currentDisplaySection: "update",
      };
    });
  }

  return (
    <div className={`${styles["main"]}`}>
      <div
        className={`${styles["proposal-list"]} ${
          leftPanelUIAppear ? styles["proposal-list-appear"] : ""
        }`}
      >
        <div className={`${styles["proposal-list-header-container"]}`}>
          <div className={`${styles["proposal-header-left"]}`}>
            <Image
              src="/images/proposal3x.png"
              width={60}
              height={60}
              alt="proposal icon"
            />
            <span>各局處提案</span>
          </div>
          <div className={`${styles["proposal-header-right"]}`}>
            <Image
              className={`${styles["filter-image"]}`}
              onClick={onDecisionOrderUIClicked}
              src="/images/network_node.png"
              width={30}
              height={30}
              alt="order"
            />
            <Image
              className={`${styles["filter-image"]}`}
              onClick={onFilterUIAppearClicked}
              src="/images/filter.png"
              width={30}
              height={30}
              alt="filter"
            />
            <Image
              className={`${styles["filter-image"]}`}
              onClick={onLeftPanelBackClicked}
              src="/images/arrow_back.png"
              width={30}
              height={30}
              alt="back"
            />
          </div>
        </div>
        <DecisionOrderContainer />
        <FilterContainer />
        <div className={`${styles["proposal-items-container"]}`}>
          {proposalList ? (
            proposalList.map((proposal, index) => {
              return (
                <ProposalItem
                  key={index}
                  proposal={proposal}
                  index={index}
                  setCurrentProposal={setCurrentProposal}
                />
              );
            })
          ) : (
            <LoadingBouncer />
          )}
        </div>
      </div>
      <div></div>
      {!leftPanelUIAppear && (
        <div
          className={`${styles["left-side-tag"]} ${styles["proposal-list-tag"]}`}
          onClick={onProposalListSideTagClicked}
        >
          <span>提案清單</span>
        </div>
      )}
      <div
        className={`${styles["right-side-tag"]} ${styles["detail-tag"]}`}
        onClick={onDetailTagClicked}
      >
        <span>提案資訊</span>
      </div>
      <div
        className={`${styles["right-side-tag"]} ${styles["decision-tree-tag"]}`}
        onClick={onDecisionTreeTagClicked}
      >
        <span>提案決策樹</span>
      </div>
      <div
        className={`${styles["right-side-tag"]} ${styles["create-proposal-tag"]}`}
        onClick={onCreationTagClicked}
      >
        <span>新增提案</span>
      </div>
      {/* <div
        className={`${styles["right-side-tag"]} ${styles["update-proposal-tag"]}`}
        onClick={onUpdateProposalTagClicked}
      >
        <span>更新提案</span>
      </div> */}
      <div
        className={`${styles["detail-info-section"]} ${
          currentDisplaySection === "detail"
            ? styles["detail-info-section-enabled"]
            : ""
        }`}
      >
        <DetailInfoContainer currentProposal={currentProposal} />
      </div>
      <div
        className={`${styles["decision-tree-container"]} ${
          currentDisplaySection === "decision-tree"
            ? styles["decision-tree-container-enabled"]
            : ""
        }  ${
          !leftPanelUIAppear && currentDisplaySection === "decision-tree"
            ? styles["full-width"]
            : ""
        }`}
      >
        {initialProposal && <DecisionTree />}
      </div>
      <div
        className={`${styles["proposal-creation-container"]} ${
          currentDisplaySection === "create"
            ? styles["proposal-creation-container-enabled"]
            : ""
        }`}
      >
        { proposalCreation && <ProposalCreationContainer /> }
      </div>
      <div
        className={`${styles["update-section-container"]} ${
          currentDisplaySection === "update"
            ? styles["update-section-container-enabled"]
            : ""
        }`}
      >
        {/* <UpdateFieldProvider>
          <UpdateProposalContainer currentProposal={currentProposal} />
        </UpdateFieldProvider> */}
      </div>
    </div>
  );
}
