import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { SpotifyCreateTrackNode } from "../nodes/types";
import useGumloopStore from "../store";

const SpotifyCreatePlaylistNodeComponent: React.FC<NodeProps<SpotifyCreateTrackNode>> = ({ id, data }) => {

  const updateSpotifyPlaylistName = useGumloopStore((state) => state.updateSpotifyPlaylistName);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <strong>Function Node:</strong> Input: <em>Spotify Token, Playlist Name (assuming it doesn't exist already), list of tracks to create</em>, Output: <em>Added List of Spotify Tracks to Playlist</em>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Spotify Playlist Name:
        </label>
        <input
          type="text"
          placeholder="Enter Playlist Name"
          value={data.playlistName}
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
      <Handle
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#6c757d",
          borderRadius: "50%",
          cursor: "pointer",
          left: "25%",
        }}
        id="a"
        type="target"
        position={Position.Top}
      />
      <Handle
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#6c757d",
          borderRadius: "50%",
          cursor: "pointer",
          left: "75%",
        }}
        id="b"
        type="target"
        position={Position.Top}
      />
    </div>

  );
};

export default SpotifyCreatePlaylistNodeComponent;
