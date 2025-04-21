import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

describe("App component", () => {
  it("renders navigation links and footer links", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/About/)).toBeInTheDocument();
    expect(screen.getByText(/Pin Map/)).toBeInTheDocument();
    expect(screen.getByText(/Contact/)).toBeInTheDocument();
    expect(
      screen.getByText(/© 2024 Henry Pendleton. All rights reserved\./)
    ).toBeInTheDocument();
  });
});
