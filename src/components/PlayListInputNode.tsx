import React, { useCallback, useEffect, useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import useGumloopStore, { usePlaylistStore, useHtmlStore } from "../store";
import { CustomNode, CustomNodeProps } from "../nodes/types";

const PlayListInputNode: React.FC<NodeProps<CustomNode>> = ({ id, data }) => {

  const [inputType, setInputType] = useState("playlistid");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(event.target.value);
  };

  const updateCustomNode = useGumloopStore((state) => state.updateCustomNode);

  const setHtmlContent = useHtmlStore((state) => state.setHtmlContent);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCustomNode(id, "playlistId", event.target.value);
  };

  const playListid = data.output.find((output) => output.name === "playlistId")!.value ?? "";

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const htmlContent = e.target?.result as string;
          setHtmlContent(htmlContent);
        };
        reader.readAsText(selectedFile);
      }
    }
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

      {/* Description */}
      <div style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
        {data.description}
      </div>

      {/* Input Type Selection */}
      <div style={{ marginBottom: "10px" }}>
        <span style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Select Input Type:
        </span>
        <select
          name="inputtype"
          id="inputtype"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            fontSize: "14px",
            marginBottom: "10px",
          }}
          value={inputType}
          onChange={handleSelectChange}
        >
          <option value="playlistid">Playlist ID</option>
          <option value="file">File</option>
        </select>
      </div>

      {/* Playlist ID Input */}
      {inputType === "playlistid" && (
        <input
          type="text"
          placeholder="Enter Playlist ID"
          onChange={onInputChange}
          value={playListid}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        />
      )}

      {/* File Upload Input */}
      {inputType === "file" && (
        <input
          type="file"
          onChange={onFileChange}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          }}
        />
      )}

      {/* Handle Source */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Handle
          type="source"
          position={Position.Bottom}
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

export default PlayListInputNode;
