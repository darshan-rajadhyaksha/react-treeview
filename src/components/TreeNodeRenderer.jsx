import React, { memo, useCallback } from "react";

const TreeNodeRenderer = memo(({ node, isDisabled, onClick }) => {

  const onTreeNodeClick = useCallback(() => {
    if (!isDisabled) {
      onClick();
    }
  }, [isDisabled, onClick]);

  return (
    <span
      onClick={onTreeNodeClick}
      style={{
        opacity: isDisabled ? 0.5 : 1,
        padding: "0 8px",
        borderRadius: "4px",
        "&:hover": {
          background: "#eee",
        },
      }}>
      {node.label}
    </span>
  );
});

export default TreeNodeRenderer;