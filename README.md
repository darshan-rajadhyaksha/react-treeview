# React-Treeview
### Features
- Customization of tree node and icon.
- Select / Unselect nodes.
- Disabled nodes.
- Performance

### Getting started
```sh
npm install @neui/react-treeview
```

or

```sh
yarn add @neui/react-treeview
```

### Prop types

| Prop name                | Type              | Default value | Description                                                     |
| ------------------------ | ----------------- | ------------- | --------------------------------------------------------------- |
| `data`                   | `array[node]`     | `required`    | Tree data                                                       |
| `treeNodeRenderer`       | `func`            | `noop`        | Render prop for the node (see below for more details)           |
| `iconRenderer`           | `func`            | `noop`        | Render prop for the node (see below for more details)           |
| `onClick`                | `func`            | `noop`        | Function called when a node is clicked                          |
| `onSelect`               | `func`            | `noop`        | Function called when a node is selected/deselected              |
| `enableSelection`        | `bool`            | `false`       | Allows nodes to be selected                                     |
| `showIcon`               | `bool`            | `false`       | Show icon for non-leaf and leaf node                            |
| `showLine`               | `bool`            | `false`       | Show line indicator to visualize depth of tree                  |
| `defaultSelectedKeys`    | `array[node.key]` | `[]`          | Array with the ids of the default selected nodes                |
| `defaultExpandedKeys`    | `array[node.key]` | `[]`          | Array with the ids of the default expanded nodes                |
| `defaultDisabledKeys`    | `array[node.key]` | `[]`          | Array with the ids of the default disabled nodes                |


### data (tree-node)

| Property   | Type          | Default     | Description                                                                          |
| ---------- | ------------- | --------    | ------------------------------------------------------------------------------------ |
| `name`     | `string`      | required    | Used to match on key press                                                           |
| `children` | `array[node]` | undefined   | An array with the children nodes. If absent then node will be treated as leaf node   |
| `key`      | `string`      | required    | A string that uniquely identifies the node                                           |

Example:

```js static
const data = [
  {
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
          },
          {
            label: "File 1.1.2",
            key: "1.1.2",
          },
          {
            label: "Folder 1.1.3",
            key: "1.1.3",
            children: [
              {
                label: "File 1.1.1.1",
                key: "1.1.1.1",
              },
            ],
          }
        ]
      },
      {
        label: "Folder 1.2",
        key: "1.2",
        children: [
          {
            label: "File 1.2.1",
            key: "1.2.1",
          },
          {
            label: "File 1.2.2",
            key: "1.2.2",
          }
        ]
      }
    ]
  }
];
```

### onClick
`onClick({ node, isSelected, isExpanded, isDisabled })`

### onSelect
`onClick({ node, isSelected, isExpanded, isDisabled })`

### treeNodeRenderer & iconRenderer

| Property         | Type         | Description                                                                                           |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `node`           | `object`     | The object that represents the tree node                                                              |
| `isLeafNode`     | `bool`       | Whether the rendered node is a tree leaf node                                                         |
| `isSelected`     | `bool`       | Whether the rendered node is selected                                                                 |
| `isExpanded`     | `bool`       | Whether the rendered node is expanded                                                                 |
| `isDisabled`     | `bool`       | Whether the rendered node is disabled                                                                 |
| `onClick`        | `function`   | Function to assign to the onClick event handler of the element(s) that will toggle the expanded state |
| `onSelect`       | `function`   | Function to assign to the onClick event handler of the element(s) that will toggle the selected state |
