import { describe, expect, it } from "vitest";
import { waLink, WA_MESSAGES } from "@/lib/whatsapp";

describe("waLink", () => {
  it("uses the hostel number and encodes the message", () => {
    const url = waLink(WA_MESSAGES.shared);
    expect(url.startsWith("https://wa.me/5573991054885?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1])).toBe(WA_MESSAGES.shared);
  });
});
