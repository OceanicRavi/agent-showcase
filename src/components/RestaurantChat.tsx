import React, { useState } from 'react';
import { Send, User, Bot, UtensilsCrossed } from 'lucide-react';

const restaurants = [
  { id: 1, name: "Burger Fuel New Zealand", cuisine: "Fast Food" }
];

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function RestaurantChat() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatStarted, setChatStarted] = useState<boolean>(false);

  const handleRestaurantSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRestaurant(e.target.value);
    setChatStarted(false);
    setMessages([]);
  };

  const startChat = () => {
    if (!selectedRestaurant) return;
    
    const restaurant = restaurants.find(r => r.id.toString() === selectedRestaurant);
    
    setChatStarted(true);
    setMessages([
      {
        id: 1,
        text: `Welcome to ${restaurant?.name}! How can I help you with our menu today?`,
        sender: 'bot'
      }
    ]);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    const restaurant = restaurants.find(r => r.id.toString() === selectedRestaurant);
  
    // Add user message to UI
    const newMessages = [
      ...messages,
      {
        id: messages.length + 1,
        text: message,
        sender: 'user'
      }
    ];
  
    setMessages(newMessages);
    setMessage('');
  
    try {
      // Send message to n8n workflow
      const response = await fetch("https://novanexus.app.n8n.cloud/webhook/3e4a34c4-5625-4774-a530-641f965d4037/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          restaurant_id: selectedRestaurant, // Pass restaurant ID
          user_message: message
        })
      });
  
      const data = await response.json();
  
      // Append bot response
      setMessages([
        ...newMessages,
        {
          id: newMessages.length + 1,
          text: data.output || `I'm sorry, I couldn't retrieve a response.`,
          sender: 'bot'
        }
      ]);
  
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages([
        ...newMessages,
        {
          id: newMessages.length + 1,
          text: "Oops! Something went wrong. Please try again.",
          sender: 'bot'
        }
      ]);
    }
  };
  

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-nebula-50 flex items-center gap-2 mb-4">
          <UtensilsCrossed className="text-nebula-200" size={24} />
          Restaurant Menu Chat
        </h2>
        <p className="text-nebula-200 mb-6">
          Select a restaurant to chat about their menu options and get recommendations.
        </p>
        
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="restaurant" className="block text-sm font-medium text-nebula-100 mb-1">
              Select Restaurant
            </label>
            <select
              id="restaurant"
              value={selectedRestaurant}
              onChange={handleRestaurantSelect}
              className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400"
            >
              <option value="">Select a restaurant</option>
              {restaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} ({restaurant.cuisine})
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={startChat}
            disabled={!selectedRestaurant || chatStarted}
            className="bg-nebula-500 text-nebula-50 py-2 px-4 rounded-md hover:bg-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-300 focus:ring-offset-2 focus:ring-offset-nebula-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Start Chat
          </button>
        </div>
      </div>
      
      {chatStarted && (
        <div className="bg-nebula-800/30 backdrop-blur-sm rounded-lg border border-nebula-700/50 h-96 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`flex items-start gap-2.5 max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'flex-row-reverse' 
                      : 'flex-row'
                  }`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.sender === 'user' 
                        ? 'bg-nebula-300 text-nebula-900' 
                        : 'bg-nebula-600 text-nebula-100'
                    }`}
                  >
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div 
                    className={`p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-nebula-300 text-nebula-900 rounded-tr-none' 
                        : 'bg-nebula-700 text-nebula-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={sendMessage} className="border-t border-nebula-700/50 p-4 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400 placeholder-nebula-400"
            />
            <button
              type="submit"
              className="bg-nebula-500 text-nebula-50 p-2 rounded-md hover:bg-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-300 focus:ring-offset-2 focus:ring-offset-nebula-900 transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}