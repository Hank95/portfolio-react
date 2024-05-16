import { Outlet } from "react-router-dom";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
