"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`;
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simüle yanıt (backend bağlanınca buraya API çağrısı gelecek)
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: `Preparing a response for your question. Real responses will appear here once the backend is connected.`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="chat-page flex min-h-screen flex-col bg-[#0a0a0f]">
      {/* Background gradient and grid */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-[40%] -top-[40%] h-[80%] w-[80%] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute -bottom-[30%] -right-[30%] h-[60%] w-[60%] rounded-full bg-indigo-600/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06] bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <a
            href="/"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            ← Home
          </a>
          <h1 className="font-semibold tracking-tight text-white">
            Assistant
          </h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Message area */}
      <main className="relative z-10 flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.length === 0 ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 ring-1 ring-white/10">
                <svg
                  className="h-10 w-10 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xl font-medium text-white">
                  Hi, how can I help?
                </p>
                <p className="mt-2 max-w-sm text-sm text-zinc-500">
                  Type in the box below and press Enter or click Send.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Suggest a project idea",
                  "Write a code example",
                  "Explain a concept",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setInput(suggestion)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex animate-fade-in ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-violet-500/90 text-white shadow-lg shadow-violet-500/25"
                        : "bg-white/[0.06] text-zinc-100 ring-1 ring-white/10"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
                    <span className="flex h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
                    <span className="flex h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
                    <span className="flex h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="sticky bottom-0 border-t border-white/[0.06] bg-black/40 px-4 py-4 backdrop-blur-xl sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-3xl items-end gap-3"
          >
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                className="chat-input w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-12 text-[15px] text-white placeholder-zinc-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-violet-500/20"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 text-white shadow-lg shadow-violet-500/30 transition-all hover:bg-violet-400 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Send"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
