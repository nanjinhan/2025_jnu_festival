// src/pages/GuestbookPage.jsx

import React, { useState } from 'react';

function GuestbookPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setMessages([input, ...messages]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-800">🌿 방명록</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="하고 싶은 말을 자유롭게 남겨주세요 :)"
          className="w-full h-24 p-4 border rounded-lg resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          작성하기
        </button>
      </form>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">아직 남겨진 말이 없어요.</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow-sm bg-green-50 text-gray-800"
            >
              {msg}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GuestbookPage;
