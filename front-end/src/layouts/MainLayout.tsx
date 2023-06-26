import Header from "../components/Header";

function MainLayout({ children }: { children: any }) {
  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen text-text-primary-light dark:text-text-primary-dark">
      <div className="w-full shadow-lg">
        <div className="max-w-[1216px] mx-auto">
          <Header />
        </div>
      </div>
      <div className="max-w-[1216px] mx-auto">{children}</div>
      <div className="max-w-[1216px] mx-auto">{/* footer */}</div>
    </div>
  );
}

export default MainLayout;
