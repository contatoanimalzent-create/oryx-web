import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Quais dados o ORYX coleta, para quê, com quem compartilha, por quanto tempo guarda e como você exerce seus direitos pela LGPD.",
  alternates: { canonical: "/privacidade" },
};

const DADOS: Array<[string, string, string]> = [
  ["Conta: e-mail, nome, senha, callsign, foto e bio", "Criar e manter sua conta e seu perfil de jogador", "Execução de contrato (art. 7º, V)"],
  ["Aceite dos termos, faixa de idade (18+ ou 14 a 17) e autorização do responsável, quando menor", "Provar o que você aceitou e quando", "Obrigação legal e exercício regular de direitos (art. 7º, II e VI)"],
  ["Localização, velocidade e precisão do GPS", "Mostrar você no mapa do seu time e da organização durante a partida, inclusive com a tela bloqueada", "Execução de contrato (art. 7º, V)"],
  ["Voz no rádio do app", "Falar com seu time ao vivo. A voz não é gravada", "Execução de contrato (art. 7º, V)"],
  ["Contato de emergência e tipo sanguíneo (opcionais)", "Atendimento de emergência no evento", "Consentimento específico e proteção da vida (art. 11, I e II, e)"],
  ["CPF, foto de documento e selfie (só quando você pede verificação ou saque)", "Confirmar sua identidade e evitar fraude", "Prevenção à fraude e obrigação legal (art. 11, II, a e g)"],
  ["Inscrições, times, funções, missões, pontos, ranking, avaliações, mensagens e posts", "Fazer o jogo funcionar e mostrar seu histórico", "Execução de contrato (art. 7º, V)"],
  ["Pagamentos e carteira: valores, datas e status", "Cobrar, reembolsar e cumprir regras fiscais. O número do cartão fica com a Stripe, nunca com a gente", "Execução de contrato e obrigação legal (art. 7º, II e V)"],
  ["Sinais de integridade da partida (velocidade impossível, salto de GPS)", "Evitar trapaça. A decisão final é sempre de uma pessoa da organização", "Legítimo interesse (art. 7º, IX)"],
  ["Dados técnicos: token de notificação, modelo do aparelho, relatório de erro", "Enviar avisos e corrigir falhas", "Legítimo interesse (art. 7º, IX)"],
  ["Análise de uso: telas abertas e botões tocados", "Melhorar o app. Só se você autorizar, e você muda quando quiser", "Consentimento (art. 7º, I)"],
];

const FORNECEDORES: Array<[string, string, string]> = [
  ["Amazon Web Services", "Servidores e banco de dados", "Estados Unidos"],
  ["Stripe", "Pagamentos com cartão e boleto", "Estados Unidos e Brasil"],
  ["Google Firebase", "Notificações no celular", "Estados Unidos"],
  ["Mixpanel", "Análise de uso, só com seu consentimento", "Estados Unidos"],
  ["Sentry", "Relatórios de erro do app", "Estados Unidos"],
  ["Zoho", "E-mail de contato e suporte", "Índia e Estados Unidos"],
  ["Cloudflare e Vercel", "Site e domínio", "Estados Unidos"],
  ["Apple e Google", "Lojas de aplicativo", "Estados Unidos"],
];

