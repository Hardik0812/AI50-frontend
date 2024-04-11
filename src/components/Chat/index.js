import React, { useState, useEffect } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket("ws://127.0.0.1:5000/ws/chat/");
    websocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data.message);
    };
    setWs(websocket);
    return () => websocket.close();
  }, []);

  const sendMessage = () => {
    ws && ws.send(JSON.stringify({ message }));
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
