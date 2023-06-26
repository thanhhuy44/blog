import { ArrowUpRight } from "@phosphor-icons/react";

interface BlogCardProps {
  type?: String;
  descLines?: Number;
}

function BlogCard({ type = "col", descLines = 3 }: BlogCardProps) {
  return (
    <div
      className={`w-full grid ${
        type === "col" ? "grid-cols-1" : "grid-cols-2"
      } gap-8`}
    >
      <div>
        <img
          src="https://media.viez.vn/prod/2023/6/14/large_image_d3dac27079.png"
          alt="avatar"
          className="block w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full gap-y-3 flex-1">
        <p className="text-main text-sm font-semibold leading-5">
          Sunday, 1 Jan 2023
        </p>
        <div className="w-full flex justify-between items-start">
          <p className="text-2xl leading-8 font-semibold line-clamp-2">
            UX review presentations
          </p>
          <ArrowUpRight size={32} />
        </div>
        <p
          className={`text-base text-text-secondary-light dark:text-text-secondary-dark line-clamp-${descLines}`}
        >
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
