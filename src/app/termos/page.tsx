import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "As regras de uso do ORYX: quem pode usar, o que cada um faz, pagamentos, segurança em campo e responsabilidades.",
  alternates: { canonical: "/termos" },
};

const SECTIONS: LegalSection[] = [
  {
    id: "o-que-e",
    title: "O que é o ORYX",
    body: (
      <p>
        O ORYX é um app de coordenação para eventos de airsoft: mapa do time em tempo real, rádio, missões, artefatos do
        jogo, pontuação, ranking, inscrições e loja entre jogadores. Ele é oferecido pelo {COMPANY.product}, produto da{" "}
        {COMPANY.legalName}, em {COMPANY.city}. Ao criar a conta você aceita estes Termos e a{" "}
        <Link href="/privacidade">Política de Privacidade</Link>.
      </p>
    ),
  },
  {
    id: "quem-pode",
    title: "Quem pode usar",
    body: (
      <ul>
        <li>
          A partir de 14 anos, a mesma idade que a lei permite para praticar airsoft (Decreto 11.615/2023, art. 34, § 3º).
          Você informa a idade no cadastro.
        </li>
        <li>
          De 14 a 17 anos, o pai, a mãe ou o responsável precisa saber e autorizar. Até os 18 anos, a loja e a carteira
          ficam bloqueadas, porque comprar réplica e movimentar dinheiro exigem maioridade.
        </li>
        <li>Para ser organizador (produtor de evento) é preciso ter 18 anos ou mais.</li>
        <li>Os dados do cadastro precisam ser verdadeiros.</li>
        <li>A conta é pessoal. Você cuida da sua senha e responde pelo que for feito com ela.</li>
      </ul>
    ),
  },
  {
    id: "papeis",
    title: "Jogador, organizador e ORYX: quem faz o quê",
    body: (
      <>
        <p>
          <strong>O organizador</strong> (produtor do evento) cria o evento e decide local, data, preço, regras, times,
          funções, missões e artefatos. Ele responde pela realização do evento, pela segurança do local, pelas regras de
          campo, pelas licenças necessárias e pela devolução do valor quando cancelar.
        </p>
        <p>
          <strong>O jogador</strong> segue as regras do organizador e as leis aplicáveis, usa equipamento de proteção e
          respeita os outros jogadores.
        </p>
        <p>
          <strong>O ORYX</strong> fornece a ferramenta: mostra informações, registra ações e calcula pontuação a partir do
          que o servidor confirma. O ORYX não organiza o evento, não fiscaliza o campo e não é equipamento de segurança.
        </p>
      </>
    ),
  },
  {
    id: "seguranca",
    title: "Segurança em campo",
    body: (
      <ul>
        <li>Óculos ou máscara de proteção são obrigatórios em qualquer partida. Siga a regra de equipamento do organizador.</li>
        <li>Não use o celular de forma que tire sua atenção de um risco real. Pare de jogar se precisar.</li>
        <li>A sirene e os alertas do app ajudam a comunicação, mas não substituem o apito, o rádio e o juiz do evento.</li>
        <li>Em emergência, chame o atendimento do evento e o 192 ou 193. O app pode falhar por sinal, bateria ou aparelho.</li>
      </ul>
    ),
  },
  {
    id: "conduta",
    title: "Regras de conduta",
    body: (
      <>
        <p>Não é permitido:</p>
        <ul>
          <li>falsificar localização, usar programas para trapacear ou manipular o app;</li>
          <li>assediar, ameaçar ou discriminar alguém em chat, voz, posts ou avaliações;</li>
          <li>publicar conteúdo ilegal, de terceiros sem autorização ou imagem de alguém sem consentimento;</li>
          <li>anunciar na loja itens proibidos por lei ou que você não tem;</li>
          <li>criar avaliações falsas ou contas falsas.</li>
        </ul>
        <p>
          O sistema aponta sinais suspeitos, mas a decisão é de uma pessoa. Violações podem levar a advertência, suspensão ou
          exclusão da conta. Você pode contestar por <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
      </>
    ),
  },
  {
    id: "pagamentos",
    title: "Inscrições, pagamentos e carteira",
    body: (
      <>
        <p>
          Usar o ORYX é grátis para jogadores e organizadores. Eventos podem ser gratuitos ou pagos: o preço do ingresso é
          definido pelo organizador e mostrado antes de você pagar. Em evento pago, o ORYX fica com uma parte do ingresso,
          informada ao organizador antes de ele publicar o evento.
        </p>
        <p>
          Pagamentos com cartão e boleto são processados pela Stripe. O ORYX não guarda o número do seu cartão. Na fatura
          aparece ORYXCONTROL.COM.
        </p>
        <p>
          A carteira guarda saldo em reais para inscrições e compras dentro do app. Para sacar, pode ser pedida verificação de
          identidade. Regras de cancelamento e devolução estão na <Link href="/reembolso">Política de reembolso</Link>.
        </p>
      </>
    ),
  },
  {
    id: "loja",
    title: "Loja entre jogadores",
    body: (
      <p>
        Na loja, a venda é entre o jogador que vende e o que compra. O vendedor responde pela descrição, pelo estado do item,
        pela entrega e por cumprir a lei sobre o que vende. Réplicas de airsoft precisam seguir as regras do Exército sobre
        comércio e transporte. Só quem recebeu o pedido pode avaliar o vendedor. O ORYX ajuda a resolver problemas, mas não é
        dono dos itens anunciados.
      </p>
    ),
  },
  {
    id: "conteudo",
    title: "Seu conteúdo e o nosso",
    body: (
      <>
        <p>
          O que você publica (fotos, posts, avaliações, mensagens) continua seu. Você autoriza o ORYX a mostrar esse conteúdo
          dentro do app, só para o funcionamento do serviço. Ao apagar o conteúdo ou a conta, ele sai do app.
        </p>
        <p>
          Marca, nome, logotipo, design, código e sons do ORYX pertencem ao {COMPANY.legalName}. Não copie nem use sem
          autorização.
        </p>
      </>
    ),
  },
  {
    id: "disponibilidade",
    title: "Disponibilidade e mudanças no app",
    body: (
      <p>
        Trabalhamos para o app funcionar o tempo todo, mas ele depende de internet, GPS, bateria e serviços de terceiros, e
        pode ter falhas ou paradas para manutenção. Recursos podem mudar ou sair. Quando a mudança afetar algo pago, avisamos
        antes.
      </p>
    ),
  },
  {
    id: "responsabilidade",
    title: "Responsabilidade",
    body: (
      <>
        <p>
          O ORYX responde pelos serviços que presta, nos termos do Código de Defesa do Consumidor. Não responde por acidentes,
          lesões ou danos causados pela realização do evento, pelo campo, pelo equipamento ou pela conduta de jogadores e
          organizadores, nem por negócios feitos entre jogadores na loja, salvo quando a falha for do próprio ORYX.
        </p>
        <p>Nada nestes Termos tira direitos que a lei garante a você como consumidor.</p>
      </>
    ),
  },
  {
    id: "encerramento",
    title: "Encerramento da conta",
    body: (
      <p>
        Você pode excluir sua conta quando quiser em Ajustes &gt; Excluir conta. O ORYX pode suspender ou encerrar contas que
        violem estes Termos ou a lei, explicando o motivo, salvo quando a lei proibir.
      </p>
    ),
  },
  {
    id: "mudancas",
    title: "Mudanças nestes Termos",
    body: (
      <p>
        Quando mudarmos algo importante, avisamos no app antes de valer. Cada versão tem data, e guardamos qual versão você
        aceitou.
      </p>
    ),
  },
  {
    id: "lei",
    title: "Lei e foro",
    body: (
      <p>
        Valem as leis do Brasil. Se houver disputa, você pode escolher o foro da sua cidade, como garante o Código de Defesa
        do Consumidor. Antes disso, fale com a gente: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    ),
  },
];

export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      intro={<p>As regras para usar o ORYX, escritas para qualquer pessoa entender. Leia antes de criar a conta.</p>}
      sections={SECTIONS}
    />
  );
}
