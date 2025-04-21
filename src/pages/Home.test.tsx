import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./Home";
import { vi } from "vitest";

// Mock AOS library
vi.mock("aos", () => ({
  default: {
    init: vi.fn(), // Mock the init function
    // Mock other AOS functions if needed, but init is the primary one used here
  },
}));

// Mock the ContactForm component
vi.mock("@/components/ContactsForm", () => ({
  default: () => <div data-testid="mock-contact-form">Mock Contact Form</div>,
}));

// Mock ThemeContext minimally if needed - start without it
// import { ThemeContext } from "../context/ThemeContext";
// const mockSetTheme = vi.fn();
// const mockThemeContextValue = { theme: 'light', setTheme: mockSetTheme };

describe("Home page", () => {
  // Clear mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders key sections and headings", () => {
    render(
      <HelmetProvider>
        {" "}
        {/* Required for Helmet */}
        <MemoryRouter>
          {" "}
          {/* Required for Link */}
          {/* <ThemeContext.Provider value={mockThemeContextValue}> */}
          <Home />
          {/* </ThemeContext.Provider> */}
        </MemoryRouter>
      </HelmetProvider>
    );

    // Check for main heading
    expect(
      screen.getByRole("heading", { name: /Henry Pendleton/i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Full-Stack Web Developer/i,
        level: 2,
      })
    ).toBeInTheDocument();

    // Check for section headings
    expect(
      screen.getByRole("heading", { name: /Work Experience/i, level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Skills/i, level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Education/i, level: 2 })
    ).toBeInTheDocument();

    // Check if the mocked ContactForm is rendered
    expect(screen.getByTestId("mock-contact-form")).toBeInTheDocument();

    // Check if AOS.init was called (optional, confirms mock setup)
    // expect(AOS.init).toHaveBeenCalled(); // This might fail if AOS init depends on conditions not met in test
  });

  // Add more tests here if needed, e.g., checking for specific skill items, education entries, etc.
});
