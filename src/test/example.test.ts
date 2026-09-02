import { describe, it, expect } from "vitest";
import { servicePageLinks } from "@/data/serviceRoutes";

describe("service route mapping", () => {
  it("should point the customs service to the correct page route", () => {
    expect(servicePageLinks["Customs Clearing & Forwarding"]).toBe("/customs-clearing-forwarding");
  });
});
