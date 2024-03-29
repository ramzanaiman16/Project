import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import "./chat.css";
import Spiner from "../../components/Spiner/Spiner";

function ChatConnection() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showspin, setShowSpin] = useState(true);

  const joinRoom = () => {
    if (username.trim() !== "" && room.trim() !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  const socket = io.connect("https://sttockery.netlify.app/.netlify/functions/App");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="App-chat">
          {!showChat ? (
            <div className="joinChatContainer">
              <h3>Join A Chat</h3>
              <input
                type="text"
                placeholder="John..."
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => setRoom(event.target.value)}
              />
              <button onClick={joinRoom}>Join A Room</button>
            </div>
          ) : (
            <Chat socket={socket} username={username} room={room} />
          )}
        </div>
      )}
    </>
  );
}

export default ChatConnection;
