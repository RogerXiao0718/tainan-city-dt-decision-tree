export const NodeVisibility = {
  Hidden: 'hidden',
  Visible: 'visible'
}

export const REGULAR_NODE_SVG_STYLE = {
    shape: 'circle',
    shapeProps: {
      r: 30,
      fill: '#FFFFFF',
    },
  };
  
  /**
   * Style for a visible 'plus' node. Friendly reminder to deep
   * clone the constant to avoid any accidental updates.
   */
  export const VISIBLE_PLUS_NODE_SVG_STYLE = {
    shape: 'circle',
    shapeProps: {
      r: 20,
      strokeWidth: 1,
      fill: '#FFFFFF',
      visibility: NodeVisibility.Visible,
    },
  };
  
  /**
   * Style for a hidden 'plus' node. Friendly reminder to deep
   * clone the constant to avoid any accidental updates.
   */
  export const HIDDEN_PLUS_NODE_SVG_STYLE = {
    shape: 'circle',
    shapeProps: {
      r: 20,
      strokeWidth: 1,
      fill: '#FFFFFF',
      visibility: NodeVisibility.Hidden,
    },
  };
  
  /**
   * Style indicator that a node has been toggled or selected. Friendly
   * reminder to deep clone the constant to avoid any accidental updates.
   */
  export const SELECTED_NODE_SVG_STYLE = {
    shape: 'circle',
    shapeProps: {
      r: 30,
      stroke: '#003a8c',
      strokeWidth: 10,
      fill: '#FFFFFF',
      visibility: NodeVisibility.Visible,
    },
  };