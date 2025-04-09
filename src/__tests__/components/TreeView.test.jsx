import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import TreeView from "@src/components/TreeView";

const getMockProps = (mock = {}) => {
  return {
    treeData:  [{
      label: "Folder 1",
      key: "1",
      children: [
        {
          label: "Folder 1.1",
          key: "1.1",
          children: [
            {
              label: "File 1.1.1",
              key: "1.1.1",
            }
          ],
        },
        {
          label: "File 1.2",
          key: "1.2"
        },
        {
          label: "File 1.3",
          key: "1.3"
        },
        {
          label: "Folder 1.4",
          key: "1.4",
          children: [
            {
              label: "File 1.4.1",
              key: "1.4.1",
            }
          ]
        }
      ]
    }],
    ...mock,
  }
}

describe("TreeView", () => {

  it("should render tree-view", () => {
    const props = getMockProps();

    render(
      <TreeView {...props} />
    );

    const treeNode = screen.getByText(/Folder 1/);
    expect(treeNode).toBeInTheDocument();
  });

  it("should render checkbox for tree node selection", () => {
    const props = getMockProps({
      enableSelection: true,
    });

    const { container } = render(
      <TreeView {...props} />
    );

    const level1treeNode = screen.getByText(/Folder 1/);
    expect(level1treeNode).toBeInTheDocument();
    expect(container.querySelectorAll("input[type='checkbox']").length).toBe(1);
    fireEvent.click(level1treeNode);
    expect(container.querySelectorAll("input[type='checkbox']").length).toBe(5);

    const leafNode = screen.getByText(/Folder 1.1/);
    expect(leafNode).toBeInTheDocument();
    expect(container.querySelectorAll("input[type='checkbox']").length).toBe(5);
  });

  it("should expand/collapse non-leaf tree node", () => {
    const props = getMockProps();

    render(
      <TreeView {...props} />
    );

    const level1treeNode = screen.getByText(/Folder 1/);
    expect(level1treeNode).toBeInTheDocument();
    fireEvent.click(level1treeNode);

    const leafNode = screen.getByText(/Folder 1.1/);
    expect(leafNode).toBeInTheDocument();

    fireEvent.click(level1treeNode);
    expect(leafNode).not.toBeInTheDocument();
  });

  it("should call onClick handler on expand/collapse on tree node", () => {
    const props = getMockProps({
      onClick: jest.fn(),
    });

    render(
      <TreeView {...props} />
    );

    const level1treeNode = screen.getByText(/Folder 1/);
    expect(level1treeNode).toBeInTheDocument();
    fireEvent.click(level1treeNode);

    const leafNode = screen.getByText(/File 1.2/);
    expect(leafNode).toBeInTheDocument();
    expect(props.onClick).toBeCalled();

    fireEvent.click(leafNode);
    expect(props.onClick).toBeCalled();

    fireEvent.click(level1treeNode);
    expect(leafNode).not.toBeInTheDocument();
    expect(props.onClick).toBeCalled();
  });

  it("should call onCheck handler on select/deselect of tree node", () => {
    const props = getMockProps({
      enableSelection: true,
      onCheck: jest.fn(),
    });

    const { container } = render(
      <TreeView {...props} />
    );

    const level1treeNode = screen.getByText(/Folder 1/);
    expect(level1treeNode).toBeInTheDocument();
    const level1treeNodeCheckbox = container.querySelectorAll("input[type='checkbox'")[0];
    expect(level1treeNodeCheckbox).toBeInTheDocument();

    fireEvent.click(level1treeNodeCheckbox);
    expect(level1treeNodeCheckbox.checked).toBe(true);
    expect(props.onCheck).toBeCalled();

    fireEvent.click(level1treeNodeCheckbox);
    expect(level1treeNodeCheckbox.checked).toBe(false);
    expect(props.onCheck).toBeCalled();

  });

  it("should not call onCheck handler on select/deselect of tree node", () => {
    const props = getMockProps({
      defaultDisabledKeys: ["1"],
      enableSelection: true,
      onCheck: jest.fn(),
    });

    const { container } = render(
      <TreeView {...props} />
    );

    const level1treeNode = screen.getByText(/Folder 1/);
    expect(level1treeNode).toBeInTheDocument();
    const level1treeNodeCheckbox = container.querySelectorAll("input[type='checkbox'")[0];
    expect(level1treeNodeCheckbox).toBeInTheDocument();

    expect(level1treeNodeCheckbox.disabled).toBe(true);
  });

  it("should render icon if showIcon is set", () => {
    const props = getMockProps({
      showIcon: true,
    });

    render(
      <TreeView {...props} />
    );

    const level1treeNodeIcon = screen.getByText(/\+/);
    expect(level1treeNodeIcon).toBeInTheDocument();
  });

});