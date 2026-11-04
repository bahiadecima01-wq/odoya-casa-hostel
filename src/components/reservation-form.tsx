import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { BedDouble, BedSingle, CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { waLink } from "@/lib/whatsapp";
import {
  buildReservationMessage,
  formatDateBR,
  isReservationComplete,
  startOfToday,
  type Accommodation,
} from "@/lib/reservation";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.46-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.34-8.05z" />
    </svg>
  );
}

function DateField(props: {
  id: string;
  label: string;
  value?: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabledBefore: Date;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.id} className="text-sm font-bold text-primary">
        {props.label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={props.id}
            type="button"
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 text-left text-base transition hover:border-secondary/60 focus:outline-none focus:ring-2 focus:ring-ring/50",
              !props.value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
            {props.value ? formatDateBR(props.value) : props.placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={props.value}
            onSelect={(date) => {
              props.onChange(date);
              setOpen(false);
            }}
            disabled={{ before: props.disabledBefore }}
            locale={ptBR}
            className="pointer-events-auto p-3"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const ACCOMMODATIONS: { value: Accommodation; title: string; desc: string; icon: typeof BedSingle }[] = [
  { value: "shared", title: "Quarto compartilhado", desc: "Para 1 pessoa, em ambiente compartilhado.", icon: BedSingle },
  { value: "suite", title: "Suíte privativa", desc: "Para até 2 pessoas, com banheiro privativo.", icon: BedDouble },
];

export function ReservationSection() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [accommodation, setAccommodation] = useState<Accommodation>();
  const [guests, setGuests] = useState<1 | 2>();

  const today = startOfToday();
  const minCheckOut = checkIn ? new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate() + 1) : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const complete = isReservationComplete({ checkIn, checkOut, accommodation, guests });

  function handleCheckIn(date: Date | undefined) {
    setCheckIn(date);
    if (date && checkOut && checkOut <= date) setCheckOut(undefined);
  }

  function handleAccommodation(value: Accommodation) {
    setAccommodation(value);
    if (value === "shared") setGuests(undefined);
  }

  function handleSubmit() {
    if (!complete || !checkIn || !checkOut || !accommodation) return;
    const message = buildReservationMessage({ checkIn, checkOut, accommodation, guests });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  const hint = !checkIn
    ? "Selecione a data de entrada para continuar."
    : !checkOut
      ? "Agora escolha a data de saída, posterior à entrada."
      : !accommodation
        ? "Escolha sua acomodação para continuar."
        : accommodation === "suite" && !guests
          ? "Informe a quantidade de hóspedes da suíte."
          : null;

  return (
    <section id="reserva" aria-labelledby="reserva-heading" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Consulte sua hospedagem</p>
          <h2 id="reserva-heading" className="mt-3 text-4xl text-primary md:text-5xl">
            Planeje sua estadia no Odoyá
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Escolha suas datas e sua acomodação. Nossa equipe entrará em contato para confirmar a disponibilidade e
            ajudar você a organizar sua estadia.
          </p>
        </div>

        <form
          className="mt-12 rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft md:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <DateField
              id="check-in"
              label="Data de entrada"
              value={checkIn}
              onChange={handleCheckIn}
              disabledBefore={today}
              placeholder="Selecione a data"
            />
            <DateField
              id="check-out"
              label="Data de saída"
              value={checkOut}
              onChange={setCheckOut}
              disabledBefore={minCheckOut}
              placeholder="Selecione a data"
            />
          </div>

          <fieldset className="mt-8">
            <legend className="text-sm font-bold text-primary">Escolha sua acomodação</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {ACCOMMODATIONS.map((option) => {
                const selected = accommodation === option.value;
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleAccommodation(option.value)}
                    className={cn(
                      "relative flex items-start gap-4 rounded-2xl border p-5 text-left transition hover:border-secondary/60 focus:outline-none focus:ring-2 focus:ring-ring/50",
                      selected ? "border-secondary bg-secondary/5" : "border-border bg-background",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition",
                        selected ? "bg-secondary text-secondary-foreground" : "bg-accent/20 text-secondary",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-bold text-primary">{option.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{option.desc}</span>
                    </span>
                    {selected && (
                      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {accommodation === "suite" && (
            <fieldset className="mt-8">
              <legend className="text-sm font-bold text-primary">Quantidade de hóspedes</legend>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:max-w-xs">
                {([1, 2] as const).map((n) => {
                  const selected = guests === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setGuests(n)}
                      className={cn(
                        "rounded-full border px-5 py-3 font-semibold transition hover:border-secondary/60 focus:outline-none focus:ring-2 focus:ring-ring/50",
                        selected
                          ? "border-secondary bg-secondary text-secondary-foreground"
                          : "border-border bg-background text-primary",
                      )}
                    >
                      {n === 1 ? "1 pessoa" : "2 pessoas"}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={!complete}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-foreground shadow-soft transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:brightness-100 sm:w-auto"
            >
              <WhatsAppIcon /> Consultar disponibilidade pelo WhatsApp
            </button>
            {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
