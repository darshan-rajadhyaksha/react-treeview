import ReactDOM from "react-dom/client";
import TreeView from "../src/index";

const treeData = [
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

function App() {
  return (
    <div className="tree-view-preview">
      <TreeView
        treeData={treeData}

        showLine
        enableSelection
      />
    </div>
  )
}

const reactRoot = ReactDOM.createRoot(
  document.querySelector("#root")
);
reactRoot.render(<App />);
