import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
