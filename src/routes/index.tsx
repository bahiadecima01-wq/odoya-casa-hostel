import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MapPin, Instagram, Phone, Coffee, Check, ArrowRight } from "lucide-react";
import logo from "@/assets/odoya_logo.png.asset.json";
import { waLink, WA_MESSAGES } from "@/lib/whatsapp";

const TITLE = "Odoyá Casa Hostel | Hospedagem em Arraial d'Ajuda - Bahia";
const DESC =
  "Conheça o Odoyá Casa Hostel, uma casa-hostel acolhedora no Centro de Arraial d'Ajuda. Quartos compartilhados, suíte privativa e uma experiência leve perto da Rua do Mucugê.";
const ADDRESS = "Rua Santo Antonio, 30 - Centro, Arraial d'Ajuda, Porto Seguro - BA";
const MAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
const INSTAGRAM = "https://www.instagram.com/odoyacasahostel/";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hostel",
          name: "Odoyá Casa Hostel",
          description: DESC,
          telephone: "+55 73 99105-4885",
          sameAs: [INSTAGRAM],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Santo Antonio, 30 - Centro",
            addressLocality: "Arraial d'Ajuda, Porto Seguro",
            addressRegion: "BA",
            addressCountry: "BR",
          },
        }),
      },
    ],
  }),
});

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#acomodacoes", label: "Acomodações" },
  { href: "#espacos", label: "Espaços" },
  { href: "#localizacao", label: "Localização" },
];

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-foreground shadow-soft transition hover:-translate-y-0.5 hover:brightness-105";
const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/60 px-7 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary-foreground/10";
const btnDark =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-secondary";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.46-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.34-8.05z" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Odoyá Casa Hostel — início">
          <img src={logo.url} alt="Logo Odoyá Casa Hostel" className="h-12 w-12 object-contain" />
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-primary/80 hover:text-secondary">
              {n.label}
            </a>
          ))}
          <a href={waLink(WA_MESSAGES.general)} target="_blank" rel="noopener noreferrer" className={btnDark}>
            <WhatsAppIcon className="h-4 w-4" /> Fale conosco
          </a>
        </nav>
        <button
          className="rounded-full p-2 text-primary md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-card px-5 pb-5 md:hidden" aria-label="Menu móvel">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 font-semibold text-primary">
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative flex items-center overflow-hidden bg-primary">
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 text-primary-foreground md:py-24">
        <p className="fade-up mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent">Casa hostel · Arraial d'Ajuda, Bahia</p>
        <h1 className="fade-up max-w-3xl text-4xl leading-tight md:text-6xl">
          Mais do que um lugar para dormir, <em className="text-accent">um lugar para se sentir em casa.</em>
        </h1>
        <p className="fade-up mt-6 max-w-xl text-lg text-primary-foreground/90">
          Descubra uma forma mais leve, acolhedora e autêntica de viver Arraial d'Ajuda.
        </p>
        <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={waLink(WA_MESSAGES.hero)} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
            <WhatsAppIcon /> Fale conosco pelo WhatsApp
          </a>
          <a href="#sobre" className={btnOutline}>Conheça o Odoyá</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-5 py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Sobre o Odoyá</p>
        <h2 className="mt-3 text-4xl text-primary md:text-5xl">Um jeito diferente de viver Arraial</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p className="font-serif text-xl text-primary">
            Mais do que um lugar para dormir, o Odoyá é uma experiência de hospedagem funcional, com o aconchego de uma casa em Arraial d'Ajuda.
          </p>
          <p>Somos uma <strong className="text-primary">casa-hostel, não um hotel ou pousada</strong>. Nossa proposta combina simplicidade, conforto, autonomia e o prazer de compartilhar experiências e espaços.</p>
          <p>Recebemos viajantes solo, casais e pessoas que trabalham remotamente, que apreciam ambientes tranquilos, contato com outras pessoas e uma atmosfera acolhedora.</p>
          <p>Acreditamos que as melhores experiências acontecem quando há respeito, leveza e boas trocas entre todos.</p>
        </div>
      </div>
    </section>
  );
}

function RoomCard(props: { tag: string; title: string; desc: string; features: string[]; cta: string; href: string }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[2rem] bg-card shadow-soft">
      <div className="flex flex-1 flex-col p-8">
        <span className="mb-4 text-xs font-bold uppercase tracking-wider text-secondary">{props.tag}</span>
        <h3 className="text-3xl text-primary">{props.title}</h3>
        <p className="mt-3 text-muted-foreground">{props.desc}</p>
        <ul className="mt-6 space-y-2.5">
          {props.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent"><Check className="h-3.5 w-3.5" /></span>
              {f}
            </li>
          ))}
        </ul>
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={`${btnDark} mt-8 self-start`}>
          <WhatsAppIcon className="h-4 w-4" /> {props.cta}
        </a>
      </div>
    </article>
  );
}

