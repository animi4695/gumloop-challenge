import React, { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import useGumloopStore from "../store";
import { CustomNodeProps } from "../nodes/types";

const OutputNode: React.FC<CustomNodeProps> = ({ id, data }) => {

  const updateOutputNodeFileName = useGumloopStore((state) => state.updateOutputNodeFileName);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateOutputNodeFileName(id, event.target.value);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        width: "320px",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      {/* Label Header */}
      <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
        {data.label}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "10px 0" }} />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter Output Name"
        onChange={onInputChange}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
          marginBottom: "10px",
        }}
      />

      {/* Handle Target */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </div>
    </div>

  );
};

export default OutputNode;
