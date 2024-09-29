// 'use client'
// import { useState } from 'react'
// import styles from './DecisionTree.module.css'
// import 'react-d3-tree'

// const TreeLayerData = ['可行性', '商轉價值', '公共服務', '永續經營', '跨機關合作', '國際推廣']

// export const TreeNode = (props) => {

//     const { currentLayer } = props

//     const [leftNode, setLeftNode] = useState(null)
//     const [rightNode, setRightNode] = useState(null)
//     const []

//     const onTreeNodeClicked = (event) => {

//     }

//     return (
//         <div className={`${styles['tree-node-container']}`}>

//         </div>
//     )
// }

// export default function DecisionTree() {
//     const [treeData, setTreeData] = useState({})

//     return (
//         <div className={`${styles['decision-tree-container']}`}>

//         </div>
//     )
// }

"use client";

import Tree from "react-d3-tree";
import { REGULAR_NODE_SVG_STYLE } from "./helpers/tree";
import styles from "./DecisionTree.module.css";
import { useEffect, useMemo, useRef, useState } from "react";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

const TreeLayerData = [
  "可行性",
  "商轉價值",
  "公共服務",
  "永續經營",
  "跨機關合作",
  "國際推廣",
];

const addChild = (treeData, childData) => {
  return {
    ...treeData,
    children: [...treeData.children, childData],
  };
};

const createTreeData = (layerData, attributes = {}, depth = 0) => {
  let treeData = {
    name: layerData[depth],
    attributes: attributes,
    children: [],
  };
  if (depth < layerData.length - 1) {
    //add left child
    treeData = addChild(treeData, createTreeData(layerData, {}, depth + 1));
    //add right child
    treeData = addChild(treeData, createTreeData(layerData, {}, depth + 1));
  }

  return treeData;
};

function CustomNode({ nodeDatum, toggleNode }) {

  const {} = nodeDatum.attributes

  useEffect(() => {
    if (nodeDatum.__rd3t.depth == 0) {
      toggleNode();
    }
  }, [nodeDatum.__rd3t.depth, toggleNode]);
  return (
    <g className={`${styles["regular-node-svg"]}`}>
      <circle onClick={() => toggleNode()} />
      <text fill="black" strokeWidth="1" x="30" onClick={toggleNode}>
        {nodeDatum.name}
      </text>
      {nodeDatum.__rd3t.depth !== TreeLayerData.length - 1 && (
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

  const [treeData, setTreeData] = useState(createTreeData(TreeLayerData));

  useEffect(() => {
    // console.log(containerRef.current.offsetWidth, containerRef.current.offsetHeight)
    setDimensions({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
  }, []);
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div
      ref={containerRef}
      id="treeWrapper"
      className={`${styles["decision-tree-container"]}`}
    >
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
