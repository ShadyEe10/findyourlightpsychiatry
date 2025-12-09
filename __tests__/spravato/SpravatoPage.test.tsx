import { describe, expect, it } from "@jest/globals";
import { render, screen, cleanup } from "@testing-library/react";
import SpravatoPage from "@/components/spravato/SpravatoPage";
import { axe } from "jest-axe";

describe("SpravatoPage", () => {
  it("renders the hero heading", () => {
    render(<SpravatoPage />);
    expect(
      screen.getByRole("heading", {
        name: /SPRAVATO® \(Esketamine\) Treatment at Find Your Light Psychiatry/i,
      }),
    ).toBeInTheDocument();
  });

  it("includes CTA buttons pointing to /contact with query params", () => {
    render(<SpravatoPage />);
    const cta = screen.getAllByRole("link", {
      name: /Request Consultation/i,
    })[0];
    expect(cta).toHaveAttribute("href", "/contact?service=spravato");
  });

  it("contains all major sections", () => {
    render(<SpravatoPage />);
    expect(screen.getByRole("heading", { name: /What Is SPRAVATO/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /How SPRAVATO/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Benefits Patients/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Treatment Schedule/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Insurance Coverage/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Our Locations/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Who Qualifies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Frequently Asked Questions/i })).toBeInTheDocument();
  });

  it("has no axe accessibility violations", async () => {
    // Ensure clean DOM before axe test to avoid duplicate element issues
    cleanup();
    const { container } = render(<SpravatoPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

