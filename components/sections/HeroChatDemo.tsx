'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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

type Lang = 'ru' | 'uz' | 'en' | 'zh';

// Detect language by script / common words
function detectLang(text: string): Lang {
  if (!text.trim()) return 'ru';
  // Chinese characters
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
  // Cyrillic → Russian
  if (/[а-яёА-ЯЁ]/.test(text)) return 'ru';
  // Uzbek Latin heuristics: o', g', sh, ng, common roots
  const lower = text.toLowerCase();
  if (
    /[o'g'ʻ]/.test(lower) ||
    /\b(salom|kerak|yordam|rahmat|xayrli|nima|nega|qanday|bilan|men|sen|ular|bu|va|uchun|yozmoqda|ishlayman|xohlaydi|qilamiz)\b/.test(lower)
  ) {
    return 'uz';
  }
  // English default for Latin script
  if (/[a-zA-Z]/.test(text)) return 'en';
  return 'ru';
}

const UI_LABELS: Record<Lang, {
  title: string;
  subtitle: string;
  typing: string;
  placeholder: string;
  examplesLabel: string;
  examples: string[];
  errorText: string;
  fallbackText: string;
}> = {
  ru: {
    title: 'AI Продажник',
    subtitle: 'Онлайн · Тестируй прямо сейчас',
    typing: 'Александр печатает',
    placeholder: 'Напиши сообщение...',
    examplesLabel: 'Примеры:',
    examples: ['Расскажите о компании', 'Нужна автоматизация продаж', 'Готовы начать завтра'],
    errorText: 'Извините, произошла ошибка. Попробуйте ещё раз.',
    fallbackText: 'Спасибо за ваш вопрос!',
  },
  uz: {
    title: 'AI Savdo Yordamchi',
    subtitle: 'Online · Hozir sinab ko\'ring',
    typing: 'Aleksandr yozmoqda',
    placeholder: 'Xabar yozing...',
    examplesLabel: 'Misollar:',
    examples: ['Kompaniya haqida ayting', 'Savdoni avtomatlashtirish kerak', 'Ertadan boshlashga tayyormiz'],
    errorText: 'Kechirasiz, xato yuz berdi. Qayta urinib ko\'ring.',
    fallbackText: 'Savolingiz uchun rahmat!',
  },
  en: {
    title: 'AI Sales Assistant',
    subtitle: 'Online · Try it right now',
    typing: 'Alexander is typing',
    placeholder: 'Type a message...',
    examplesLabel: 'Examples:',
    examples: ['Tell me about your company', 'I need sales automation', 'Ready to start tomorrow'],
    errorText: 'Sorry, an error occurred. Please try again.',
    fallbackText: 'Thank you for your question!',
  },
  zh: {
    title: 'AI 销售助手',
    subtitle: '在线 · 立即体验',
    typing: 'Alexander 正在输入',
    placeholder: '输入消息...',
    examplesLabel: '示例:',
    examples: ['介绍一下贵公司', '我需要销售自动化', '明天就可以开始'],
    errorText: '抱歉，发生了错误，请重试。',
    fallbackText: '感谢您的提问！',
  },
};

