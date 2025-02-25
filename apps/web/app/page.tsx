'use client'
import React, { useState } from 'react'
import { useSocket } from '../context/SocketProvider'

function Page() {
  const [message, setMessage] = useState('')
  const { sendMessage } = useSocket()
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl space-y-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
          Message Hub
        </h1>
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-4 pr-16 text-white bg-gray-700 border border-gray-600 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
            transition duration-300 placeholder-gray-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 top-2 px-4 py-2 bg-purple-600 text-white rounded-lg 
            hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 
            focus:ring-offset-gray-800"
          >
            Send
          </button>
        </div>
        <p className="text-sm text-center text-gray-400 mt-4">
          Press <span className="text-purple-400">Enter</span> or click{' '}
          <span className="text-purple-400">Send</span> to submit
        </p>
      </div>
    </div>
  )
}

export default Page