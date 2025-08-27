'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ClientOnly from '@/components/ClientOnly';
import Chatbot from '@/components/Chatbot';
import { cn } from '@/lib/utils';

interface FloatingChatProps {
  className?: string;
}

export default function FloatingChat({ className }: FloatingChatProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('hidden md:block', className)}>
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-xl btn-hover-lift flex items-center justify-center z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Drawer */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[90vw] h-[70vh]">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 h-full overflow-hidden animate-slide-up">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close AI Assistant"
              className="absolute top-3 right-3 p-2 rounded-lg text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <ClientOnly
              fallback={
                <div className="h-full flex items-center justify-center text-gray-500">Loading AI Assistant…</div>
              }
            >
              <Chatbot className="h-full" />
            </ClientOnly>
          </div>
        </div>
      )}
    </div>
  );
}
