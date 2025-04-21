import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { ThemeProvider } from "../context/ThemeContext"; // Adjust path as needed

describe("Header component", () => {
  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Pin Map/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact/i })).toBeInTheDocument();
    // Check for the theme toggle button presence
    expect(
      screen.getByRole("button", { name: /Toggle theme/i })
    ).toBeInTheDocument();
  });
});
