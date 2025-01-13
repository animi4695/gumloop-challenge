import React, { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

type CustomNodeProps = {
  id: string;
  data: {
    label: string;
    onInputChange?: (id: string, value: string) => void;
    onFileUpload?: (id: string, file: File | null) => void;
  };
};

const OutputNode: React.FC<CustomNodeProps> = ({ id, data }) => {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (data.onInputChange) {
        data.onInputChange(id, event.target.value);
      }
    },
    [data, id]
  );

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        width: "250px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div>{data.label}</div>
      <hr></hr>
      <input
        type="text"
        placeholder="Enter Output Name"
        onChange={handleInputChange}
        style={{ width: "100%", margin: "10px 0", padding: "5px" }}
      />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default OutputNode;
