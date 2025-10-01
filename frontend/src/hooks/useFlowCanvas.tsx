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
    console.log(node);
    setIsOpen(true);
    setSelectedNode(node);
  }, []);

  const handleDrawerSubmit = useCallback(
    (formValues: FormValues) => {
      // 1. Update nodes (relationships only)
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === selectedNode?.id) {
            return {
              ...n,
              data: { ...n.data, ...formValues },
            };
          }

          const rel = formValues.relationships?.find((r) => r.sim === n.id);
          if (rel) {
            const relConfig = relationship.find(
              (r) => r.value === rel.relationship
            );

            const inverse =
              relConfig?.relationships?.target === rel.relationship
                ? relConfig?.relationships?.source
                : relConfig?.relationships?.target;

            // avoid pushing duplicate relationships
            const already = n.data?.relationships?.some(
              (r) => r.sim === selectedNode.id && r.relationship === inverse
            );

            if (!already) {
              return {
                ...n,
                data: {
                  ...n.data,
                  relationships: [
                    ...(n.data?.relationships || []),
                    {
                      sim: selectedNode.id,
                      relationship: inverse,
                    },
                  ],
                },
              };
            }
          }

          return n;
        })
      );

      // 2. Update edges safely (no duplicates)
      setEdges((prevEdges) => {
        const newEdges = formValues.relationships
          .filter(
            (rel) =>
              !prevEdges.some(
                (pe) =>
                  (pe.source === selectedNode.id &&
                    pe.target === rel.sim &&
                    pe.data?.relationship === rel.relationship) ||
                  (pe.source === rel.sim &&
                    pe.target === selectedNode.id &&
                    pe.data?.relationship === rel.relationship)
              )
          )
          .map((rel) => ({
            id: crypto.randomUUID(),
            source: selectedNode.id,
            target: rel.sim,
            type: "custom",
            label: relationship.find((r) => r.value === rel.relationship)
              ?.label,
            data: { relationship: rel.relationship },
          }));

        return [...prevEdges, ...newEdges];
      });

      setSelectedNode(null);
    },
    [selectedNode, setNodes, setEdges]
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
