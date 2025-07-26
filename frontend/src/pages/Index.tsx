import withRouter from "@utils/withRouter";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
} from "@xyflow/react";
import { Radio } from "antd";
import {
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowLeft,
} from "react-icons/ai";
import useFlowCanvas from "@hooks/useFlowCanvas";
import { edgeTypes, nodeTypes } from "@configs/appData";
import SettingsFormDrawer, { FormValues } from "@components/SettingsDrawer";
import "@xyflow/react/dist/style.css";

const FlowCanvas = ({ isDarkMode }) => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    onLayout,
    onNodeDoubleClick,
    handleDrawerSubmit,
    handleCloseDrawer,
    layoutDirection,
    selectedNode,
    // selectedEdge,
    setSelectedEdge,
    isOpen,
  } = useFlowCanvas();

  console.log("nodes: ", nodes);

  return (
    <main className="h-full w-full">
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeClick={(_, edge) => setSelectedEdge(edge)}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: "smoothstep" }}
        colorMode={isDarkMode ? "dark" : "light"}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="top-right">
          <Radio.Group
            options={[
              {
                label: <AiOutlineInsertRowAbove className="h-full" />,
                value: "TB",
              },
              {
                label: <AiOutlineInsertRowLeft className="h-full" />,
                value: "LR",
              },
            ]}
            onChange={onLayout}
            value={layoutDirection}
            optionType="button"
          />
        </Panel>
      </ReactFlow>

      <SettingsFormDrawer
        open={isOpen}
        initialData={selectedNode?.data as unknown as FormValues}
        onClose={handleCloseDrawer}
        onSubmit={handleDrawerSubmit}
      />
    </main>
  );
};

export default withRouter(FlowCanvas);
