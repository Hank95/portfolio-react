import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

describe("Footer component", () => {
  it("renders copyright text", () => {
    render(
      <MemoryRouter>
        {" "}
        {/* Wrap Footer */}
        <Footer />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/© 2024 Henry Pendleton. All rights reserved./i)
    ).toBeInTheDocument();
  });
});
