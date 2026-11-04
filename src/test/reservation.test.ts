import { describe, expect, it } from "vitest";
import {
  buildReservationMessage,
  formatDateBR,
  isCheckInValid,
  isCheckOutValid,
  isReservationComplete,
} from "@/lib/reservation";

const checkIn = new Date(2026, 10, 10); // 10/11/2026
const checkOut = new Date(2026, 10, 14); // 14/11/2026

describe("formatDateBR", () => {
  it("formats dates as DD/MM/YYYY with zero padding", () => {
    expect(formatDateBR(new Date(2026, 0, 5))).toBe("05/01/2026");
    expect(formatDateBR(checkIn)).toBe("10/11/2026");
  });
});

describe("buildReservationMessage", () => {
  it("always sends the shared room inquiry for exactly 1 person", () => {
    expect(buildReservationMessage({ checkIn, checkOut, accommodation: "shared" })).toBe(
      "Olá! Vim pelo site do Odoyá e gostaria de consultar a disponibilidade de um quarto compartilhado para 1 pessoa, de 10/11/2026 a 14/11/2026.",
    );
  });

  it("includes the selected guest count for the private suite", () => {
    expect(buildReservationMessage({ checkIn, checkOut, accommodation: "suite", guests: 2 })).toBe(
      "Olá! Vim pelo site do Odoyá e gostaria de consultar a disponibilidade da suíte privativa para 2 pessoa(s), de 10/11/2026 a 14/11/2026.",
    );
    expect(buildReservationMessage({ checkIn, checkOut, accommodation: "suite", guests: 1 })).toContain(
      "suíte privativa para 1 pessoa(s)",
    );
  });
});

describe("date validation", () => {
  it("rejects check-in dates earlier than today", () => {
    const today = new Date(2026, 10, 4);
    expect(isCheckInValid(new Date(2026, 10, 3), today)).toBe(false);
    expect(isCheckInValid(new Date(2026, 10, 4), today)).toBe(true);
  });

  it("requires check-out to be later than check-in", () => {
    expect(isCheckOutValid(checkIn, checkIn)).toBe(false);
    expect(isCheckOutValid(checkIn, new Date(2026, 10, 9))).toBe(false);
    expect(isCheckOutValid(checkIn, checkOut)).toBe(true);
  });
});

describe("isReservationComplete", () => {
  it("accepts a shared room inquiry without a guest selector", () => {
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "shared" })).toBe(true);
  });

  it("requires a guest count of 1 or 2 for the private suite", () => {
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "suite" })).toBe(false);
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "suite", guests: 1 })).toBe(true);
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "suite", guests: 2 })).toBe(true);
  });

  it("rejects incomplete selections", () => {
    expect(isReservationComplete({})).toBe(false);
    expect(isReservationComplete({ checkIn, checkOut })).toBe(false);
    expect(isReservationComplete({ checkIn, checkOut: checkIn, accommodation: "shared" })).toBe(false);
  });
});
