import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#06060a] font-sans">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-[35%] -top-[50%] h-[100%] w-[90%] rounded-full bg-violet-600/20 blur-[140px] animate-glow-pulse" />
        <div className="absolute -bottom-[40%] -right-[20%] h-[80%] w-[70%] rounded-full bg-fuchsia-600/15 blur-[120px] animate-float" />
        <div className="absolute left-1/2 top-1/2 h-[50%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-5 sm:px-8">
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            AI Project
          </span>
          <Link
            href="/chat"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
          >
            Go to chat
          </Link>
        </header>

        {/* Hero */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-8 text-center sm:px-8">
          <p className="font-display mb-4 text-sm font-medium uppercase tracking-[0.2em] text-violet-400/90">
            AI assistant
          </p>
          <h1 className="font-display max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
            Ask your questions.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              Get answers.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Instant answers, code examples, and ideas with our text-based chat
            assistant. Try it free.
          </p>

          {/* CTA */}
          <Link
            href="/chat"
            className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.2)] transition-all hover:bg-zinc-100 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(139,92,246,0.4)] active:scale-[0.98]"
          >
            Start chatting
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          {/* Features */}
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-500">
            <li className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Instant answers
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-violet-500" />
              Code & explanation
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
              Free to use
            </li>
          </ul>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/5 px-6 py-4 sm:px-8">
          <p className="text-center text-xs text-zinc-600">
            AI Project · Chat assistant
          </p>
        </footer>
      </div>
    </div>
  );
}
