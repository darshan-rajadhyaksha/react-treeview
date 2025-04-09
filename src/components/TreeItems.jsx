import React, { useMemo, useCallback, memo } from "react";
import { useTreeviewContext } from "./TreeViewContext";
import { getClassName } from "../utils";

const TreeItems = memo((props) => {
  
  const { node } = props;

  const {
		// event handler
    onClick,
    onCheck,
		
		// renderer
    TreeNodeRenderer,
    TreeNodeIconRenderer,
		
		// config options
    expandedKeys,
    selectedKeys,
		disabledKeys,
		
		// ui-boolean
		enableSelection,
		showIcon,
		
		// reducer dispatch
		dispatch,
  } = useTreeviewContext();
  
  const isExpanded = expandedKeys.has(node.key);
  const isSelected = selectedKeys.has(node.key);
	const isDisabled = disabledKeys.has(node.key);
  const isLeafNode = !("children" in node);
  
  const ariaProps = {
    "aria-expanded": isExpanded,
    "aria-selected": isSelected,
  };
  
  const handleClick = useCallback(() => {
		if(!isLeafNode){
			if(isExpanded){
				dispatch({
					type: "collapse_node",
					payload: {
						key: node.key,
					}
				});
			} else {
				dispatch({
					type: "expand_node",
					payload: {
						key: node.key,
					}
				});
			}
		}
		
    onClick?.({
      node,
      isExpanded: !isExpanded,
      isSelected,
    });
  }, [node, isExpanded, dispatch, isSelected, onClick]);
  
  const handleSelect = useCallback(() => {
    if(isSelected){
			dispatch({
				type: "unselect_node",
				payload: {
					key: node.key,
				}
			});
		} else {
			dispatch({
				type: "select_node",
				payload: {
					key: node.key,
				}
			});
		}
		
		
    onCheck?.({
      node,
      isSelected: !isSelected,
      isExpanded,
    });
  }, [node, isExpanded, dispatch, isSelected, onCheck]); 
	
	const classes = useMemo(() => {
		return {
			treeNode: getClassName({
				"tree-node": true,
				"tree-node-leaf": isLeafNode,
			}),
			treeNodeIcon: getClassName({
				"tree-node__icon": true,
				"tree-node__icon--hidden": !showIcon,
			}),
			treeNodeCheckbox: getClassName({
				"tree-node__checkbox": true,
				"tree-node__checkbox--hidden": !enableSelection,
			}),
		}
	}, [showIcon, enableSelection, isLeafNode, getClassName]);
	
	const customRendererProps = {
		node,
		isLeafNode,
		isExpanded,
		isSelected,
		isDisabled,
		handleClick,
		handleSelect,
	};
  
  return (
    <li 
      role="treeitem"
      key={node.key} 
			{...ariaProps}
    >
			<div className={classes.treeNode}>
				<span className="tree-node__expand-btn">
					{!isLeafNode ? (
						<button onClick={handleClick}>
							{isExpanded ? <>&#9660;</> : <>&#9654;</> }
						</button> 
					) : null}
				</span>
				<span className={classes.treeNodeIcon} aria-hidden="true">
					{showIcon ? (
						<TreeNodeIconRenderer 
							{...customRendererProps}
						/>
					): null}
				</span>
				<span className={classes.treeNodeCheckbox}>
					{enableSelection ? (
						<input 
							type="checkbox"
							checked={isSelected}
							disabled={isDisabled}
							onChange={handleSelect}
						/>
					) : null}
				</span>
				<span className="tree-node__label">
					<TreeNodeRenderer 
						{...customRendererProps}
					/>
				</span>
			</div>
			{isExpanded ? (
				<ul role="group">
					{node.children?.map?.((item) => (
						<TreeItems key={item.key} node={item}/>
					))}
				</ul>
			): null}
    </li>
  );
});

export default TreeItems;