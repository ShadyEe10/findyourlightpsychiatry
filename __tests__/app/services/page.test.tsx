import { render, screen, cleanup } from "@testing-library/react";
import ServicesPage from "@/app/services/page";
import { axe } from "jest-axe";

describe("ServicesPage", () => {
  it("renders key service sections", () => {
    render(<ServicesPage />);
    expect(
      screen.getByRole("heading", { name: /SPRAVATO® \(esketamine\) Treatment/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /CONDITIONS TREATED/i })).toBeInTheDocument();
  });

  it("has no axe accessibility violations", async () => {
    cleanup();
    const { container } = render(<ServicesPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

