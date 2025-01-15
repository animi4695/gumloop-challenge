import React, { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { CustomNodeProps } from "../nodes/types";
import { usePlaylistStore } from "../store";

const SpotifyNode: React.FC<CustomNodeProps> = ({ id, data }) => {
  const spotifyToken = usePlaylistStore((state) => state.spotifyToken);

  const setPlaylistName = usePlaylistStore((state) => state.updateSpotifyPlaylistName);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
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
      <hr></hr><br></br>
      <span>Spotify Token: </span>
      <input
        type="text"
        placeholder="Enter Bearer Token"
        value={spotifyToken}
        readOnly
        style={{ width: "100%", margin: "10px 0", padding: "5px" }}
      />
      <br></br>
      <span>Playlist Name:</span>
      <input
        type="text"
        placeholder="Enter Playlist Name"
        onChange={onInputChange}
        style={{ width: "100%", margin: "10px 0", padding: "5px" }}
      />
      <Handle type="source" position={Position.Bottom} />
      {/* <Handle type="target" position={Position.Top} /> */}
    </div>
  );
};

export default SpotifyNode;
