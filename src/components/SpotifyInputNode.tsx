import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { SpotifyInputNode } from "../nodes/types";

const SpotifyInputNodeComponent: React.FC<NodeProps<SpotifyInputNode>> = ({ data }) => {

  const spotifyToken = data.bearerToken;

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
      <div style={{ marginBottom: "10px" }}>
        <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Spotify Token:
        </label>
        <input
          type="text"
          placeholder="Enter Bearer Token"
          value={spotifyToken}
          readOnly
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
      </div>
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

  );
};

export default SpotifyInputNodeComponent;
