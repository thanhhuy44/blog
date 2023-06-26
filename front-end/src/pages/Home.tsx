import BlogCard from "../components/BlogCard";
import Category from "../components/Category";
import RecentSection from "../components/RecentSections";

function Home() {
  return (
    <div>
      <div className="my-5 border-t border-b border-text-primary-light dark:border-text-primary-dark">
        <h1 className="uppercase text-9xl text-center font-semibold text-text-primary-light dark:text-text-primary-dark">
          the blog
        </h1>
      </div>
      <RecentSection />
      <div className="relative w-full h-16">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-red-200 overflow-x-auto overflow-y-hidden">
          <Category />
        </div>
      </div>
      <div className="my-8 grid grid-cols-3 gap-x-8 gap-y-12">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}

export default Home;
