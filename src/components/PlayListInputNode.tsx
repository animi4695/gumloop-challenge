import React, { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { usePlaylistStore } from "../store";

type CustomNodeProps = {
  id: string;
  data: {
    label: string;
    onInputChange?: (id: string, value: string) => void;
    onFileUpload?: (id: string, file: File | null) => void;
  };
};

const PlayListInputNode: React.FC<CustomNodeProps> = ({ id, data }) => {

  const setPlaylistId = usePlaylistStore((state) => state.updatePlaylistId);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (data.onInputChange) {
        // update state
        setPlaylistId(event.target.value);
        
        data.onInputChange(id, event.target.value);
      }
    },
    [data, id]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (data.onFileUpload) {
        const file = event.target.files?.[0] || null;
        data.onFileUpload(id, file);
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
        placeholder="Enter Playlist ID"
        onChange={handleInputChange}
        style={{ width: "100%", margin: "10px 0", padding: "5px" }}
      />
      <p style={{textAlign: "center", padding: "10px",}}>OR</p>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <Handle type="source" position={Position.Bottom} />
      {/* <Handle type="target" position={Position.Top} /> */}
    </div>
  );
};

export default PlayListInputNode;
