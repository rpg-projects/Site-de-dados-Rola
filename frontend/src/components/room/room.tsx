import React from "react";
import { useParams } from "react-router-dom"; // To get the room name from the URL

const Room = () => {
  const { roomName } = useParams<{ roomName: string }>(); // Get the room name from the URL

  return (
    <div>
      <h1>Room: {roomName}</h1>
      <p>Details of the {roomName} room will be displayed here.</p>
      {/* Fetch or show details for the specific room here */}
    </div>
  );
};

export default Room;
