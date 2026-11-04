import { describe, expect, it } from "vitest";
import {
  buildReservationMessage,
  clampGuests,
  describeGuests,
  formatDateBR,
  isCheckInValid,
  isCheckOutValid,
  isGuestCountValid,
  isReservationComplete,
  maxGuests,
} from "@/lib/reservation";

const checkIn = new Date(2026, 10, 10); // 10/11/2026
const checkOut = new Date(2026, 10, 14); // 14/11/2026

describe("formatDateBR", () => {
  it("formats dates as DD/MM/YYYY with zero padding", () => {
    expect(formatDateBR(new Date(2026, 0, 5))).toBe("05/01/2026");
    expect(formatDateBR(checkIn)).toBe("10/11/2026");
  });
});

describe("guest limits", () => {
  it("allows 1 to 6 guests in the shared room and 1 to 2 in the private suite", () => {
    expect(maxGuests("shared")).toBe(6);
    expect(maxGuests("suite")).toBe(2);
    expect(isGuestCountValid("shared", 1)).toBe(true);
    expect(isGuestCountValid("shared", 6)).toBe(true);
    expect(isGuestCountValid("shared", 7)).toBe(false);
    expect(isGuestCountValid("shared", 0)).toBe(false);
    expect(isGuestCountValid("suite", 2)).toBe(true);
    expect(isGuestCountValid("suite", 3)).toBe(false);
    expect(isGuestCountValid("suite", undefined)).toBe(false);
  });

  it("never clamps below 1 or above the room maximum", () => {
    expect(clampGuests("shared", 0)).toBe(1);
    expect(clampGuests("shared", 9)).toBe(6);
    expect(clampGuests("shared", undefined)).toBe(1);
    expect(clampGuests("suite", 5)).toBe(2);
    expect(clampGuests("suite", 2)).toBe(2);
  });

  it("writes the guest count the way it is shown to the visitor", () => {
    expect(describeGuests(1)).toBe("1 pessoa");
    expect(describeGuests(6)).toBe("6 pessoas");
  });
});

describe("buildReservationMessage", () => {
  it("sends the selected guest count for the shared room", () => {
    expect(buildReservationMessage({ checkIn, checkOut, accommodation: "shared", guests: 3 })).toBe(
      "Olá! Vim pelo site do Odoyá e gostaria de consultar a disponibilidade de um quarto compartilhado para 3 pessoas, de 10/11/2026 a 14/11/2026.",
    );
    expect(buildReservationMessage({ checkIn, checkOut, accommodation: "shared", guests: 1 })).toContain(
      "quarto compartilhado para 1 pessoa,",
    );
  });

  it("sends the selected guest count for the private suite", () => {
    expect(buildReservationMessage({ checkIn, checkOut, accommodation: "suite", guests: 2 })).toBe(
      "Olá! Vim pelo site do Odoyá e gostaria de consultar a disponibilidade da suíte privativa para 2 pessoas, de 10/11/2026 a 14/11/2026.",
    );
    expect(buildReservationMessage({ checkIn, checkOut, accommodation: "suite", guests: 1 })).toContain(
      "suíte privativa para 1 pessoa,",
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
  it("accepts a shared room inquiry with any guest count from 1 to 6", () => {
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "shared", guests: 1 })).toBe(true);
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "shared", guests: 6 })).toBe(true);
  });

  it("rejects a shared room above its 6-guest maximum", () => {
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "shared", guests: 7 })).toBe(false);
  });

  it("requires a guest count of 1 or 2 for the private suite", () => {
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "suite" })).toBe(false);
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "suite", guests: 3 })).toBe(false);
    expect(isReservationComplete({ checkIn, checkOut, accommodation: "suite", guests: 2 })).toBe(true);
  });

  it("rejects incomplete selections", () => {
    expect(isReservationComplete({})).toBe(false);
    expect(isReservationComplete({ checkIn, checkOut })).toBe(false);
    expect(isReservationComplete({ checkIn, checkOut: checkIn, accommodation: "shared", guests: 1 })).toBe(false);
  });
});
