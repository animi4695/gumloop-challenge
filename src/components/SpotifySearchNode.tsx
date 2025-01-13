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

const SpotifySearchTrackNode: React.FC<CustomNodeProps> = ({ id, data }) => {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (data.onInputChange) {
        data.onInputChange(id, event.target.value);
      }
    },
    [data, id]
  );

  const DEFAULT_HANDLE_STYLE = {
    width: 10,
    height: 10,
    bottom: -5,
  };

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
      <span>This note is a custom node that takes spotify bearer token, track details (track name, artist name, album name) and outputs found(Y/N), Spotify Track Id</span>
      <p>
        input : spotify bearer token, track details (track name, artist name, album name)
        output : found(Y/N), Spotify Track Id
      </p>

      <Handle  type="target" position={Position.Top} />
      <Handle style={{ left: '25%'}} id='a' type="source" position={Position.Bottom} />
      <Handle style={{ left: '75%'}} id='b' type="source" position={Position.Bottom} />
    </div>
  );
};

export default SpotifySearchTrackNode;

// input : spotify bearer token, track details (track name, artist name, album name)
// output : found(Y/N), Spotify Track Id, 
