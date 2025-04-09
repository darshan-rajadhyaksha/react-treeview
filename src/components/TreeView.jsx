import React, { useReducer, useMemo, memo } from "react";
import DefaultTreeNodeRenderer from "./TreeNodeRenderer";
import DefaultTreeNodeIconRenderer from "./TreeNodeIconRenderer";
import TreeItems from "./TreeItems";
import TreeviewContext from "./TreeViewContext";
import { getClassName } from "../utils";

const TreeView = memo((props) => {
  
  const { 
    treeData, // required
		
		enableSelection = false,
		showIcon = false,
		showLine = false,
		
    onCheck, 
    onClick,
		
    customTreeNodeRenderer,
		customIconRenderer,
		
		defaultExpandedKeys = [],
		defaultSelectedKeys = [],
		defaultDisabledKeys = [],
  } = props;

  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type){
			case 'expand_node': 
				state.expandedKeys.add(action.payload.key);
				return { ...state };
			case 'collapse_node': 
				state.expandedKeys.delete(action.payload.key);
				return { ...state };
			case 'select_node':
				state.selectedKeys.add(action.payload.key);
				return { ...state };
			case 'unselect_node': 
				state.selectedKeys.delete(action.payload.key);
				return { ...state };
    }
		return state;
  }, {
    expandedKeys: new Set([...defaultExpandedKeys]),
    selectedKeys: new Set([...defaultSelectedKeys]),
    disabledKeys: new Set([...defaultDisabledKeys]),
  });

  const TreeNodeRenderer = useMemo(() => (
    typeof customTreeNodeRenderer === 'function' ?  customTreeNodeRenderer : DefaultTreeNodeRenderer
  ), [DefaultTreeNodeRenderer, customTreeNodeRenderer]);

  const TreeNodeIconRenderer = useMemo(() => (
    typeof customIconRenderer === 'function' ? customIconRenderer : DefaultTreeNodeIconRenderer
  ), [DefaultTreeNodeIconRenderer, customIconRenderer]);

  const value = useMemo(() => ({
    ...state,
    TreeNodeRenderer,
    TreeNodeIconRenderer,
		enableSelection,
		showIcon,
    dispatch,
    onCheck,
    onClick
  }), [
    TreeNodeRenderer,
    TreeNodeIconRenderer,
		enableSelection,
		showIcon,
    state,
    dispatch,
    onCheck,
    onClick,
  ]);
	
	const classes = useMemo(() => ({
		treeViewWrapper: getClassName({
			"treeview-wrapper": true,
			"showLine": showLine,
		}),
	}), [showLine, getClassName]);
  
  return (
    <TreeviewContext.Provider value={value}>
			<div className={classes.treeViewWrapper}>
				<ul role="tree">
					{treeData.map((item) => (
						<TreeItems key={item.key} node={item} {...({onCheck, onClick})} />
					))}
				</ul>
			</div>
    </TreeviewContext.Provider>
  );
});

export default TreeView;
