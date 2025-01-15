

import { AppNode } from "./types";


const fetchAndProcessHtml = async (fetchPlayListURL: string) => {
  try {
    console.log('Playlist URL:', fetchPlayListURL);
    if (!fetchPlayListURL || fetchPlayListURL === '') {
      console.error('Playlist ID is null or undefined.');
      return;
    }
    const response = await fetch(fetchPlayListURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const html = await response.text();
    return getTrackDetails(html);
  } catch (error) {
    console.error('Failed to fetch HTML:', error);
  }
}

const getTrackDetails = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const items = doc.querySelectorAll("ytmusic-responsive-list-item-renderer");
  const details = Array.from(items).map((item) => {
    const formattedStrings = item.querySelectorAll(
      "yt-formatted-string[title]"
    );
    return {
      title: formattedStrings[0]?.getAttribute("title") || null, // Main title
      artist: formattedStrings[1]?.getAttribute("title") || null, // Artist
      album: formattedStrings[2]?.getAttribute("title") || null, // Album
      time: formattedStrings[3]?.getAttribute("title") || null, // Time
    };
  });

  console.log("Extracted Details:", details);
  return details;
};

const downloadCSV = (csv: any, filename = "data.csv") => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const convertToCSV = (data: any) => {
  // Get headers (keys of the object)
  const headers = Object.keys(data[0]).join(",") + "\n";

  // Convert each object to a comma-separated string
  const rows = data.map((row: any) =>
    Object.values(row).map((value) => `"${value}"`).join(",")
  ).join("\n");

  // Combine headers and rows
  return headers + rows;
};


export const initialNodes: AppNode[] = [
  {
    id: "custom-1",
    type: "custom-input-node",
    position: { x: 400, y: 100 },
    data: {
      label: "Text Node",
      description: "Takes an input - playlist id.",
      output: [
        {
          name: "playlistId",
          value: "fsdfsf",
        }
      ]
    }
  },
  {
    id: "custom-2",
    type: "youtube-node",
    position: { x: 400, y: 100 },
    data: {
      label: "Youtube Node",
      description: "Get playlist details from youtube",
      output: [
        {
          name: "tracks",
          value: [],
        }
      ],
      execute: async (id : string, playlistId : string) => {
        return await fetchAndProcessHtml(`http://localhost:3000/api/fetch-html?playlistid=${playlistId}`).then((data) => {
          console.log('Data:', data);
          // tracks list
          return data;
        });
      }
    }
  },
  // {
  //   id: "custom-2",
  //   type: "spotify-input-node",
  //   position: { x: 600, y: 100 },
  //   data: {
  //     label: "Spotify Access Node",
  //     onInputChange: (id, value) => {
  //       console.log(`Node ${id} input changed to:`, value);
  //     },
  //   }
  // },
  {
    id: "custom-3",
    type: "output-node",
    position: { x: 800, y: 200 },
    data: {
      label: "Save Output Node",
      outputFileName: "output.csv",
      execute: (id, outputFileName, value) => {
        console.log(`Node ${id} input changed to:`, value);
        const data = convertToCSV(value);
        if(data === '') {
          console.error('No data to save.');
          return;
        }
        downloadCSV(data, outputFileName);
      },
    }
  },
  // {
  //   id: "custom-4",
  //   type: "spotify-search-track-node",
  //   position: { x: 1000, y: 200 },
  //   data: {
  //     label: "Spotify Search Track Node",
  //     onInputChange: (id, value) => {
  //       console.log(`Node ${id} input changed to:`, value);
  //     },
  //   }
  // },
  // {
  //   id: "custom-5",
  //   type: "spotify-create-track-node",
  //   position: { x: 1100, y: 200 },
  //   data: {
  //     label: "Spotify Create Track Node",
  //     onInputChange: (id, value) => {
  //       console.log(`Node ${id} input changed to:`, value);
  //     },
  //   }
  // }
];


