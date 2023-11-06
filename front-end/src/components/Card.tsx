import { Blog } from "@/interface";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: Blog;
  direction?: "col" | "row";
}

function Card({ direction, data }: Props) {
  return (
    <div
      className={`w-full flex gap-8 ${
        direction === "row" ? "flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative ${
          direction === "row" ? "aspect-square w-4/12" : "aspect-video w-full"
        }`}
      >
        <Image
          fill
          src={data.banner}
          alt="thumbnail"
          className={`rounded object-cover ${
            direction === "row" ? "aspect-[4/3]" : "w-full aspect-video"
          }`}
        />
        <p className="absolute top-8 right-8 px-4 bg-[#2125294D]/30 text-[#f8f9fa] text-center text-[8px] font-bold leading-5">
          {data.category as string}
        </p>
      </div>
      <div className={`flex-1 w-full flex flex-col gap-y-4`}>
        <p className="text-[#495057] text-xs font-light leading-5">
          {dayjs(data.createdAt).format("DD/MM/YYYY")}
        </p>
        <Link
          href={{
            pathname: `blogs/${data.slug}`,
            query: {
              id: data._id,
            },
          }}
        >
          <span className="text-[#212529] text-2xl font-bold leading-10 line-clamp-2">
            {data.title}
          </span>
        </Link>
        <p className="text-[#495057] text-xs font-light leading-5 line-clamp-3">
          {data.description}
        </p>
        <span className="w-full h-[1px] bg-[#e5e5e5]"></span>
        <p className="text-[#495057] text-xs font-light leading-5">
          {data.author.fullname}
        </p>
      </div>
    </div>
  );
}

export default Card;
