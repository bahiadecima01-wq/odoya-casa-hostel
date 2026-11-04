import { describe, expect, it } from "vitest";
import { HOUSE_RULES_NOTICE, HOSTEL_FACTS } from "@/lib/hostel-benefits";

describe("approved hostel facts", () => {
  it("limits the hostel capacity to 11 people", () => {
    expect(HOSTEL_FACTS.capacity).toBe(11);
  });

  it("places the hostel 400 meters from Rua Mucugê", () => {
    expect(HOSTEL_FACTS.distanceToMucugeMeters).toBe(400);
  });

  it("shows the approved house rules notice under the accommodations", () => {
    expect(HOUSE_RULES_NOTICE).toBe(
      "Não hospedamos menores de 18 anos ou pets. Não temos estacionamento.",
    );
  });
});