import { useCallback, useState } from "react";
import {
  useEdgesState,
  useNodesState,
  useReactFlow,
  addEdge,
  type Node,
} from "@xyflow/react";
import { getLayoutedElements } from "@utils/index";

export default function useFlowCanvas() {
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [layoutDirection, setLayoutDirection] = useState("TB");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: crypto.randomUUID(),
        type,
        position,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (connection: object) => {
      setEdges((eds) => addEdge({ ...connection, type: "custom" }, eds));
    },
    [setEdges]
  );

  const onLayout = useCallback(
    (e) => {
      const layouted = getLayoutedElements(nodes, edges, {
        direction: e.target.value,
      });
      setLayoutDirection(e.target.value);
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
      fitView();
    },
    [nodes, edges, fitView, setNodes, setEdges]
  );

  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    setIsOpen(true);
    setSelectedNode(node);
  }, []);

  const handleDrawerSubmit = useCallback(
    (formValues: object) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === selectedNode?.id
            ? { ...n, data: { ...n.data, ...formValues } }
            : n
        )
      );
      setSelectedNode(null);
    },
    [selectedNode, setNodes]
  );

  const handleCloseDrawer = useCallback(() => {
    setIsOpen(false);
    setSelectedNode(null);
  }, []);

  return {
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
    selectedEdge,
    setSelectedEdge,
    isOpen,
  };
}
