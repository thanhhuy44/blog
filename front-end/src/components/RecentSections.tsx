import BlogCard from "./BlogCard";

function RecentSection() {
  return (
    <div className="py-8">
      <h3 className="text-2xl leading-8 font-semibold">Recent blog posts</h3>
      <div className="mt-8 w-full grid grid-cols-2 gap-8">
        <BlogCard type={"col"} descLines={3} />
        <div className="flex flex-col w-full gap-y-8">
          <BlogCard type={"row"} descLines={3} />
          <BlogCard type={"row"} descLines={3} />
        </div>
        <div className="col-span-2">
          <BlogCard type={"row"} descLines={5} />
        </div>
      </div>
    </div>
  );
}

export default RecentSection;
