import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { Container } from "../commons";
import { Link } from "react-router-dom"; // Import Link for navigation

interface Room {
  _id: string;
  name: string;
  created_at: Date;
}

function Home() {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>([]); // State to store the rooms
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(""); // State for errors

  const id = auth()!.id;
  const playerId = auth()!.playerId;

  const logout = () => {
    signOut();
    navigate("/login");
  };

  useEffect(() => {
    // Fetch rooms when the component mounts
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/rooms", {
          withCredentials: true,
        });
        setRooms(response.data); // Set rooms with API response
      } catch (err) {
        console.log("Error fetching rooms:", err);
        setError("Error fetching rooms");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <HeadingXXLarge color="secondary500">
        Welcome {playerId[0] + playerId.slice(1).toLowerCase()}
      </HeadingXXLarge>
      <div>
        <h1>Room List</h1>
        {rooms.length > 0 ? (
          <ul>
            {rooms.map((room) => (
              <li key={room._id}>
                {/* Link to the room's page */}
                <Link to={`/room/${room.name}`}>{room.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No rooms available</p>
        )}
      </div>

      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}

export { Home };
