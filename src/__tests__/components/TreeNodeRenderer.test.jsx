import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import TreeNodeRenderer from "@src/components/TreeNodeRenderer";

describe("TreeNodeRenderer", () => {

  it("should render non-leaf tree node properly", () => {
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
      onClick: jest.fn(),
      isDisabled: false,
    };

    render(<TreeNodeRenderer {...props} />);

    const treeNode = screen.getByText(/Folder 1/);
    expect(treeNode).toBeInTheDocument();
    fireEvent.click(treeNode);
    expect(props.onClick).toBeCalled();
  });

  it("should render leaf tree node properly", () => {
    const props = {
      node: {
        label: "File 1.1",
        key: "1.1"
      },
      onClick: jest.fn(),
      isDisabled: false,
    };

    render(<TreeNodeRenderer {...props} />);

    const treeNode = screen.getByText(/File 1.1/);
    expect(treeNode).toBeInTheDocument();
    fireEvent.click(treeNode);
    expect(props.onClick).toBeCalled();
  });

  it("should render disabled tree node properly", () => {
    const props = {
      node: {
        label: "File 1.1",
        key: "1.1",
      },
      onClick: jest.fn(),
      isDisabled: true,
    };

    render(<TreeNodeRenderer {...props} />);

    const treeDomNode = screen.getByText(/File 1.1/);
    expect(treeDomNode).toBeInTheDocument();
    expect(treeDomNode.style.opacity).toBe("0.5");
    fireEvent.click(treeDomNode);
    expect(props.onClick).not.toBeCalled();
  });

});