import { Handle, Position } from "@xyflow/react";
import { Fragment } from "react/jsx-runtime";

const ChildrenNode = () => {
  return (
    <Fragment>
      🐣
      {/* Bottom handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className="handle"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        className="handle"
      />
      {/* Left handles */}
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        className="handle"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        className="handle"
      />
      {/* Right handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        className="handle"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        className="handle"
      />
    </Fragment>
  );
};

export default ChildrenNode;
