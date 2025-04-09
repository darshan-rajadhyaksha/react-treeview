import React, { memo } from "react";

const TreeNodeIconRenderer = memo(({ isLeafNode }) => {
  return !isLeafNode ? (
    <span>+</span>
  ):(
    <span>*</span>
  );
});

export default TreeNodeIconRenderer;