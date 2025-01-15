import React, { useCallback, useEffect, useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { usePlaylistStore, useHtmlStore } from "../store";
import { CustomNode, CustomNodeProps } from "../nodes/types";

const PlayListInputNode: React.FC<NodeProps<CustomNode>> = ({ id, data }) => {

  const [inputType, setInputType] = useState("playlistid");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(event.target.value);
  };

  const setPlaylistId = usePlaylistStore((state) => state.updatePlaylistId);
  const setHtmlContent = useHtmlStore((state) => state.setHtmlContent);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistId(event.target.value);
  };

  const playListid = data.output.find((output) => output.name === "playlistId")!.value ?? "";

  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);

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
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        width: "280px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>{data.label}</div>
      <hr />
      <br />
      <span>Select input type:</span>
      <select
        name="inputtype"
        id="inputtype"
        style={{ width: "100%", margin: "10px 0", padding: "5px" }}
        value={inputType}
        onChange={handleSelectChange}
      >
        <option value="playlistid">Playlist ID</option>
        <option value="file">File</option>
      </select>
      {inputType === "playlistid" && (
        <input
          type="text"
          placeholder="Enter Playlist ID"
          onChange={onInputChange}
          value={playListid}
          style={{ width: "100%", margin: "10px 0", padding: "5px" }}
        />
      )}
      {inputType === "file" && (
        <input
          type="file"
          onChange={onFileChange}
          style={{
            marginBottom: "10px",
            display: "block",
            width: "100%",
            padding: "5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        />
      )}
      <Handle type="source" position={Position.Bottom} />
      {/* <Handle type="target" position={Position.Top} /> */}
    </div>
  );
};

export default PlayListInputNode;
