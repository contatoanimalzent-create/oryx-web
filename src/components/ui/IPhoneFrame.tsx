import { cn } from "@/lib/utils";

/**
 * iPhone de marketing (nível página da Apple): titânio com highlight de
 * borda, Dynamic Island, botões laterais, brilho de tela e sombra
 * profunda. Todo em CSS, sem imagem externa.
 *
 * O conteúdo (children) é a tela: um elemento com aspect ratio livre que
 * preenche 100% da área útil.
 */
export function IPhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("iphone relative", className)}>
      {/* botões laterais */}
      <span aria-hidden className="iphone-btn left-[-2px] top-[18%] h-[4.5%]" />
      <span aria-hidden className="iphone-btn left-[-2px] top-[26%] h-[8%]" />
      <span aria-hidden className="iphone-btn left-[-2px] top-[36%] h-[8%]" />
      <span aria-hidden className="iphone-btn right-[-2px] top-[29%] h-[12%]" />

      {/* tela */}
      <div className="iphone-screen">
        {/* status bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[7%] pt-[3.5%] text-[10px] font-semibold text-white">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </span>
        </div>

        {/* dynamic island */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[2.4%] z-30 h-[3.4%] w-[26%] -translate-x-1/2 rounded-full bg-black"
        >
          <span className="absolute right-[12%] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#0d1120] shadow-[inset_0_0_2px_rgba(90,120,255,0.55)]" />
        </div>

        {/* conteúdo */}
        <div className="absolute inset-0 z-10">{children}</div>

        {/* reflexo de vidro */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 28%, transparent 42%)",
          }}
        />

        {/* home indicator */}
        <div
          aria-hidden
          className="absolute bottom-[1.6%] left-1/2 z-30 h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-white/85"
        />
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor" aria-hidden>
      <rect x="0" y="6.5" width="2.4" height="3.5" rx="0.8" />
      <rect x="3.9" y="4.5" width="2.4" height="5.5" rx="0.8" />
      <rect x="7.8" y="2.5" width="2.4" height="7.5" rx="0.8" />
      <rect x="11.7" y="0.5" width="2.4" height="9.5" rx="0.8" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden>
      <path d="M7 9.8 4.6 7.4a3.4 3.4 0 0 1 4.8 0L7 9.8Z" />
      <path d="M2.9 5.7a5.8 5.8 0 0 1 8.2 0l-1.4 1.4a3.8 3.8 0 0 0-5.4 0L2.9 5.7Z" opacity="0.9" />
      <path d="M.8 3.6a8.8 8.8 0 0 1 12.4 0L11.8 5a6.8 6.8 0 0 0-9.6 0L.8 3.6Z" opacity="0.8" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="18" height="9" rx="2.5" stroke="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="14" height="6" rx="1.4" fill="currentColor" />
      <path d="M20.5 3.5v3a1.8 1.8 0 0 0 0-3Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
