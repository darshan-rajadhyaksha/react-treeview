import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import TreeNodeIconRenderer from "../../components/TreeNodeIconRenderer";

describe("TreeNodeIconRenderer", () => {

  it("should render icon for non-leaf tree node", () => {
    const props = {
      node: {
        label: "Folder 1",
        key: "1",
        children: [
          {
            label: "File 1.1",
            key: "1.1"
          }
        ]
      },
      isLeafNode: false,
    };

    render(
      <TreeNodeIconRenderer {...props} />
    );
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.queryByText("*")).toBe(null);
  });

  it("should render icon for leaf tree node", () => {
    const props = {
      node: {
        label: "File 1.1",
        key: "1.1"
      },
      isLeafNode: true,
    };

    render(
      <TreeNodeIconRenderer {...props} />
    );
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.queryByText("+")).toBe(null);
  });

});
