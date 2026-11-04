export type Accommodation = "shared" | "suite";

export const MAX_GUESTS: Record<Accommodation, number> = { shared: 6, suite: 2 };

export interface ReservationSelection {
  checkIn?: Date | undefined;
  checkOut?: Date | undefined;
  accommodation?: Accommodation | undefined;
  guests?: number | undefined;
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

export function maxGuests(accommodation: Accommodation): number {
  return MAX_GUESTS[accommodation];
}

export function isGuestCountValid(accommodation: Accommodation | undefined, guests: number | undefined): boolean {
  if (!accommodation || guests === undefined) return false;
  return Number.isInteger(guests) && guests >= 1 && guests <= MAX_GUESTS[accommodation];
}

export function clampGuests(accommodation: Accommodation, guests: number | undefined): number {
  const requested = guests === undefined ? 1 : Math.trunc(guests);
  return Math.min(Math.max(requested, 1), MAX_GUESTS[accommodation]);
}

export function isReservationComplete(sel: ReservationSelection): boolean {
  if (!isCheckInValid(sel.checkIn)) return false;
  if (!isCheckOutValid(sel.checkIn, sel.checkOut)) return false;
  if (!sel.accommodation) return false;
  return isGuestCountValid(sel.accommodation, sel.guests);
}

export function describeGuests(guests: number): string {
  return guests === 1 ? "1 pessoa" : `${guests} pessoas`;
}

export function buildReservationMessage(sel: {
  checkIn: Date;
  checkOut: Date;
  accommodation: Accommodation;
  guests: number;
}): string {
  const period = `de ${formatDateBR(sel.checkIn)} a ${formatDateBR(sel.checkOut)}`;
  const people = describeGuests(sel.guests);
  if (sel.accommodation === "shared") {
    return `Olá! Vim pelo site do Odoyá e gostaria de consultar a disponibilidade de um quarto compartilhado para ${people}, ${period}.`;
  }
  return `Olá! Vim pelo site do Odoyá e gostaria de consultar a disponibilidade da suíte privativa para ${people}, ${period}.`;
}
