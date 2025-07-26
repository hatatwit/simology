import { useCallback, useState } from "react";
import {
  useEdgesState,
  useNodesState,
  useReactFlow,
  addEdge,
  type Node,
} from "@xyflow/react";
import { getLayoutedElements } from "@utils/index";
import { relationship } from "@configs/appData";
import { FormValues } from "@components/SettingsDrawer";

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
    (formValues: FormValues) => {
      // Update node data
      setNodes((nds) =>
        nds.map((n) =>
          n.id === selectedNode?.id
            ? { ...n, data: { ...n.data, ...formValues } }
            : n
        )
      );

      // Update and draw edges
      const newEdges = formValues.relationships.map((rel) => ({
        id: crypto.randomUUID(),
        source: selectedNode.id,
        target: rel.sim,
        type: "custom",
        label: relationship.find((r) => r.value === rel.relationship)?.label,
        data: { relationship: rel.relationship },
      }));
      setEdges((prevVal) => [...prevVal, ...newEdges]);

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
