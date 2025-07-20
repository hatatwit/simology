import { Handle, Position } from "@xyflow/react";
import { Avatar, Typography } from "antd";
import { AiOutlineUser } from "react-icons/ai";

const SimNode = ({ data }) => {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Bottom} id="target-bottom" />
      <Handle type="target" position={Position.Right} id="target-right" />
      <Avatar size={48} icon={<AiOutlineUser />} src={data?.avatar} />
      <Typography.Paragraph className="text-center">
        {data ? `${data?.firstName + " " + data?.lastName}` : "Name"}
      </Typography.Paragraph>
      <Handle type="source" position={Position.Top} id="source-top" />
      <Handle type="source" position={Position.Left} id="source-left" />
    </div>
  );
};

export default SimNode;
