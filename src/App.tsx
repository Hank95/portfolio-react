import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { JourneyBar } from '@/components/ui/JourneyBar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Header />
      <Outlet />
      <Footer />
      <JourneyBar />
    </div>
  );
}
