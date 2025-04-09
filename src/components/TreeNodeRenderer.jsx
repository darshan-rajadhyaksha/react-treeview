import React, { memo, useCallback } from "react";

const TreeNodeRenderer = memo(({ node, isDisabled, handleClick }) => {

	const onTreeNodeClick = useCallback(() => {
		if(!isDisabled){
			handleClick();
		}
	}, [isDisabled, handleClick]);

  return (
		<span 
			onClick={onTreeNodeClick}
			style={{ 
				opacity: isDisabled ? 0.5 : 1,
				padding: "0.135em 0.25em",
				borderRadius: "0.25em",
				"&:hover": {
					background: "#eee",
				},
			}}>
			{node.label}
		</span>
	);
});

export default TreeNodeRenderer;