'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`${
              idx !== items.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex justify-between items-center w-full text-left py-6 group hover:bg-gray-50 px-2 -mx-2 rounded-lg transition-colors"
              aria-expanded={isOpen}
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">
                {item.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ease-out ${
                isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
              }`}
            >
              <p className="text-gray-700 leading-relaxed px-2">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
