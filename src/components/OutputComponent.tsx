
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from "react";
import { NodeOutput } from '../nodes/types';

const OutputComponent: React.FC<NodeOutput> = ({ id, label, output, status, logs, time }) => {
  const bgColor = status === "RUNNING" ? "#FFF4E5" : status === "SUCCESS" ? "#E6F7E5" : "#fef2f2";
  const borderColor = status === "RUNNING" ? "#FFA500" : status === "SUCCESS" ? "#28A745" : "#fca5a5";
  const txtColor = status === "RUNNING" ? "#CC8400" : status === "SUCCESS" ? "#19692C" : "#b91c1c";

  return (
    <div className="p-4 text-gray-600">
      <div
        style={{
          padding: "20px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          backgroundColor: "#f9fafb",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Roboto', sans-serif",
          color: "#111827",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "12px",
            color: "#1f2937",
          }}
        >
          {label}
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e5e7eb",
            margin: "12px 0",
          }}
        />

        <div
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "12px",
            color: "#374151",
          }}
        >
          {
            logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))
          }
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            backgroundColor: bgColor,
            padding: "10px",
            borderRadius: "6px",
            border: `1px solid ${borderColor}`,
            color: txtColor,
          }}
        >
          <AccessTimeIcon style={{ fontSize: "16px", color: txtColor }} />{" "}
          <span>{time}s</span>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}

export default OutputComponent;