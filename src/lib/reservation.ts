export type Accommodation = "shared" | "suite";

export interface ReservationSelection {
  checkIn?: Date | undefined;
  checkOut?: Date | undefined;
  accommodation?: Accommodation | undefined;
  guests?: 1 | 2 | undefined;
}

export function formatDateBR(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}/${m}/${date.getFullYear()}`;
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isCheckInValid(checkIn: Date | undefined, today: Date = startOfToday()): boolean {
  return !!checkIn && checkIn >= today;
}

export function isCheckOutValid(checkIn: Date | undefined, checkOut: Date | undefined): boolean {
  return !!checkIn && !!checkOut && checkOut > checkIn;
}

export function isReservationComplete(sel: ReservationSelection): boolean {
  if (!isCheckInValid(sel.checkIn)) return false;
  if (!isCheckOutValid(sel.checkIn, sel.checkOut)) return false;
  if (!sel.accommodation) return false;
  if (sel.accommodation === "suite" && sel.guests !== 1 && sel.guests !== 2) return false;
  return true;
}

export function buildReservationMessage(sel: {
  checkIn: Date;
  checkOut: Date;
  accommodation: Accommodation;
  guests?: 1 | 2 | undefined;
}): string {
  const period = `de ${formatDateBR(sel.checkIn)} a ${formatDateBR(sel.checkOut)}`;
  if (sel.accommodation === "shared") {
    return `Olá! Vim pelo site do Odoyá e gostaria de consultar a disponibilidade de um quarto compartilhado para 1 pessoa, ${period}.`;
  }
  return `Olá! Vim pelo site do Odoyá e gostaria de consultar a disponibilidade da suíte privativa para ${sel.guests} pessoa(s), ${period}.`;
}
