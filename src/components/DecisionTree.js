"use client";

import Tree from "react-d3-tree";
import { REGULAR_NODE_SVG_STYLE } from "./helpers/tree";
import styles from "./DecisionTree.module.css";
import { useEffect, useContext, useRef, useState } from "react";
import { ProposalListContext } from "@/context/ProposalListProvider";

const TreeLayerData = [
  "可行性",
  "商轉價值",
  "公共服務",
  "永續經營",
  "跨機關合作",
  "跨縣市合作",
  "國際推廣",
];

const TreeLayerDataEn = [
  "doable",
  "profitable",
  "publicService",
  "sustainable",
  "deptCollab",
  "crossCityCollab",
  "internationalPromote",
];

const TreeConstantProps = {
  LEFT_NODE: 0,
  RIGHT_NODE: 1,
};

const addChild = (treeData, childData) => {
  return {
    ...treeData,
    children: [...treeData.children, childData],
  };
};

const createHiddenNode = (name, children, attributes = {}) => {
  return {
    name: name,
    attributes: {
      ...attributes,
      hidden: true,
    },
    children: children,
  };
};

const displayHiddenData = (treeNode) => {
  return {
    ...treeNode,
    attributes: {
      ...treeNode.attributes,
      hidden: false,
    },
  };
};

const createProposalNode = (proposal) => {
  return {
    name: proposal.name,
    attributes: {
      hidden: false,
      isProposal: true,
    },
    children: [],
  };
};

const createProposalTree = (proposalList, layerData, layerDataEn) => {
  let treeData = {};
  let index = 0;

  if (proposalList.length !== 0) {
    for (const proposal of proposalList) {
      const referenceNode = index === 0 ? null : treeData;
      treeData = createProposalTreeData(
        treeData,
        proposal,
        layerData,
        layerDataEn,
        0,
        referenceNode
      );
      index += 1;
    }
  } else {
    return {
      name: "",
      attributes: {},
      children: [],
    };
  }

  // one proposal test
  // treeData = createProposalTreeData(treeData, proposalList[0], layerData, layerDataEn)

  return treeData;
};

const createProposalTreeData = (
  treeData,
  proposal,
  layerData,
  layerDataEn,
  depth = 0,
  referenceNode = null
) => {
  const isProposal = depth < layerData.length ? false : true;
  let currentTreeNode = {
    name: layerData[depth],
    attributes: {
      hidden: false,
      isProposal: isProposal,
    },
    children: [],
  };

  const layerEnName = layerDataEn[depth];

  const { LEFT_NODE, RIGHT_NODE } = TreeConstantProps;

  if (depth < layerData.length) {
    if (referenceNode && referenceNode.children.length >= 2) {
      let leftChild = referenceNode.children[LEFT_NODE];
      let rightChild = referenceNode.children[RIGHT_NODE];

      if (proposal[layerEnName].value === true) {
        // right Node
        if (rightChild.attributes.hidden === true) {
          rightChild = displayHiddenData(rightChild);
        }
        referenceNode.children[RIGHT_NODE] = createProposalTreeData(
          treeData,
          proposal,
          layerData,
          layerDataEn,
          depth + 1,
          rightChild
        );
      } else {
        // left Node
        if (leftChild.attributes.hidden === true) {
          leftChild = displayHiddenData(leftChild);
        }
        referenceNode.children[LEFT_NODE] = createProposalTreeData(
          treeData,
          proposal,
          layerData,
          layerDataEn,
          depth + 1,
          leftChild
        );
      }
      return referenceNode;
    } else {
      if (proposal[layerEnName].value === true) {
        // add left hidden node
        currentTreeNode = addChild(
          currentTreeNode,
          createHiddenNode(layerData[depth + 1], [], {
            isProposal: depth + 1 < layerData.length ? false : true,
          })
        );
        // add right visible node
        currentTreeNode = addChild(
          currentTreeNode,
          createProposalTreeData(
            treeData,
            proposal,
            layerData,
            layerDataEn,
            depth + 1
          )
        );
      } else {
        // add left visible node
        currentTreeNode = addChild(
          currentTreeNode,
          createProposalTreeData(
            treeData,
            proposal,
            layerData,
            layerDataEn,
            depth + 1
          )
        );
        // add right hidden node
        currentTreeNode = addChild(
          currentTreeNode,
          createHiddenNode(layerData[depth + 1], [], {
            isProposal: depth + 1 < layerData.length ? false : true,
          })
        );
      }
      return currentTreeNode;
    }
  } else {
    if (referenceNode) {
      referenceNode = addChild(referenceNode, createProposalNode(proposal));
      return referenceNode;
    } else {
      // currentTreeNode is new treeNode
      currentTreeNode = addChild(currentTreeNode, createProposalNode(proposal));
      return currentTreeNode;
    }
  }
};

