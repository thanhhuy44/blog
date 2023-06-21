import Header from "../components/Header";

function MainLayout({ children }: { children: any }) {
  return (
    <div className="bg-primary-light dark:bg-primary-dark">
      <div className="w-full shadow-lg">
        <div className="max-w-[1216px] mx-auto">
          <Header />
        </div>
      </div>
      <div>{children}</div>
      <div>{/* footer */}</div>
    </div>
  );
}

export default MainLayout;
