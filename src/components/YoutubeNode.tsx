import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { YoutubeNode } from "../nodes/types";

const YoutubeNodeComponent: React.FC<NodeProps<YoutubeNode>> = ({ data }) => {
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
      <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
        {data.label}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "10px 0" }} />
      <div style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "10px" }}>
        {data.description}
      </div>

      <div
        style={{
          fontSize: "12px",
          backgroundColor: "#f3f4f6",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          marginBottom: "15px",
        }}
      >
        <strong>Function:</strong> Input: <em>playlistId/html</em>, Output: <em>playlist tracks</em>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </div>
    </div>

  );
};

export default YoutubeNodeComponent;
