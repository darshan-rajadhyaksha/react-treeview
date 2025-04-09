import React, { createContext, useContext } from "react";

const TreeviewContext = createContext();

export const useTreeviewContext = () => {
  const value = useContext(TreeviewContext);
  if(typeof value === 'undefined'){
    throw new Error("use useTreeviewContext inside TreeviewContext provided component tree");
  }
  return value;
};

export default TreeviewContext;