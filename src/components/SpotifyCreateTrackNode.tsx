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

const SpotifyCreateTrackNode: React.FC<CustomNodeProps> = ({ id, data }) => {
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
      <span>This node is a custom node that takes spotify track id, playlist id, found(Y/N) and outputs success(Y/N)</span>
      <p>
      input : found(Y/N), Spotify Track Id, PlaylistId
       output : success(Y/N)
      </p>

      <Handle  type="source" position={Position.Bottom} />
      <Handle style={{ left: '25%'}} id='a' type="target" position={Position.Top} />
      <Handle style={{ left: '75%'}} id='b' type="target" position={Position.Top} />
    </div>
  );
};

export default SpotifyCreateTrackNode;

// input : found(Y/N), Spotify Track Id, PlaylistId
// output : success(Y/N)
