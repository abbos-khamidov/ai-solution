'use client';

/**
 * Chat Demo Section - Live interactive chat with AI lead qualification
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
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

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message on client only
  useEffect(() => {
    setMounted(true);
    setMessages([{
      id: 'welcome',
      text: 'Привет! Попробуй написать как клиент, например: "Хочу заказать консультацию"',
      sender: 'bot',
      timestamp: new Date(),
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
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Спасибо за ваш вопрос!',
        sender: 'bot',
        timestamp: new Date(),
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
        timestamp: new Date(),
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

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50" id="demo">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1419] mb-4">
              Попробуйте AI-ассистента
            </h2>
            <p className="text-lg md:text-xl text-[#536471] max-w-2xl mx-auto">
              Напишите сообщение и посмотрите как AI квалифицирует лиды в реальном времени
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Chat Interface */}
          <ScrollReveal direction="left" duration={0.6} delay={0.2}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#0066FF] to-[#00D9FF] px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Sales Assistant</h3>
                  <p className="text-white/80 text-xs">Онлайн • Отвечает мгновенно</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white'
                          : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {msg.text}
                      </p>
                      <span
                        className={`text-xs mt-1 block ${
                          msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600">Анализирую...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Example Prompts */}
              {messages.length === 1 && !loading && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Примеры вопросов:</p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(prompt)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Напишите сообщение..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Analysis Panel */}
          <ScrollReveal direction="right" duration={0.6} delay={0.3}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-[600px] flex flex-col">
              <h3 className="text-xl font-bold text-[#0F1419] mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Анализ AI
              </h3>

              {analysis ? (
                <div className="space-y-6">
                  {/* Lead Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                      Тип лида
                    </label>
                    <div
                      className={`px-4 py-3 rounded-xl border-2 font-semibold text-center ${getLeadTypeColor(
                        analysis.leadType
                      )}`}
                    >
                      {analysis.leadType === 'Cold' && '❄️ Cold Lead'}
                      {analysis.leadType === 'Warm' && '🔥 Warm Lead'}
                      {analysis.leadType === 'Hot' && '🚀 Hot Lead'}
                    </div>
                  </div>

                  {/* Intent */}
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                      Намерение клиента
                    </label>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {analysis.intent}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                      Действие менеджера
                    </label>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <p className="text-sm text-gray-800 leading-relaxed font-medium">
                        {analysis.action}
                      </p>
                    </div>
                  </div>

                  {/* Priority indicator */}
                  {analysis.leadType === 'Hot' && (
                    <div className="p-4 bg-red-50 rounded-xl border-2 border-red-300 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-800 mb-1">
                          Высокий приоритет!
                        </p>
                        <p className="text-xs text-red-700">
                          Менеджер получит уведомление в течение 30 секунд
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Отправьте сообщение, чтобы увидеть<br />
                      анализ AI в реальном времени
                    </p>
                  </div>
                </div>
              )}

              {/* Info footer */}
              <div className="mt-auto pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>AI анализирует каждое сообщение за 1-2 секунды</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
