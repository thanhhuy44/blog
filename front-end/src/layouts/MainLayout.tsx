import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