export function HeroChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Lang>('ru');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const labels = UI_LABELS[lang];

  useEffect(() => {
    setMounted(true);
    setMessages([{
      id: 'welcome',
      text: 'Привет! Меня зовут Александр, AI-ассистент AI Solution. Напишите как ваш клиент — я покажу как работает квалификация лидов.',
      sender: 'bot',
      isWelcome: true,
    }]);
  }, []);

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: isInitialMount.current ? 'instant' : 'smooth',
    });
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    scrollToBottom();
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [messages, scrollToBottom]);

  const sendMessage = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || loading) return;

    // Detect and update UI language from user input
    const detectedLang = detectLang(messageText);
    setLang(detectedLang);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const conversationHistory = [...messages, userMessage]
        .filter(msg => !msg.isWelcome)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        }));

      const res = await fetch('/api/chat-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, history: conversationHistory }),
      });

      let data: { error?: string; response?: string; leadType?: string; intent?: string; action?: string };
      try {
        data = await res.json();
      } catch {
        data = { error: 'Неверный ответ сервера' };
      }

      if (!res.ok) {
        const serverMessage = (data?.error || '').trim();
        const textToShow = serverMessage || UI_LABELS[detectedLang].errorText;
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), text: textToShow, sender: 'bot' as const },
        ]);
        return;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || UI_LABELS[detectedLang].fallbackText,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
      const leadType: Analysis['leadType'] =
        data.leadType === 'Warm' || data.leadType === 'Hot' ? data.leadType : 'Cold';
      setAnalysis({
        leadType,
        intent: data.intent ?? '',
        action: data.action ?? '',
      });
    } catch (error) {
      console.error('Chat demo error:', error);
      const message = error instanceof Error ? error.message : '';
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: message || UI_LABELS[detectedLang].errorText,
          sender: 'bot',
        },
      ]);
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

  const getLeadTypeStyle = (type: 'Cold' | 'Warm' | 'Hot') => {
    switch (type) {
      case 'Cold': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Warm': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Hot':  return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-2xl overflow-hidden flex flex-col h-[500px]"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(15, 23, 42, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.08), 0 0 60px rgba(59, 130, 246, 0.08)',
        }}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm transition-all duration-300">{labels.title}</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-online" />
              <p className="text-white/80 text-xs transition-all duration-300">{labels.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3"
          style={{ background: 'rgba(241, 245, 249, 0.9)' }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white'
                    : 'text-foreground'
                }`}
                style={msg.sender === 'bot' ? {
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(15, 23, 42, 0.1)',
                } : undefined}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="rounded-xl px-3 py-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(15, 23, 42, 0.1)',
                }}
              >
                <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
                  <span className="transition-all duration-300">{labels.typing}</span>
                  <span className="flex gap-0.5 items-center">
                    <span className="w-1 h-1 rounded-full bg-[#64748B] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 rounded-full bg-[#64748B] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 rounded-full bg-[#64748B] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Badge */}
        {analysis && (
          <div
            className="px-4 py-3"
            style={{
              background: 'rgba(248, 250, 252, 0.95)',
              borderTop: '1px solid rgba(15, 23, 42, 0.08)',
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2">
                <Target className="w-3 h-3 text-[#64748B]" />
                <span className={`px-3 py-1 rounded-full border font-medium text-xs ${getLeadTypeStyle(analysis.leadType)}`}>
                  {analysis.leadType === 'Cold' && '❄️ Cold Lead'}
                  {analysis.leadType === 'Warm' && '🔥 Warm Lead'}
                  {analysis.leadType === 'Hot'  && '🚀 Hot Lead'}
                </span>
              </div>
              <div className="text-xs text-[#94A3B8] text-center leading-relaxed">{analysis.intent}</div>
              <div className="text-xs text-[#64748B] italic text-center">→ {analysis.action}</div>
            </div>
          </div>
        )}

        {/* Example Prompts — shown before user sends first real message */}
        {messages.length === 1 && !loading && (
          <div
            className="px-4 py-2"
            style={{
              background: 'rgba(248, 250, 252, 0.95)',
              borderTop: '1px solid rgba(15, 23, 42, 0.08)',
            }}
          >
            <p className="text-xs text-[#64748B] mb-2 transition-all duration-300">{labels.examplesLabel}</p>
            <div className="flex flex-wrap gap-1">
              {labels.examples.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    sendMessage(prompt);
                  }}
                  className="text-xs px-2.5 py-1 rounded-full text-[#94A3B8] transition-all duration-200 hover:text-foreground hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(15, 23, 42, 0.12)',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div
          className="p-3"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderTop: '1px solid rgba(15, 23, 42, 0.08)',
          }}
        >
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={labels.placeholder}
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm rounded-lg text-foreground placeholder-[#64748B] outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:border-[#3B82F6]/50 focus:ring-1 focus:ring-[#3B82F6]/30"
              style={{
                background: 'rgba(248, 250, 252, 1)',
                border: '1px solid rgba(15, 23, 42, 0.12)',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
