import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import useGumloopStore from "../store";
import { CustomNode } from "../nodes/types";

const PlayListInputNode: React.FC<NodeProps<CustomNode>> = ({ id, data }) => {

  const [inputType, setInputType] = useState("htmlContent");

  const inputTypes = ["playlistId", "htmlContent"];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(event.target.value);
  };

  const updateCustomNode = useGumloopStore((state) => state.updateCustomNode);

  const updateOutput = (outputName: string, value: string) => {
    updateCustomNode(id, outputName, value);
    updateCustomNode(id, inputTypes.find((type) => type !== outputName)!, "");
  };

  const playListid = data.output.find((output) => output.name === "playlistId")!.value ?? "";

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files?.[0];
      console.log('Selected File:', event.target.files);
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const htmlContent = e.target?.result as string;
          updateOutput("htmlContent", htmlContent);
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
      <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
        {data.label}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "10px 0" }} />
      <div style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>
        {data.description}
      </div>
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
          <option value="playlistId">Playlist ID</option>
          <option value="htmlContent">File</option>
        </select>
      </div>
      {inputType === "playlistId" && (
        <input
          type="text"
          placeholder="Enter Playlist ID"
          onChange={(e) => updateOutput("playlistId", e.target.value)}
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
      {inputType === "htmlContent" && (
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