function CustomNode({ nodeDatum, toggleNode }) {
  const {currentProposal} = useContext(ProposalListContext)
  const { hidden, isProposal } = nodeDatum.attributes;
  const { name } = nodeDatum;
  const textChunkSize = 6;
  const nameChunkList = [];
  if (nodeDatum.attributes.isProposal === true && name) {
    for (let i = 0; i < name.length; i += textChunkSize) {
      const chunk = name.slice(i, i + textChunkSize);
      nameChunkList.push(chunk);
    }
  }

  useEffect(() => {
    if (nodeDatum.__rd3t.depth == 0) {
      toggleNode();
    }
  }, [nodeDatum.__rd3t.depth, toggleNode]);
  return (
    hidden === false && (
      <g
        className={`${styles["regular-node-svg"]} ${
          isProposal ? styles["proposal-node"] : ""
        } ${name ? "" : styles["empty-node"]}`}
      >
        <circle onClick={() => toggleNode()} />
        {isProposal ? (
          <text
            fill={( currentProposal && name === currentProposal.name) ? 'red' : "black"}
            stroke={( currentProposal && name === currentProposal.name) ? 'red' : "black"}
            strokeWidth="1"
            x="-50"
            y="40"
            onClick={toggleNode}
          >
            {nameChunkList.map((chunk, i) => {
              return (
                <tspan key={i} x="-40" dy="1.2em">
                  {chunk}
                </tspan>
              );
            })}
          </text>
        ) : (
          <text fill="black" strokeWidth="1" x="30" onClick={toggleNode}>
            {nodeDatum.name}
          </text>
        )}
        {!isProposal && (
          <>
            <text fill="#2ecc71" strokeWidth="0.1" x="45" dy="40">
              Yes
            </text>
            <text fill="#e74c3c" strokeWidth="0.1" x="-50" dy="40">
              No
            </text>
          </>
        )}
      </g>
    )
  );
}

// reference: https://codesandbox.io/p/sandbox/rd3t-v2-custom-event-handlers-5pwxw?file=%2Fsrc%2FApp.js%3A48%2C11-48%2C37
const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode }) => {
  return <CustomNode nodeDatum={nodeDatum} toggleNode={toggleNode} />;
};

export default function DecisionTree() {
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { proposalList } = useContext(ProposalListContext);
  const [treeData, setTreeData] = useState({
    name: "",
    attributes: {},
    children: [],
  });

  useEffect(() => {
    setDimensions({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
  }, []);

  useEffect(() => {
    if (proposalList) {
      setTreeData(
        createProposalTree(proposalList, TreeLayerData, TreeLayerDataEn)
      );
    }
  }, [proposalList]);

  return (
    <div
      ref={containerRef}
      id="treeWrapper"
      className={`${styles["decision-tree-container"]}`}
    >
      <span className={`${styles["container-title"]}`}>提案決策樹</span>
      <Tree
        data={treeData}
        orientation="vertical"
        nodeSvgShape={REGULAR_NODE_SVG_STYLE}
        rootNodeClassName={`${styles["regular-node-svg"]}`}
        branchNodeClassName={`${styles["regular-node-svg"]}`}
        leafNodeClassName={`${styles["regular-node-svg"]}`}
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps })
        }
        // shouldCollapseNeighborNodes={true}
        // svgClassName={`${styles['regular-node-svg']}`}
        translate={{
          x: dimensions.width / 2,
          y: dimensions.height / 3,
        }}
        pathFunc={"diagonal"}
      />
    </div>
  );
}

// Todo: 將createTreeData改成把ProposalList的所有決策樹路徑建置起來，而點選其他Node則可以選擇建立左/右子樹(參考tree-visualizer)。
