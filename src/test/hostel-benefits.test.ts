import { describe, expect, it } from "vitest";
import { HOSTEL_FACTS } from "@/lib/hostel-benefits";

describe("approved hostel facts", () => {
  it("limits the hostel capacity to 11 people", () => {
    expect(HOSTEL_FACTS.capacity).toBe(11);
  });

  it("places the hostel 400 meters from Rua Mucugê", () => {
    expect(HOSTEL_FACTS.distanceToMucugeMeters).toBe(400);
  });
});