function Tabela({ head, rows }: { head: string[]; rows: Array<[string, string, string]> }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SECTIONS: LegalSection[] = [
  {
    id: "quem-somos",
    title: "Quem cuida dos seus dados",
    body: (
      <>
        <p>
          O controlador dos dados é o {COMPANY.product}, produto da {COMPANY.legalName}, em {COMPANY.city}. Para qualquer
          assunto de privacidade, inclusive com o nosso encarregado de dados, escreva para{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <p>
          Quando você se inscreve no evento de um organizador, ele também passa a tratar os dados necessários para o evento
          acontecer (nome, callsign, função no time, posição durante a partida e, se você informou, o contato de emergência).
          Nesse caso o organizador responde pelo uso que fizer desses dados fora do ORYX.
        </p>
      </>
    ),
  },
  {
    id: "dados",
    title: "O que coletamos, para quê e com qual base legal",
    body: (
      <>
        <p>Coletamos só o que o app precisa para funcionar. Bases legais da Lei Geral de Proteção de Dados (Lei 13.709/2018):</p>
        <Tabela head={["Dado", "Para quê", "Base legal"]} rows={DADOS} />
        <p>
          Contato de emergência e tipo sanguíneo são dados de saúde. Você preenche se quiser, e eles só aparecem para a
          organização e o atendimento médico do evento em que você está inscrito.
        </p>
      </>
    ),
  },
  {
    id: "localizacao",
    title: "Localização e permissões do celular",
    body: (
      <>
        <p>
          A localização só é coletada quando você entra numa partida. Antes do pedido do sistema, o app mostra um aviso
          explicando o uso. Durante a partida ela continua com a tela bloqueada ou o app fechado, para o seu time não te
          perder. Quando você sai da partida, a coleta para.
        </p>
        <p>
          Sua posição aparece só para o seu time e para a organização do evento. O time adversário nunca recebe sua posição.
        </p>
        <p>Outras permissões, sempre pedidas na hora em que você usa o recurso:</p>
        <ul>
          <li><strong>Câmera:</strong> ler QR code de check-in e de artefatos, e tirar fotos que você escolher enviar.</li>
          <li><strong>Microfone:</strong> falar no rádio do time. A voz não é gravada.</li>
          <li><strong>Bluetooth e NFC:</strong> confirmar que você está perto de um artefato do jogo (bomba, ogiva, objetivo).</li>
          <li><strong>Notificações:</strong> avisos do evento, do time e da pista.</li>
        </ul>
      </>
    ),
  },
  {
    id: "compartilhamento",
    title: "Com quem compartilhamos",
    body: (
      <>
        <p>Não vendemos seus dados. Compartilhamos só o necessário:</p>
        <ul>
          <li><strong>Outros jogadores:</strong> callsign, patente, foto e ranking são públicos dentro do app.</li>
          <li><strong>Seu time e a organização:</strong> posição durante a partida e sua função no time.</li>
          <li><strong>Autoridades:</strong> quando a lei ou uma ordem judicial exigir.</li>
          <li><strong>Fornecedores que operam o serviço</strong>, com contrato que os obriga a proteger os dados:</li>
        </ul>
        <Tabela head={["Fornecedor", "Para quê", "Onde"]} rows={FORNECEDORES} />
      </>
    ),
  },
  {
    id: "internacional",
    title: "Transferência para outros países",
    body: (
      <p>
        Nossos servidores ficam nos Estados Unidos (Amazon Web Services) e alguns fornecedores da tabela acima também estão
        fora do Brasil. Essas transferências seguem o art. 33 da LGPD, com cláusulas contratuais e medidas de segurança
        equivalentes às exigidas aqui.
      </p>
    ),
  },
  {
    id: "retencao",
    title: "Por quanto tempo guardamos",
    body: (
      <ul>
        <li><strong>Conta e perfil:</strong> enquanto a conta existir.</li>
        <li>
          <strong>Ao excluir a conta</strong> (Ajustes &gt; Excluir conta): e-mail, nome, callsign, foto, bio, contato de
          emergência, tipo sanguíneo e documentos de verificação são apagados na hora. O histórico de partidas e compras fica
          anônimo, sem ligação com você.
        </li>
        <li><strong>Pagamentos:</strong> pelo prazo exigido pela legislação fiscal (5 anos).</li>
        <li><strong>Registros de acesso:</strong> 6 meses, como manda o Marco Civil da Internet (Lei 12.965/2014, art. 15).</li>
        <li><strong>Análise de uso:</strong> até você retirar o consentimento.</li>
      </ul>
    ),
  },
  {
    id: "direitos",
    title: "Seus direitos e como usar",
    body: (
      <>
        <p>Pelo art. 18 da LGPD você pode, a qualquer momento e sem custo:</p>
        <ul>
          <li>confirmar se tratamos seus dados e ter acesso a eles;</li>
          <li>corrigir dados errados ou desatualizados;</li>
          <li>pedir anonimização, bloqueio ou exclusão do que for desnecessário;</li>
          <li>levar seus dados para outro serviço (portabilidade);</li>
          <li>saber com quem compartilhamos;</li>
          <li>retirar um consentimento e saber o que acontece se não der;</li>
          <li>pedir revisão de decisão tomada só por sistema automático.</li>
        </ul>
        <p>
          <strong>No app:</strong> Ajustes &gt; Privacidade &gt; Baixar meus dados entrega uma cópia completa; Ajustes &gt;
          Excluir conta apaga sua conta; Ajustes &gt; Privacidade liga e desliga a análise de uso.{" "}
          <strong>Por e-mail:</strong> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Respondemos em até 15 dias.
        </p>
        <p>
          Se não ficar satisfeito, você pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD) em{" "}
          <a href="https://www.gov.br/anpd" rel="noopener noreferrer" target="_blank">
            gov.br/anpd
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "menores",
    title: "Adolescentes de 14 a 17 anos",
    body: (
      <>
        <p>
          O ORYX aceita jogadores a partir de 14 anos, a idade mínima que a lei permite para praticar airsoft (Decreto
          11.615/2023, art. 34, § 3º). Menores de 14 não podem ter conta; se descobrirmos uma, ela é excluída.
        </p>
        <p>
          De 14 a 17 anos, o cadastro só termina com a confirmação de que o pai, a mãe ou o responsável sabe e autoriza.
          Tratamos os dados de adolescentes sempre no melhor interesse deles, como manda o art. 14 da LGPD:
        </p>
        <ul>
          <li>coletamos o mesmo mínimo de qualquer jogador, nada a mais;</li>
          <li>loja e carteira ficam bloqueadas até os 18 anos;</li>
          <li>a posição na partida continua visível só para o próprio time e a organização;</li>
          <li>o responsável pode pedir acesso, correção ou exclusão dos dados pelo e-mail de contato.</li>
        </ul>
      </>
    ),
  },
  {
    id: "seguranca",
    title: "Segurança",
    body: (
      <>
        <p>
          Senhas são guardadas cifradas (argon2), toda conexão usa HTTPS, o banco de dados fica numa rede privada sem acesso
          pela internet e só pessoas autorizadas acessam a infraestrutura.
        </p>
        <p>
          Nenhum sistema é perfeito. Se acontecer um incidente com risco para você, avisamos você e a ANPD, como manda o
          art. 48 da LGPD.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        Este site não usa cookies de rastreamento nem de publicidade, e não carrega scripts de terceiros para medir visitas.
        Por isso não pedimos aceite de cookies. Se isso mudar, o site vai pedir sua escolha antes, e esta página será
        atualizada. No app, a análise de uso só liga com o seu sim.
      </p>
    ),
  },
  {
    id: "mudancas",
    title: "Mudanças nesta política",
    body: (
      <p>
        Quando mudarmos algo importante, avisamos no app antes de valer. Cada versão tem data, e guardamos qual versão você
        aceitou. Veja também os <Link href="/termos">Termos de uso</Link> e a{" "}
        <Link href="/reembolso">Política de reembolso</Link>.
      </p>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      intro={
        <p>
          Esta página explica, sem juridiquês, o que o ORYX faz com os seus dados no app e no site. Ela vale junto com os{" "}
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