function Rooms() {
  return (
    <section id="acomodacoes" className="bg-sand-deep py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Acomodações</p>
        <h2 className="mt-3 text-4xl text-primary md:text-5xl">Encontre seu espaço no Odoyá</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <RoomCard tag="Compartilhado" title="Quartos compartilhados" desc="Uma opção prática para quem gosta de viajar, compartilhar experiências e conhecer pessoas durante a jornada." features={["Acomodação compartilhada", "Opções com ar-condicionado", "Opções sem ar-condicionado", "Banheiros compartilhados"]} cta="Consultar disponibilidade" href={waLink(WA_MESSAGES.shared)} />
          <RoomCard tag="Privativo" title="Suíte privativa" desc="Mais privacidade e tranquilidade para aproveitar sua estadia em Arraial d'Ajuda." features={["Acomodação privativa", "Banheiro privativo"]} cta="Consultar a suíte pelo WhatsApp" href={waLink(WA_MESSAGES.suite)} />
        </div>
      </div>
    </section>
  );
}

const SPACES = [
  { title: "Cozinha equipada", desc: "Tenha liberdade e autonomia para preparar suas próprias refeições." },
  { title: "Área externa com rede", desc: "Um convite para desacelerar, descansar e aproveitar o clima de Arraial." },
  { title: "Sala de convivência", desc: "Um espaço para relaxar, conversar e compartilhar bons momentos." },
  { title: "Espaço de trabalho", desc: "Um ambiente para quem precisa conciliar viagens e trabalho remoto." },
];

function Spaces() {
  return (
    <section id="espacos" className="mx-auto max-w-6xl px-5 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Espaços</p>
        <h2 className="mt-3 text-4xl text-primary md:text-5xl">Espaços para viver e compartilhar</h2>
        <p className="mt-4 text-lg text-muted-foreground">No Odoyá, você encontra espaços pensados para tornar sua estadia mais leve, confortável e independente.</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SPACES.map((s) => (
          <article key={s.title} className="border-t border-accent/40 pt-4">
            <h3 className="mt-4 text-xl text-primary">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 flex items-start gap-4 rounded-2xl border border-accent/40 bg-accent/10 p-6">
        <Coffee className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
        <p className="text-primary"><strong>Café da manhã:</strong> disponível mediante reserva antecipada.</p>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="localizacao" className="bg-primary py-24 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Localização</p>
          <h2 className="mt-3 text-4xl md:text-5xl">No coração de Arraial d'Ajuda</h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
            Estamos no Centro de Arraial d'Ajuda, a apenas 400 metros da famosa Rua do Mucugê, próximos a mercados, cafés, restaurantes e transporte, além de poucos minutos das praias do Mucugê e dos Pescadores.
          </p>
          <p className="mt-6 flex items-start gap-3 font-semibold">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> Rua Santo Antonio, 30 - Centro, Arraial d'Ajuda, Porto Seguro - BA.
          </p>
          <a href={MAPS_DIR} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-8`}>
            Como chegar ao Odoyá <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="overflow-hidden rounded-[2rem] border-4 border-primary-foreground/15 shadow-soft">
          <iframe title="Mapa do Odoyá Casa Hostel" src={MAPS_EMBED} loading="lazy" className="h-[380px] w-full" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20" aria-hidden />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-secondary/15" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <img src={logo.url} alt="" className="mx-auto h-20 w-20 object-contain" loading="lazy" />
        <h2 className="mt-6 text-4xl italic text-primary md:text-5xl">Descansar, compartilhar e viver Arraial com outro olhar.</h2>
        <p className="mt-6 text-lg text-muted-foreground">Mais do que hospedagem, uma experiência de simplicidade, autonomia e boas conexões.</p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center text-primary-foreground">
        <h2 className="text-4xl md:text-6xl">Arraial d'Ajuda espera por você.</h2>
        <p className="mt-5 text-lg text-primary-foreground/90">Venha viver dias leves, conhecer novos lugares e encontrar o aconchego de uma casa no caminho.</p>
        <a href={waLink(WA_MESSAGES.booking)} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-9`}>
          <WhatsAppIcon /> Quero me hospedar no Odoyá
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
        <div className="space-y-3 text-sm text-primary">
          <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-secondary" /> {ADDRESS}.</p>
          <a href={waLink(WA_MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-secondary"><Phone className="h-4 w-4 text-secondary" /> (73) 99105-4885</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-secondary"><Instagram className="h-4 w-4 text-secondary" /> @odoyacasahostel</a>
        </div>
        <nav className="flex flex-col gap-2 text-sm font-semibold text-primary" aria-label="Rodapé">
          {NAV.map((n) => <a key={n.href} href={n.href} className="hover:text-secondary">{n.label}</a>)}
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-border px-5 pt-6 text-xs text-muted-foreground">
        © Odoyá Casa Hostel · Imagens ilustrativas.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={waLink(WA_MESSAGES.general)} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-soft transition hover:scale-110">
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

function Index() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Rooms />
        <Spaces />
        <Location />
        <Experience />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
