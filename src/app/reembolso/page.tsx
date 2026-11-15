import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Política de Reembolso",
  description:
    "Quando você recebe o dinheiro de volta no ORYX: arrependimento em 7 dias, evento cancelado, carteira, loja e cobrança indevida.",
  alternates: { canonical: "/reembolso" },
};

const SECTIONS: LegalSection[] = [
  {
    id: "arrependimento",
    title: "Desistência em até 7 dias",
    body: (
      <>
        <p>
          Toda compra feita no app é uma compra pela internet. Pelo art. 49 do Código de Defesa do Consumidor, você pode
          desistir em até 7 dias corridos depois do pagamento e recebe o valor de volta, sem precisar explicar o motivo.
        </p>
        <p>
          Se o evento acontecer dentro desses 7 dias, o pedido de desistência precisa ser feito antes do início do evento.
          Depois que a partida começa, a inscrição já foi usada.
        </p>
      </>
    ),
  },
  {
    id: "cancelado",
    title: "Evento cancelado ou mudado",
    body: (
      <ul>
        <li>Se o organizador cancelar o evento, você recebe o valor inteiro de volta.</li>
        <li>
          Se mudar a data, o local ou algo importante, você escolhe: mantém a inscrição ou pede o valor de volta.
        </li>
        <li>Chuva, campo interditado ou falta de público que levem ao cancelamento entram nessa regra.</li>
      </ul>
    ),
  },
  {
    id: "ausencia",
    title: "Se você não for",
    body: (
      <p>
        Fora do prazo de 7 dias, faltar ao evento não dá direito a reembolso automático. Cada organizador pode ter uma regra
        mais generosa, que aparece no evento antes de você pagar e vale junto com esta política.
      </p>
    ),
  },
  {
    id: "carteira",
    title: "Saldo da carteira",
    body: (
      <ul>
        <li>Depósito não usado pode ser devolvido para o mesmo meio de pagamento em até 7 dias.</li>
        <li>Depois disso, o saldo continua seu e pode ser sacado. O saque pode exigir verificação de identidade.</li>
        <li>Prêmios e créditos promocionais seguem as regras da promoção em que foram dados.</li>
      </ul>
    ),
  },
  {
    id: "loja",
    title: "Compras na loja entre jogadores",
    body: (
      <p>
        Na loja, quem vende é outro jogador. Se o item não chegar ou vier diferente do anúncio, abra um pedido de ajuda em
        Ajustes &gt; Ajuda e suporte em até 7 dias depois da entrega prevista. Analisamos as mensagens e o histórico do pedido
        e, quando o vendedor não cumprir, devolvemos o valor ao comprador.
      </p>
    ),
  },
  {
    id: "como",
    title: "Como pedir e em quanto tempo",
    body: (
      <>
        <p>
          Peça em Ajustes &gt; Ajuda e suporte ou pelo e-mail <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>,
          informando o e-mail da conta e o evento ou pedido.
        </p>
        <p>
          Respondemos em até 5 dias úteis. O dinheiro volta pelo mesmo meio de pagamento: no cartão, o estorno aparece em até
          2 faturas, conforme o banco; no boleto ou na carteira, em até 10 dias úteis.
        </p>
      </>
    ),
  },
  {
    id: "indevida",
    title: "Cobrança errada",
    body: (
      <p>
        Se você foi cobrado por algo que não comprou ou cobrado duas vezes, devolvemos o valor pago a mais. Quando a cobrança
        indevida não for engano justificável, a devolução é em dobro, como prevê o art. 42 do Código de Defesa do Consumidor.
      </p>
    ),
  },
];

export default function ReembolsoPage() {
  return (
    <LegalPage
      title="Política de Reembolso"
      intro={
        <p>
          Quando e como você recebe o dinheiro de volta no ORYX. Vale junto com os{" "}
          <Link className="underline" href="/termos">
            Termos de uso
          </Link>
          .
        </p>
      }
      sections={SECTIONS}
    />
  );
}
