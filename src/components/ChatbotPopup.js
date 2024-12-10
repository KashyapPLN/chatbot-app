import React, { useState } from "react";
import './ChatbotPopup.css';
import user from '../assets/user.png';
import bot from '../assets/bot.png';

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setLoading(true);
      setTimeout(() => {
        const botReply = `You said: "${input}"`;
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botReply },
        ]);
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
            <h3>Chatbot</h3>
            <button onClick={toggleChatbot} className="text-white font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
  <div
    key={index}
    className={`flex items-start mb-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
  >
    {message.sender !== "user" && (
      <img
        src={bot}
        alt="Bot"
        className="w-6 h-6 flex-shrink-0 mr-2"
      />
    )}
    <div
      className={`max-w-[75%] break-words px-3 py-2 rounded-lg ${
        message.sender === "user"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      {message.text}
    </div>
    {message.sender === "user" && (
      <img
        src={user}
        alt="User"
        className="w-6 h-6 flex-shrink-0 ml-2"
      />
    )}
  </div>
))}

            {loading && (
              <div className="flex gap-2">

                <img
                  src={bot}
                  alt="Bot"
                  className="w-6 h-6 rounded-full"
                />
                <div className="bg-gray-200 p-4 w-24 flex flex-row justify-center gap-1 items-center rounded-md">
                  <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce"></div>
                </div>
              </div>
            )}

          </div>
          <div className="p-2 border-t flex items-center">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2 text-sm"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-white text-blue-500 px-0 py-0 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {!isOpen && <button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white p-8 rounded-full shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>

      </button>}
    </div>
  );
};

export default ChatbotPopup;
