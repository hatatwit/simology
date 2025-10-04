import { Handle, Position } from "@xyflow/react";
import { Fragment } from "react/jsx-runtime";

const SpouseNode = () => {
  return (
    <Fragment>
      💍
      <Handle type="source" position={Position.Left} id="source-left" />
      <Handle type="source" position={Position.Right} id="source-right" />
    </Fragment>
  );
};

export default SpouseNode;
