import { Handle, Position, useStore } from "@xyflow/react";
import { Avatar, Typography } from "antd";
import { AiOutlineUser } from "react-icons/ai";

const SimNode = ({ id, data }) => {
  // Access edges from React Flow store
  const edges = useStore((state) => state.edges);

  // Count existing edges for this node
  const targetEdges = edges.filter((e) => e.target === id);
  const sourceEdges = edges.filter((e) => e.source === id);

  // Validation: allow only one target and one source
  const canConnectTarget = () => targetEdges.length < 1;
  const canConnectSource = () => sourceEdges.length < 1;

  return (
    <div className="custom-node">
      {/* Avatar + Name */}
      <Avatar size={48} icon={<AiOutlineUser />} src={data?.avatar} />
      <Typography.Paragraph className="text-center">
        {data ? `${data?.firstName ?? ""} ${data?.lastName ?? ""}` : "Name"}
      </Typography.Paragraph>

      {/* Floating target (anywhere on node) */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        isConnectable
        isValidConnection={canConnectTarget}
        style={{ visibility: "hidden" }} // hide but still usable
      />

      {/* Floating source (anywhere on node) */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        isConnectable
        isValidConnection={canConnectSource}
        style={{ visibility: "hidden" }} // hide but still usable
      />
    </div>
  );
};

export default SimNode;
