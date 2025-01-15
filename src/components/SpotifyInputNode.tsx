import React, { useCallback } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { SpotifyInputNode } from "../nodes/types";
import useGumloopStore, { usePlaylistStore } from "../store";

const SpotifyInputNodeComponent: React.FC<NodeProps<SpotifyInputNode>> = ({ id, data }) => {
  const updateSpotifyToken = useGumloopStore((state) => state.updateSpotifyToken);
  const updateSpotifyPlaylistName = useGumloopStore((state) => state.updateSpotifyPlaylistName);

  const spotifyToken = data.bearerToken;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // change the playlist name
    updateSpotifyPlaylistName(id, event.target.value);
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

      {/* Spotify Token Input */}
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

      {/* Playlist Name Input */}
      <div>
        <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Playlist Name:
        </label>
        <input
          type="text"
          placeholder="Enter Playlist Name"
          onChange={onInputChange}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
      </div>

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
          id="bearerTokenInput"
          position={Position.Bottom}
          style={{
            width: "10px",
            height: "10px",
            left: "25%",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        <Handle
          type="source"
          id="playlistNameInput"
          position={Position.Bottom}
          style={{
            width: "10px",
            height: "10px",
            left: "75%",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </div>
    </div>

  );
};

export default SpotifyInputNodeComponent;
