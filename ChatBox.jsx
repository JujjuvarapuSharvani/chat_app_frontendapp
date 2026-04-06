import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// Change this to test user1 / user2
const userId = "user1";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("updateMessage", (msg) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? msg : m))
      );
    });
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:5000/messages");
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    await axios.post("http://localhost:5000/messages", {
      content: input,
      sender: userId,
    });

    setInput("");
  };

  const deleteForEveryone = async (id) => {
    await axios.put(`http://localhost:5000/messages/${id}/delete`);
  };

  const deleteForMe = async (id) => {
    await axios.put(`http://localhost:5000/messages/${id}/deleteForMe`, {
      userId,
    });
  };

  const pinMessage = async (id) => {
    await axios.put(`http://localhost:5000/messages/${id}/pin`);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>WhatsApp Chat</h2>

      <div
        style={{
          height: 400,
          overflowY: "scroll",
          background: "#e5ddd5",
          padding: 10,
        }}
      >
        {messages
          .filter((msg) => !msg.deletedFor.includes(userId))
          .sort((a, b) => b.isPinned - a.isPinned)
          .map((msg) => {
            const isMe = msg.sender === userId;

            return (
              <div
                key={msg._id}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    background: msg.isDeleted
                      ? "#ccc"
                      : msg.isPinned
                      ? "#fff3cd"
                      : isMe
                      ? "#dcf8c6"
                      : "#fff",
                    padding: 10,
                    borderRadius: 10,
                    maxWidth: "70%",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    {msg.isDeleted
                      ? "🚫 Message deleted"
                      : msg.content}
                    {msg.isPinned && " 📌"}
                  </p>

                  <small>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </small>

                  {isMe && (
                    <div>
                      <button onClick={() => deleteForMe(msg._id)}>
                        Delete Me
                      </button>

                      <button
                        onClick={() => deleteForEveryone(msg._id)}
                      >
                        Delete All
                      </button>

                      <button onClick={() => pinMessage(msg._id)}>
                        Pin
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;