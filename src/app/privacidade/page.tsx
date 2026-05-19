import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o ORYX coleta, usa e protege seus dados (LGPD).",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <section className="pt-32 pb-24 lg:pt-44 mx-auto max-w-3xl px-6 lg:px-8 prose prose-invert">
      <h1 className="text-4xl font-black">Política de Privacidade</h1>
      <p className="text-sm text-[var(--color-text-dim)]">Última atualização: 2026 · LGPD compliant</p>

      <h2 className="text-2xl font-bold mt-10">Dados que coletamos</h2>
      <ul className="text-[var(--color-text-muted)]">
        <li>Identificação: email, callsign, foto de perfil</li>
        <li>Localização GPS — apenas durante eventos ativos com seu consentimento</li>
        <li>Posição, velocidade, accuracy do GPS durante partidas</li>
        <li>Eventos de uso (sign-up, match joined, eliminações) via Mixpanel</li>
        <li>Crash reports técnicos via Sentry (sem PII)</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10">Como usamos</h2>
      <ul className="text-[var(--color-text-muted)]">
        <li>Operar o serviço (matching de squad, voz, ranking)</li>
        <li>Anti-cheat (detectar mock location, padrões suspeitos)</li>
        <li>Comunicação (push notification de evento/squad)</li>
        <li>Melhorar o produto (analytics agregado)</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10">Compartilhamento</h2>
      <p className="text-[var(--color-text-muted)]">
        Não vendemos seus dados. Compartilhamos com: AWS (hospedagem),
        Stripe (pagamentos), Mixpanel (analytics), Sentry (crashes),
        Firebase (push), LiveKit (voz). Todos com contratos LGPD/DPA.
      </p>

      <h2 className="text-2xl font-bold mt-10">Seus direitos (LGPD)</h2>
      <p className="text-[var(--color-text-muted)]">
        Você pode acessar, corrigir, portar ou apagar seus dados a qualquer
        momento. Use Configurações → Privacidade no app, ou escreva pra
        privacidade@oryxcontrol.com. Resposta em até 15 dias úteis.
      </p>

      <h2 className="text-2xl font-bold mt-10">Encarregado (DPO)</h2>
      <p className="text-[var(--color-text-muted)]">
        Animalz Group — privacidade@oryxcontrol.com — Brasília-DF, Brasil.
      </p>
    </section>
  );
}
