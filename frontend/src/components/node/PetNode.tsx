import { Handle, Position } from "@xyflow/react";
import { Avatar, Typography } from "antd";
import { MdPets } from "react-icons/md";

const PetNode = ({ data }) => {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Bottom} id="target-bottom" />
      <Handle type="target" position={Position.Right} id="target-right" />
      <Avatar size={48} icon={<MdPets />} src={data?.avatar} />
      <Typography.Paragraph className="text-center">
        {data?.name || "Pet"}
      </Typography.Paragraph>
      <Handle type="source" position={Position.Top} id="source-top" />
      <Handle type="source" position={Position.Left} id="source-left" />
    </div>
  );
};

export default PetNode;
