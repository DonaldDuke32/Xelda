import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { UI_TEXT } from '../constants';
import { SendIcon, UserIcon, BotIcon } from './icons';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const quickSuggestions = [
  "Ajouter une plante",
  "Changer la couleur des murs",
  "Augmenter la luminosité",
  "Rends-le plus 'Cozy'"
];

export const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    if (!isLoading) {
      onSendMessage(suggestion);
    }
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-bold text-lg text-center">{UI_TEXT.refineTitle}</h3>
      </div>
      <div className="flex-grow p-4 overflow-y-auto scrollbar-thin">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 my-4 animate-message-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"><BotIcon className="w-5 h-5 text-white animate-icon-breath"/></div>}
            <div className={`max-w-[80%] rounded-xl px-4 py-2 ${msg.sender === 'user' ? 'bg-orange-600 text-white rounded-br-none' : 'bg-zinc-800 text-gray-200 rounded-bl-none'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
             {msg.sender === 'user' && <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center"><UserIcon className="w-5 h-5 text-white"/></div>}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 my-4 justify-start animate-message-in">
             <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"><BotIcon className="w-5 h-5 text-white animate-icon-breath"/></div>
            <div className="max-w-[80%] rounded-xl px-4 py-2 bg-zinc-800 text-gray-200 rounded-bl-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2">{UI_TEXT.quickSuggestions}</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map(s => (
                <button key={s} onClick={() => handleQuickSuggestion(s)} disabled={isLoading} className="px-3 py-1 text-xs bg-zinc-800 rounded-full hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {s}
                </button>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={UI_TEXT.refinePlaceholder}
            disabled={isLoading}
            className="flex-grow bg-zinc-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          />
          <button type="submit" disabled={isLoading} className="w-10 h-10 flex-shrink-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            <SendIcon className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};