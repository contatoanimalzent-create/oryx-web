"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.oryxcontrol.com/api/v1";
const MIN = 12;

type State = "idle" | "sending" | "done" | "error";

export function ResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const tooShort = password.length > 0 && password.length < MIN;
  const mismatch = confirm.length > 0 && confirm !== password;
  const canSend = password.length >= MIN && confirm === password && state !== "sending";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setState("sending");
    setMessage(null);
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setState("done");
        return;
      }
      setState("error");
      setMessage(
        res.status === 429
          ? "Muitas tentativas. Espere alguns minutos e tente de novo."
          : "Este link expirou ou já foi usado. Peça outro no app, em “Esqueci a senha”.",
      );
    } catch {
      setState("error");
      setMessage("Sem conexão com o servidor. Confira a internet e tente de novo.");
    }
  }

  if (!token) {
    return (
      <p className="mt-6 text-lg text-[var(--color-text-muted)]">
        Link incompleto. Abra o link do e-mail de novo ou peça outro no app.
      </p>
    );
  }

  if (state === "done") {
    return (
      <div className="mt-8">
        <CheckCircle2 size={48} className="text-[var(--color-brand-text)]" aria-hidden />
        <p className="mt-4 text-lg leading-relaxed">
          Senha alterada. Volte para o app ORYX e entre com a senha nova. Por segurança, as outras
          sessões abertas foram encerradas.
        </p>
      </div>
    );
  }

  const input =
    "mt-2 w-full h-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-strong)] px-4 text-base outline-none focus:border-[var(--color-brand)]";

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
      <label className="block">
        <span className="text-sm font-semibold">Senha nova</span>
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={input}
          aria-invalid={tooShort}
        />
        <span className={`mt-1 block text-sm ${tooShort ? "text-red-400" : "text-[var(--color-text-muted)]"}`}>
          Pelo menos {MIN} caracteres.
        </span>
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Repita a senha</span>
        <input
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={input}
          aria-invalid={mismatch}
        />
        {mismatch && <span className="mt-1 block text-sm text-red-400">As senhas não são iguais.</span>}
      </label>
      {message && (
        <p role="alert" className="text-sm text-red-400">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={!canSend}
        className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full font-semibold bg-[var(--color-ink)] text-[var(--color-volt)] disabled:opacity-40 transition-opacity"
      >
        {state === "sending" && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {state === "sending" ? "Salvando..." : "Salvar senha nova"}
      </button>
    </form>
  );
}
