'use client';

/**
 * Hero Chat Demo - Compact version for Hero section
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Target, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isWelcome?: boolean;
}

interface Analysis {
  leadType: 'Cold' | 'Warm' | 'Hot';
  intent: string;
  action: string;
}

const EXAMPLE_PROMPTS = [
  'Расскажите о компании',
  'Нужна автоматизация продаж',
  'Готовы начать завтра',
];

export function HeroChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setMessages([{
      id: 'welcome',
      text: 'Привет! Меня зовут Александр, AI-ассистент AI Solution. Напишите как ваш клиент — я покажу как работает квалификация лидов.',
      sender: 'bot',
      isWelcome: true,
    }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send conversation history (exclude the fake welcome message)
      const conversationHistory = [...messages, userMessage]
        .filter(msg => !msg.isWelcome)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      const res = await fetch('/api/chat-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: conversationHistory
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Спасибо за ваш вопрос!',
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
      setAnalysis({
        leadType: data.leadType,
        intent: data.intent,
        action: data.action,
      });
    } catch (error) {
      console.error('Chat demo error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Извините, произошла ошибка. Попробуйте ещё раз.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getLeadTypeColor = (type: 'Cold' | 'Warm' | 'Hot') => {
    switch (type) {
      case 'Cold':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Warm':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Hot':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[500px]">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#0066FF] to-[#00D9FF] px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Продажник</h3>
            <p className="text-white/80 text-xs">Онлайн • Тестируй прямо сейчас</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-xl px-3 py-2 border border-gray-200">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span>Александр печатает</span>
                  <span className="flex gap-0.5 items-center">
                    <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Analysis Badge */}
        {analysis && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {/* Lead Type Badge - Centered */}
              <div className="flex items-center justify-center gap-2">
                <Target className="w-3 h-3 text-gray-600" />
                <span
                  className={`px-3 py-1 rounded-full border font-medium text-xs ${getLeadTypeColor(
                    analysis.leadType
                  )}`}
                >
                  {analysis.leadType === 'Cold' && '❄️ Cold Lead'}
                  {analysis.leadType === 'Warm' && '🔥 Warm Lead'}
                  {analysis.leadType === 'Hot' && '🚀 Hot Lead'}
                </span>
              </div>

              {/* Intent - Multiline */}
              <div className="text-xs text-gray-600 text-center leading-relaxed">
                {analysis.intent}
              </div>

              {/* Action - Subtle */}
              <div className="text-xs text-gray-500 italic text-center">
                → {analysis.action}
              </div>
            </div>
          </div>
        )}

        {/* Example Prompts */}
        {messages.length === 1 && !loading && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Примеры:</p>
            <div className="flex flex-wrap gap-1">
              {EXAMPLE_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    sendMessage(prompt);
                  }}
                  className="text-xs px-2 py-1 rounded-full bg-white border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-200">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напиши сообщение..."
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
